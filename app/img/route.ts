import {loadFonts} from "@/lib/fonts";
import ImgTemplate from "@/components/ImgTemplate";
import {ImageResponse} from 'next/og'
import type {ReactElement} from "react";

// Image metadata
export const alt = 'Generated Image'
export const size = {
  width: 1920,
  height: 1920,
}

export const contentType = 'image/png'

export async function GET() {
  try {
    return new ImageResponse(ImgTemplate({}) as ReactElement, {
      ...size,
      fonts: await loadFonts(),
    })
  } catch (e) {
    console.log(`${JSON.stringify(e)}`)
    return new Response(`Failed to generate the image`, {
      status: 500,
    })
  }
}
