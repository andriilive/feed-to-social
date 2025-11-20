import {getImgUtils, type ImgForm} from "@/app/img";
import ImgTemplate from "@/components/ImgTemplate";
import {ImageResponse} from 'next/og'
import type {ReactElement} from "react";

const IMG_FORM: ImgForm = 'story';

const {size, contentType, responseOptions, img} = await getImgUtils(IMG_FORM)

export async function GET() {
  try {

    return new ImageResponse(
      ImgTemplate({
        preset: 'DEFAULT',
        img: img
      }) as ReactElement,
      responseOptions
    )

  } catch (e) {
    console.log(`${JSON.stringify(e)}`)
    return new Response(`Failed to generate the image`, {status: 500,})
  }
}

// Next.js route metadata configuration
export {size, contentType};
