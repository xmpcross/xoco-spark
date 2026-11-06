import type { ImageMetadata } from "astro";
import aiko from "@/assets/images/customers/aiko-nakamura.jpg";
import james from "@/assets/images/customers/james-osei.jpg";
import lucia from "@/assets/images/customers/lucia-perez.jpg";
import maya from "@/assets/images/customers/maya-chen.jpg";
import rohan from "@/assets/images/customers/rohan-bhatt.jpg";
import tom from "@/assets/images/customers/tom-keller.jpg";
import damagedVase from "@/assets/images/product/vase-damaged.jpg";
import ana from "@/assets/images/team/ines-moreau.jpg";
import type { Credit } from "@/config/home";

/**
 * The fictional workspace shown inside the product UI on the homepage: the
 * store using Spark, its customers and the photos they send. The views live in
 * `src/components/app`; replace them with your own product, or edit the copy there.
 */
export const workspace = { name: "Northwind" };

export interface DemoPerson {
  photo: ImageMetadata;
  credit?: Credit;
}

export const people: Record<string, DemoPerson> = {
  "Maya Chen": {
    photo: maya,
    credit: { name: "Đỗ Ngọc Tú Quyên / Pexels", url: "https://www.pexels.com/photo/1520760/" },
  },
  "James Osei": {
    photo: james,
    credit: { name: "kaleef lawal / Pexels", url: "https://www.pexels.com/photo/35681211/" },
  },
  "Lucía Pérez": {
    photo: lucia,
    credit: { name: "Shazard R. / Pexels", url: "https://www.pexels.com/photo/15116520/" },
  },
  "Aiko Nakamura": {
    photo: aiko,
    credit: { name: "Min An / Pexels", url: "https://www.pexels.com/photo/654696/" },
  },
  "Rohan Bhatt": {
    photo: rohan,
    credit: { name: "Nishant Aneja / Pexels", url: "https://www.pexels.com/photo/7397453/" },
  },
  "Tom Keller": {
    photo: tom,
    credit: { name: "Casey Bebernes / Pexels", url: "https://www.pexels.com/photo/15014092/" },
  },
  /** The support lead signed in to the app; the same person as the hand-off card. */
  Ana: { photo: ana },
};

/** The photo the customer sends in the hero conversation. */
export const attachment = {
  photo: damagedVase,
  credit: { name: "Ksenia Chernaya / Pexels", url: "https://www.pexels.com/photo/6972702/" },
};
