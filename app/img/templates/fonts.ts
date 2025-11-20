// Font loading, process.cwd() is Next.js project directory
import type {ImageResponseOptions} from "next/server";
import {readFile} from "node:fs/promises";
import {join} from "node:path";

export const loadFonts = async function ()  {

  const openSans = await readFile(
    join(process.cwd(), 'node_modules/@fontsource/open-sans/files/open-sans-latin-400-normal.woff')
  );

  const openSansBold = await readFile(
    join(process.cwd(), 'node_modules/@fontsource/open-sans/files/open-sans-latin-700-normal.woff')
  );

  return [
    {
      name: 'Open Sans',
      data: openSans,
      style: 'normal',
      weight: 400,
    },
    {
      name: 'Open Sans',
      data: openSansBold,
      style: 'normal',
      weight: 700,
    }
  ] as ImageResponseOptions['fonts'];
}
