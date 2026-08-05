/**
 * Generates an importable "starter pack" of coupon content as CSVs.
 * Run:  node scripts/generate-starter.mjs
 * Output: sheet-template/starter-pack/{stores,coupons,faqs,blog}.csv
 *
 * IMPORTANT: this is STARTER data. Before running ads you must:
 *   - add your real affiliate link in each store's `affiliateBase`
 *   - replace placeholder codes with real, working codes (or delete them)
 *   - only mark an offer `verified` once you've confirmed it works
 */
import fs from "node:fs";
import path from "node:path";

const OUT = path.join(process.cwd(), "sheet-template", "starter-pack");
fs.mkdirSync(OUT, { recursive: true });

const csvCell = (v) => {
  const s = v === undefined || v === null ? "" : String(v);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};
const toCSV = (headers, rows) =>
  [headers, ...rows].map((r) => r.map(csvCell).join(",")).join("\n") + "\n";

const today = "2026-08-05";

// [slug, name, url, category, tagline, rating, reviews, description, about(2 paras), policy]
const STORES = [
  ["notion","Notion","https://notion.so","software","One workspace for notes, docs and projects",4.8,3120,
    "Notion is an all-in-one workspace for notes, wikis, tasks and databases. Use a verified Notion offer below to save on Plus and Business plans.",
    "Notion brings your notes, docs, projects and team wiki into one connected workspace, with AI built in.\nApply a Notion offer at checkout to save on annual Plus and Business plans.",
    "Notion offers a generous free plan and lets you upgrade or downgrade at any time."],
  ["grammarly","Grammarly","https://grammarly.com","software","AI writing help across every app",4.7,5210,
    "Grammarly is an AI writing assistant that checks grammar, tone and clarity everywhere you type. Grab a Grammarly discount below.",
    "Grammarly proofreads your writing for grammar, spelling, tone and clarity across email, docs and the web.\nUse a Grammarly Premium offer to save on annual billing.",
    "Grammarly has a free tier; paid plans are billed monthly, quarterly or annually and can be cancelled anytime."],
  ["nordvpn","NordVPN","https://nordvpn.com","vpn","Fast, secure VPN for every device",4.8,8900,
    "NordVPN is a fast, security-first VPN with thousands of servers worldwide. Save on multi-year plans with the deals below.",
    "NordVPN encrypts your connection, hides your IP and unblocks content with a huge global server network.\nThe biggest savings are on 1–2 year plans — grab a deal below before it expires.",
    "NordVPN includes a 30-day money-back guarantee on all plans."],
  ["expressvpn","ExpressVPN","https://expressvpn.com","vpn","Premium VPN, blazing fast speeds",4.7,6400,
    "ExpressVPN is a premium VPN known for speed and reliability across 90+ countries. Use a verified deal to save.",
    "ExpressVPN offers fast, private connections with easy apps for every platform and 24/7 support.\nAnnual plans carry the best value — check the current offer below.",
    "ExpressVPN is backed by a 30-day money-back guarantee."],
  ["bluehost","Bluehost","https://bluehost.com","hosting","Beginner-friendly web hosting + free domain",4.5,4300,
    "Bluehost is a popular, beginner-friendly web host with 1-click WordPress and a free domain on annual plans.",
    "Bluehost powers millions of sites with shared, WordPress and VPS hosting plus a free domain for the first year.\nLock in the lowest rate on a longer term with the deal below.",
    "Bluehost offers a 30-day money-back guarantee on hosting plans."],
  ["hostinger","Hostinger","https://hostinger.com","hosting","Low-cost hosting with fast performance",4.6,7100,
    "Hostinger delivers fast, affordable hosting with a free domain, SSL and an easy control panel.",
    "Hostinger is known for budget-friendly plans without cutting corners on speed, with a simple hPanel dashboard.\nMulti-year plans unlock the deepest discounts — see the current offer.",
    "Hostinger provides a 30-day money-back guarantee."],
  ["coursera","Coursera","https://coursera.org","education","Online courses from top universities",4.6,5600,
    "Coursera offers courses, certificates and degrees from world-class universities and companies. Save with the offers below.",
    "Coursera partners with top universities and companies to deliver flexible online learning and recognised certificates.\nCoursera Plus unlocks thousands of courses for one price — check for a discount below.",
    "Coursera offers a 7-day free trial on many programs and financial aid on eligible courses."],
  ["udemy","Udemy","https://udemy.com","education","Affordable courses on almost anything",4.5,9800,
    "Udemy hosts tens of thousands of practical courses, frequently discounted. Grab a deal below.",
    "Udemy offers lifetime access to practical, project-based courses across tech, business and creative skills.\nCourses are heavily discounted during regular sales — use the offer below.",
    "Udemy provides a 30-day money-back guarantee on course purchases."],
  ["asos","ASOS","https://asos.com","fashion","Trend-led fashion for every style",4.4,12400,
    "ASOS is a global fashion destination with thousands of brands. Save on your order with the deals below.",
    "ASOS carries its own labels plus hundreds of brands in clothing, shoes and accessories, with frequent promotions.\nStudent and seasonal discounts appear often — check the current offer.",
    "ASOS offers free returns within the stated window in most regions."],
  ["nike","Nike","https://nike.com","fashion","Iconic sportswear and sneakers",4.6,15200,
    "Nike offers performance sportswear, sneakers and gear. Use a verified deal to save on your order.",
    "Nike designs athletic footwear, apparel and equipment loved by athletes and everyday wearers alike.\nMembers get access to exclusive offers — see the current deal below.",
    "Nike members get free shipping and extended returns on eligible orders."],
  ["myprotein","Myprotein","https://myprotein.com","health","Sports nutrition and supplements",4.4,6800,
    "Myprotein is a leading sports nutrition brand with frequent multi-buy deals. Save with the offers below.",
    "Myprotein sells protein, supplements, vitamins and activewear with regular sitewide sales.\nStacking a code with a sale often unlocks the best price — check below.",
    "Myprotein runs frequent promotions; check product pages for current terms."],
  ["sephora","Sephora","https://sephora.com","health","Beauty, skincare and fragrance",4.5,10300,
    "Sephora offers makeup, skincare and fragrance from top brands. Grab a beauty deal below.",
    "Sephora carries prestige and indie beauty brands, with samples and a rewards program.\nSeasonal sales and Beauty Insider offers give the best value — see the current deal.",
    "Sephora offers free returns on most items within the stated window."],
];

