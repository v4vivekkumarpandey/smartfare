/**
 * TheSmartFares — Google Sheet companion script
 * ------------------------------------------------------------------
 * Paste this into your sheet's Apps Script editor (Extensions → Apps Script),
 * save, then reload the sheet. A "🌐 Website" menu appears with:
 *
 *   • Publish now            — pushes your latest edits live in seconds
 *   • Enable auto-publish    — publishes automatically ~2 min after you edit
 *   • Disable auto-publish
 *   • Configure webhook…     — set your site URL + secret (run this first)
 *   • Set up / repair tabs   — creates the 7 tabs with headers + sample rows
 *
 * How publishing works: the site caches your sheet and refreshes every ~15 min
 * on its own. "Publish now" calls the /api/revalidate webhook so changes go
 * live immediately instead of waiting for that timer.
 * ------------------------------------------------------------------
 */

var PROP_URL = 'SITE_URL';
var PROP_SECRET = 'REVALIDATE_SECRET';
var PROP_AUTO = 'AUTO_PUBLISH';

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('🌐 Website')
    .addItem('Publish now', 'publishNow')
    .addSeparator()
    .addItem('Enable auto-publish', 'enableAutoPublish')
    .addItem('Disable auto-publish', 'disableAutoPublish')
    .addSeparator()
    .addItem('Configure webhook…', 'configureWebhook')
    .addItem('Set up / repair tabs', 'setupTabs')
    .addToUi();
}

/* ------------------------------------------------------------------ *
 * Configuration
 * ------------------------------------------------------------------ */
function configureWebhook() {
  var ui = SpreadsheetApp.getUi();
  var props = PropertiesService.getDocumentProperties();

  var urlRes = ui.prompt(
    'Configure webhook (1/2)',
    'Enter your site URL (e.g. https://thesmartfares.com):',
    ui.ButtonSet.OK_CANCEL
  );
  if (urlRes.getSelectedButton() !== ui.Button.OK) return;
  var url = urlRes.getResponseText().trim().replace(/\/+$/, '');

  var secRes = ui.prompt(
    'Configure webhook (2/2)',
    'Enter your REVALIDATE_SECRET (same value as in the site env vars):',
    ui.ButtonSet.OK_CANCEL
  );
  if (secRes.getSelectedButton() !== ui.Button.OK) return;
  var secret = secRes.getResponseText().trim();

  props.setProperty(PROP_URL, url);
  props.setProperty(PROP_SECRET, secret);
  ui.alert('Saved. Try "Publish now" to test it.');
}

function getConfig_() {
  var props = PropertiesService.getDocumentProperties();
  return {
    url: props.getProperty(PROP_URL),
    secret: props.getProperty(PROP_SECRET),
  };
}

/* ------------------------------------------------------------------ *
 * Publishing
 * ------------------------------------------------------------------ */
function callWebhook_() {
  var cfg = getConfig_();
  if (!cfg.url || !cfg.secret) {
    throw new Error('Not configured. Run "Configure webhook…" first.');
  }
  var endpoint =
    cfg.url + '/api/revalidate?secret=' + encodeURIComponent(cfg.secret);
  var res = UrlFetchApp.fetch(endpoint, {
    method: 'get',
    muteHttpExceptions: true,
  });
  return { code: res.getResponseCode(), body: res.getContentText() };
}

function publishNow() {
  var ui = SpreadsheetApp.getUi();
  try {
    var r = callWebhook_();
    if (r.code === 200) {
      SpreadsheetApp.getActive().toast('Published! Changes are live.', '🌐 Website', 5);
    } else {
      ui.alert('Publish failed (HTTP ' + r.code + '):\n' + r.body);
    }
  } catch (e) {
    ui.alert(String(e.message || e));
  }
}

/* ------------------------------------------------------------------ *
 * Auto-publish (installable onEdit trigger, debounced ~2 min)
 * ------------------------------------------------------------------ */
function enableAutoPublish() {
  var ss = SpreadsheetApp.getActive();
  // Remove any existing edit triggers for this function first
  disableAutoPublish(true);
  ScriptApp.newTrigger('autoPublishOnEdit')
    .forSpreadsheet(ss)
    .onEdit()
    .create();
  PropertiesService.getDocumentProperties().setProperty(PROP_AUTO, '1');
  SpreadsheetApp.getUi().alert(
    'Auto-publish enabled. After you edit, the site refreshes automatically ' +
      'within ~2 minutes. (You can still use "Publish now" for instant updates.)'
  );
}

function disableAutoPublish(silent) {
  var triggers = ScriptApp.getProjectTriggers();
  for (var i = 0; i < triggers.length; i++) {
    if (triggers[i].getHandlerFunction() === 'autoPublishOnEdit') {
      ScriptApp.deleteTrigger(triggers[i]);
    }
  }
  PropertiesService.getDocumentProperties().deleteProperty(PROP_AUTO);
  if (!silent) SpreadsheetApp.getUi().alert('Auto-publish disabled.');
}

function autoPublishOnEdit() {
  // Debounce: publish at most once every 2 minutes.
  var cache = CacheService.getDocumentCache();
  if (cache.get('recently_published')) return;
  cache.put('recently_published', '1', 120); // seconds
  try {
    callWebhook_();
    SpreadsheetApp.getActive().toast('Auto-published.', '🌐 Website', 3);
  } catch (e) {
    // Silent — don't interrupt editing on transient errors.
  }
}

/* ------------------------------------------------------------------ *
 * One-click tab setup (headers + sample rows + checkboxes)
 * ------------------------------------------------------------------ */
