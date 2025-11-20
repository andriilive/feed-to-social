import ImgTemplate from "@/app/img/templates/ImgTemplate";
import {ImageResponse} from 'next/og'
import {readFile} from 'node:fs/promises'
import {join} from 'node:path'
import type {ReactElement} from "react";

// Image metadata
export const alt = 'Generated Image'
export const size = {
  width: 1920,
  height: 1920,
}

export const contentType = 'image/png'

export async function GET() {

  // Font loading, process.cwd() is Next.js project directory
  const openSans = await readFile(
    join(process.cwd(), 'node_modules/@fontsource/open-sans/files/open-sans-latin-400-normal.woff')
  );

  try {
    return new ImageResponse(ImgTemplate({}) as ReactElement, {
      ...size,
      fonts:
        [
          {
            name: 'Open Sans',
            data: openSans,
            style: 'normal',
            weight: 400,
          },
        ]
    })
  } catch (e) {
    console.log(`${JSON.stringify(e)}`)
    return new Response(`Failed to generate the image`, {
      status: 500,
    })
  }
}
