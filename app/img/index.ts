import type {ImgTemplateImageProp} from "@/components/ImgTemplate";
import type {RSC_CONTENT_TYPE_HEADER} from "next/dist/client/components/app-router-headers";
import {FontWeight} from "next/dist/compiled/@vercel/og/satori";
import type {HTML_CONTENT_TYPE_HEADER, JSON_CONTENT_TYPE_HEADER, TEXT_PLAIN_CONTENT_TYPE_HEADER} from "next/dist/lib/constants";
import type {ImageResponseOptions} from "next/server";
import {readFile} from "node:fs/promises";
import {join} from "node:path";

import img_placeholder_1 from '@/public/placeholders/1.jpg';

export const imgForms = ['square', 'story'] as const;

export type ImgForm = (typeof imgForms)[number];

export const IMG_SIZE_CONFIG : Record<ImgForm, Partial<ImageResponseOptions>> = {
  square: {
    width: 1920,
    height: 1920,
  },
  story: {
    width: 1080,
    height: 1920,
  },
}

export type ImageSizeType = Pick<ImageResponseOptions, 'width' | 'height'>
export type ImageFontsType = ImageResponseOptions['fonts'];

const loadImgFonts = async function () {

  const fontsMap: Record<string, FontWeight> = {
    '400': 400,
    '700': 700,
  };

  const res: ImageFontsType = [];

  for (const weight of Object.values(fontsMap)) {
    res.push({
      name: 'Open Sans',
      data: await readFile(
        join(process.cwd(), `node_modules/@fontsource/open-sans/files/open-sans-latin-${weight}-normal.woff`)
      ),
      style: 'normal',
      weight: weight,
    });
  }

  return res;

}

export type ContentTypeOption = typeof RSC_CONTENT_TYPE_HEADER | typeof HTML_CONTENT_TYPE_HEADER | typeof JSON_CONTENT_TYPE_HEADER | typeof TEXT_PLAIN_CONTENT_TYPE_HEADER | 'image/png'

export const contentType = 'image/png'

export const getImgUtils = async (imgForm: ImgForm) : Promise<{
  img: ImgTemplateImageProp,
  size: ImageSizeType,
  contentType: ContentTypeOption,
  responseOptions: Partial<Omit<ImageResponseOptions, 'width' | 'height'>>
}> => {

  const size = IMG_SIZE_CONFIG[imgForm];
  const srcRelPath = img_placeholder_1.src;

  return {
    img: {
      imgForm,
      src: new URL(srcRelPath, process.env.VERCEL_URL || process.env.NEXT_PUBLIC_BASE_URL || `http://localhost:${process.env.PORT || 3000}`).toString()
    },
    size,
    contentType,
    responseOptions: {
      ...size,
      fonts: await loadImgFonts(),
    }
  }
}
