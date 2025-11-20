import deepmerge from "deepmerge";
import React, {type CSSProperties} from 'react';
import type {ImageProps} from 'next/image';

const imgTemplatePresets = [
  'DEFAULT',
  'YELLOW'
] as const;

type ImgTemplatePreset = typeof imgTemplatePresets[number];

type ImgTemplateProps = {
  preset?: ImgTemplatePreset;
  img?: ImageProps['src'];
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLElement>;

type Config = React.HTMLAttributes<HTMLDivElement> & {
  brand: { logo: string; watermark: string };
  [key: string]: unknown;
};

const imgTemplateConfig: Record<ImgTemplatePreset, Config> = {
  DEFAULT: {
    brand: {watermark: 'WATERMARK', logo: 'BRAND'},
    style: {background: 'black', color: 'white'},
  },
  YELLOW: {
    brand: {watermark: 'WATERMARK 2', logo: 'BRAND 2'},
    style: {background: 'yellow', color: 'black'},
  },
};

// inlined styles (converted from the CSS)
const ROOT_STYLE: CSSProperties = {
  width: '100%',
  height: '100%',
  overflow: 'hidden',
  padding: '32px 80px',
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  flexDirection: 'column',
  position: 'relative',
};

const IMG_STYLE: CSSProperties = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  zIndex: -1,
  opacity: 0.5,
};

const HEADER_STYLE: CSSProperties = {
  fontSize: 128,
  fontWeight: 700
};

const ARTICLE_STYLE: CSSProperties = {
  fontSize: 70,
  lineHeight: 1.45,
  maxWidth: '80%',
}

const FOOTER_STYLE: CSSProperties = {fontSize: 52, opacity: 0.5};

const ImgTemplate: React.FC<ImgTemplateProps> = ({preset = 'DEFAULT', img, children, ...props}) => {
  const {brand, ...presetProps} = imgTemplateConfig[preset];

  // merge preset props and incoming props (nested style merged)
  const mergedProps = deepmerge<React.HTMLAttributes<HTMLElement>>(presetProps as any, props as any);

  // extract style, compose final style with ROOT_STYLE and ensure display:flex
  const {style: mergedStyle, ...restProps} = mergedProps;
  const finalStyle: CSSProperties = {...ROOT_STYLE, ...(mergedStyle as CSSProperties || {}), display: 'flex'};

  return (
    <section {...(restProps as React.HTMLAttributes<HTMLElement>)} style={finalStyle}>
      <header style={HEADER_STYLE}>{brand.logo}</header>
      {img && <img src={img.toString()} alt="bg" style={IMG_STYLE}/>}
      <article style={ARTICLE_STYLE}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </article>
      <footer style={FOOTER_STYLE}>
        {brand.watermark}
      </footer>
    </section>
  );
};

export default ImgTemplate;