var SCHEMA = {
  categories: {
    headers: ['slug', 'name', 'icon', 'description'],
    rows: [
      ['software', 'Software & SaaS', 'MonitorSmartphone', 'Discounts on the tools you use every day.'],
      ['vpn', 'VPN & Security', 'ShieldCheck', 'Save on VPNs and privacy tools.'],
    ],
  },
  stores: {
    headers: ['slug', 'name', 'logo', 'url', 'affiliateBase', 'category', 'tagline', 'rating', 'reviewCount', 'description', 'about', 'policies', 'relatedStores', 'updated', 'phone', 'facebook', 'instagram', 'youtube', 'twitter'],
    rows: [
      ['mergescreens', 'MergeScreens', '/logos/mergescreens.svg', 'https://mergescreens.com', 'https://track.example.com/aff?u=1001&url=', 'software', 'Screen recording made easy', 4.8, 214, 'Grab a verified MergeScreens coupon below.', 'MergeScreens records your screen and shares a link in seconds.\nApply a code at checkout to save.', '14-day money-back guarantee on all paid plans.', 'screenpal', '2026-08-01', '+1 (800) 555-0142', 'https://facebook.com/mergescreens', 'https://instagram.com/mergescreens', 'https://youtube.com/@mergescreens', 'https://twitter.com/mergescreens'],
    ],
  },
  coupons: {
    headers: ['storeSlug', 'id', 'title', 'type', 'code', 'discount', 'verified', 'expires', 'uses', 'successRate', 'dealUrl', 'featured'],
    rows: [
      ['mergescreens', 'ms-20off', '20% Off All Annual Plans', 'code', 'SMART20', '20% OFF', true, '2026-12-31', 1843, 92, '', true],
      ['mergescreens', 'ms-trial', 'Start a 14-Day Free Trial', 'deal', '', 'FREE TRIAL', true, '', 5120, 100, '', false],
    ],
    checkbox: ['verified', 'featured'],
  },
  faqs: {
    headers: ['storeSlug', 'question', 'answer'],
    rows: [
      ['mergescreens', 'How do I use a MergeScreens coupon code?', 'Click "Get Code" to reveal it, copy it, then paste it at checkout.'],
    ],
  },
  menu: {
    headers: ['label', 'href', 'location', 'order'],
    rows: [
      ['All Stores', '/stores', 'footer', 1],
      ['Categories', '/category', 'footer', 2],
      ['Blog', '/blog', 'footer', 3],
      ['About Us', '/about', 'footer', 4],
    ],
  },
  settings: {
    headers: ['key', 'value'],
    rows: [
      ['siteName', 'TheSmartFares'],
      ['logoUrl', ''],
      ['tagline', 'Verified codes. Real savings. Every day.'],
      ['description', 'Verified coupon codes and deals from top brands.'],
      ['heroHeadline', 'Verified Coupons & Promo Codes'],
      ['heroHeadlineHighlight', 'that actually work'],
      ['heroSubtext', 'We hand-test {coupons}+ codes across {stores}+ top brands.'],
      ['searchPlaceholder', 'Search for a store or brand…'],
      ['trust1Title', 'Hand-verified'],
      ['trust1Body', 'Every code is tested by our team and dated.'],
      ['trust2Title', 'One-tap savings'],
      ['trust2Body', 'Reveal, copy and apply at checkout in seconds.'],
      ['trust3Title', 'Updated daily'],
      ['trust3Body', 'Expired codes removed, fresh offers added daily.'],
    ],
  },
  blog: {
    headers: ['slug', 'title', 'excerpt', 'cover', 'author', 'date', 'category', 'tags', 'body', 'published'],
    rows: [
      ['how-to-use-coupon-codes', 'How to Use Coupon Codes', 'A quick guide to saving on every order.', '', 'Editorial Team', '2026-08-03', 'software', 'guide, savings', '## Finding a working code\nSearch the store and pick the code with the best success rate.\n\n## Applying at checkout\nPaste it into the promo box before you pay.', true],
    ],
    checkbox: ['published'],
  },
};

function setupTabs() {
  var ui = SpreadsheetApp.getUi();
  var ss = SpreadsheetApp.getActive();
  var created = [];
  var skipped = [];

  Object.keys(SCHEMA).forEach(function (name) {
    var def = SCHEMA[name];
    var sheet = ss.getSheetByName(name);
    if (!sheet) {
      sheet = ss.insertSheet(name);
    } else if (sheet.getLastRow() > 0) {
      skipped.push(name); // don't overwrite existing data
      return;
    }
    var all = [def.headers].concat(def.rows);
    sheet
      .getRange(1, 1, all.length, def.headers.length)
      .setValues(all);
    // Bold header row + freeze
    sheet.getRange(1, 1, 1, def.headers.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
    // Checkboxes
    if (def.checkbox) {
      def.checkbox.forEach(function (col) {
        var c = def.headers.indexOf(col) + 1;
        if (c > 0) {
          sheet
            .getRange(2, c, Math.max(def.rows.length, 50), 1)
            .insertCheckboxes();
        }
      });
    }
    created.push(name);
  });

  // Remove the default empty "Sheet1" if present and unused
  var s1 = ss.getSheetByName('Sheet1');
  if (s1 && s1.getLastRow() === 0 && ss.getSheets().length > 1) {
    ss.deleteSheet(s1);
  }

  ui.alert(
    'Setup complete.\n' +
      'Created/filled: ' + (created.join(', ') || 'none') + '\n' +
      'Left untouched (already had data): ' + (skipped.join(', ') || 'none')
  );
}