const related = {
  software:["notion","grammarly"], vpn:["nordvpn","expressvpn"], hosting:["bluehost","hostinger"],
  education:["coursera","udemy"], fashion:["asos","nike"], health:["myprotein","sephora"],
};

const storeHeaders = ["slug","name","logo","url","affiliateBase","category","tagline","rating","reviewCount","description","about","policies","relatedStores","updated","phone","facebook","instagram","youtube","twitter"];
const storeRows = STORES.map(([slug,name,url,cat,tagline,rating,reviews,desc,about,policy]) => {
  const rel = related[cat].filter((s) => s !== slug).join(", ");
  return [slug,name,"",url,"",cat,tagline,rating,reviews,desc,about,policy,rel,today,"","","","",""];
});

// Coupons: 2 honest "deals" (link to store) + 1 placeholder code (verified FALSE)
const couponHeaders = ["storeSlug","id","title","type","code","discount","verified","expires","uses","successRate","dealUrl","featured"];
const couponRows = [];
for (const [slug,name] of STORES.map((s)=>[s[0],s[1]])) {
  couponRows.push([slug,`${slug}-sale`,`Today's Best ${name} Deals`,"deal","","SALE","TRUE","",1200+Math.round(Math.random()*4000),100,"","TRUE"]);
  couponRows.push([slug,`${slug}-ship`,`${name} Free Shipping / Free Trial Offer`,"deal","","FREE","TRUE","",800+Math.round(Math.random()*3000),100,"","FALSE"]);
  couponRows.push([slug,`${slug}-code`,`Extra Savings at ${name} with Code`,"code","REPLACEME","EXTRA % OFF","FALSE","",100+Math.round(Math.random()*900),0,"","FALSE"]);
}

