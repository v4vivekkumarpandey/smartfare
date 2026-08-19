import type { IslaConfig } from "@/components/lp/OrderForm";

/**
 * Cross-sell products shown on the thank-you page (`/lp/thanks`).
 *
 * After a buyer completes a cash-on-delivery order, the thank-you page offers
 * these products for a one-click reorder that reuses the details the buyer just
 * entered (see `components/lp/CrossSell.tsx`). Each entry therefore needs a full
 * islaffiliate COD config (`offer` / `lp` / `formKey`) — the same values that
 * would appear in that product's own landing-page `OrderForm`.
 */
export type CrossSellProduct = {
  /** Stable id / route slug, e.g. "blower-pl". */
  slug: string;
  /** Display name shown on the card. */
  name: string;
  /** Current price, e.g. "255 zł". */
  price: string;
  /** Original/struck-through price, e.g. "999 zł" (optional). */
  oldPrice?: string;
  /** Product image path under /public, e.g. "/lp/blower-pl/product.jpg". */
  image: string;
  /** islaffiliate COD config for the one-click order. */
  isla: IslaConfig;
};

const UID = "019fb28c-270f-7f36-9386-36d8b9ba93ee";
const THANKYOU = "https://www.thesmartfares.online/lp/thanks";

export const CROSS_SELL: CrossSellProduct[] = [
  // ---- Known islaffiliate COD products ------------------------------------
  {
    slug: "blower-pl",
    name: "Wydajna dmuchawa 3 w 1 3000 W",
    price: "255 zł",
    oldPrice: "999 zł",
    image: "/lp/blower-pl/product.jpg",
    isla: {
      uid: UID,
      offer: "4097",
      lp: "6541",
      formKey: "a1d8e19e0f3b3115f6bca5805832a00e854f0bc4",
      thankyoupage: THANKYOU,
    },
  },
  {
    slug: "fastmower_pl",
    name: "FAST MOWER — kosiarka 3 w 1",
    price: "333 zł",
    image: "/lp/fastmower_pl/product.png",
    isla: {
      uid: UID,
      offer: "2122",
      lp: "4032",
      formKey: "90733eed61d0097e9ff3f5c37336249b35580402",
      thankyoupage: THANKYOU,
    },
  },

  // ---- TODO: fill in the remaining 3 islaffiliate COD configs -------------
  // Provide offer / lp / formKey (+ name, price, image under /public/lp/<slug>/).
  // {
  //   slug: "product-3",
  //   name: "Product 3",
  //   price: "000 zł",
  //   oldPrice: "000 zł",
  //   image: "/lp/product-3/product.jpg",
  //   isla: { uid: UID, offer: "", lp: "", formKey: "", thankyoupage: THANKYOU },
  // },
];
