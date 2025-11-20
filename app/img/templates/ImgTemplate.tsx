import deepmerge from "deepmerge";
import type {ImageProps} from "next/image";

const imgTemplatePresets = [
  'DEFAULT',
  'YELLOW'
] as const;

type ImgTemplatePreset = typeof imgTemplatePresets[number];

type ImgTemplateProps = {
  preset?: ImgTemplatePreset
};

type ImageTempalteConfigProps = React.HTMLAttributes<HTMLDivElement> & {
  brand: {
    logo: string,
    watermark: string,
  },
  [key: string]: unknown
}

// config
const imgTemplateConfig: Record<
  ImgTemplatePreset,
  ImageTempalteConfigProps
> = {
  DEFAULT: {
    brand: {
      watermark: 'WATERMARK',
      logo: 'LOGO',
    },
    style: {
      background: 'black',
      color: 'white',
    },
  },
  YELLOW: {
    brand: {
      watermark: 'WATERMARK 2',
      logo: 'LOGO 2',
    },
    style: {
      background: 'yellow',
      color: 'black',
    },
  },
};

const ROOT_STYLE: React.CSSProperties = {
    fontSize: 128,
    fontFamily: 'Open Sans, sans-serif',
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
};

type Props = ImgTemplateProps & Omit<React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>, 'style'> & {
  img?: ImageProps['src'],
  children?: React.ReactNode,
};

const ImgTemplate: React.FunctionComponent<Props> = ({
  preset = 'DEFAULT',
  img,
  ...props
}) => {

  const {brand, ...presetProps} = imgTemplateConfig[preset];

  const mergedProps = deepmerge(
    {style: ROOT_STYLE},
    presetProps,
  );

  const PADDING = 42;
  const PADDING_LEFT = PADDING + PADDING * 0.4;

  return (
    <div {...mergedProps} {...props}>
      <div style={{position: "absolute", top: PADDING, left: PADDING_LEFT,}}>
        {brand.logo}
      </div>
      {img && (
        <img src={img.toString()} alt="Dynamic Image" style={{
          position: "absolute",
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: 0.25,
        }} />
      )}
      <div style={{position: "absolute", fontSize: 52, bottom: PADDING, left: PADDING_LEFT, opacity: 0.5,}}>
        {brand.watermark}
      </div>
    </div>
  );
};

export default ImgTemplate;