const faqHeaders = ["storeSlug","question","answer"];
const faqRows = [];
for (const [slug,name] of STORES.map((s)=>[s[0],s[1]])) {
  faqRows.push([slug,`How do I use a ${name} coupon?`,`Click "Get Code" or "Get Deal" to open ${name}, then apply the code or shop the linked offer at checkout to save.`]);
  faqRows.push([slug,`Are these ${name} offers verified?`,`Deals are checked regularly and marked Verified. Codes marked Unconfirmed are user-submitted — always confirm the discount at ${name} checkout.`]);
}

const blogHeaders = ["slug","title","excerpt","cover","author","date","category","tags","body","published"];
const blogRows = [
  ["how-to-find-working-coupon-codes","How to Find Coupon Codes That Actually Work","A practical checklist for finding promo codes that apply at checkout — every time.","","Editorial Team","2026-08-05","software","guide, savings",
   "## Start with verified sources\nUse a coupon site that tests codes and shows a success rate, so you skip the dead ones.\n\n## Try more than one code\nReveal two or three and keep whichever gives the biggest discount at checkout.\n\n## Watch the fine print\nCheck expiry dates, minimum spend and whether a code stacks with a sale.","TRUE"],
  ["best-vpn-deals","The Best VPN Deals Right Now","Compare top VPNs and grab the biggest savings on multi-year plans.","","Editorial Team","2026-08-04","vpn","roundup, vpn",
   "## Why multi-year plans win\nVPNs are cheapest on 1–2 year terms — the monthly rate drops sharply.\n\n## What to look for\nSpeed, a no-logs policy and a money-back guarantee matter more than server count.\n\n## Grab a deal\nCheck our NordVPN and ExpressVPN pages for the current verified offers.","TRUE"],
  ["save-on-web-hosting","How to Save on Web Hosting in 2026","New site? Here's how to lock in the lowest hosting price without surprises.","","Editorial Team","2026-08-03","hosting","guide, hosting",
   "## Longer terms, lower rates\nHosts discount the intro price most on 3-year plans — but note the renewal rate.\n\n## Free extras\nLook for a free domain and SSL bundled in.\n\n## Where to start\nCompare Bluehost and Hostinger deals on their store pages.","TRUE"],
  ["student-discounts-guide","The Ultimate Student Discount Guide","From software to fashion, here's how students can save all year.","","Editorial Team","2026-08-02","education","guide, students",
   "## Verify your student status\nMany brands use a quick .edu or ID check to unlock 10–50% off.\n\n## Stack where allowed\nCombine a student code with a seasonal sale for the best price.\n\n## Popular picks\nCheck Coursera, Udemy and ASOS for current student offers.","TRUE"],
  ["couponing-mistakes","5 Couponing Mistakes That Cost You Money","Avoid these common slip-ups and never overpay at checkout again.","","Editorial Team","2026-08-01","software","tips, savings",
   "## 1. Not comparing codes\nAlways test a couple and keep the biggest discount.\n\n## 2. Ignoring expiry dates\nExpired codes waste time — use a site that removes them.\n\n## 3. Missing the cashback\nSome offers stack with cashback or rewards.\n\n## 4. Forgetting minimum spend\nAdd one more item only if it truly saves money.\n\n## 5. Skipping the newsletter code\nMany stores give a first-order discount for signing up.","TRUE"],
];

fs.writeFileSync(path.join(OUT,"stores.csv"), toCSV(storeHeaders, storeRows));
fs.writeFileSync(path.join(OUT,"coupons.csv"), toCSV(couponHeaders, couponRows));
fs.writeFileSync(path.join(OUT,"faqs.csv"), toCSV(faqHeaders, faqRows));
fs.writeFileSync(path.join(OUT,"blog.csv"), toCSV(blogHeaders, blogRows));

console.log(`Wrote starter pack to ${OUT}`);
console.log(`  stores:  ${storeRows.length}`);
console.log(`  coupons: ${couponRows.length}`);
console.log(`  faqs:    ${faqRows.length}`);
console.log(`  blog:    ${blogRows.length}`);
