import React from "react";
import { CN } from "../../../utils/classname-merge";

/* ----------------------------------------------------------- */

export interface ImageLoaderShape {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  draggable?: boolean;
  fallbackSrc?: string;
  fallbackClassName?: string;
}

/**
 * A component that displays an image and falls back to a gray box with alt text if the image fails to load.
 *
 * @param {string} props.src - The URL of the image to display.
 * @param {string} props.alt - The alt text for the image.
 * @param {string} [props.className] - An optional class name for the component.
 * @param {string} [props.draggable] - An optional draggable property for the component (defaults to "false")
 * @param {string} [props.fallbackSrc] - An optional fallback "src" property
 * @param {string} [props.fallbackClassName] - An optional className to apply for errors
 *
 * @returns {JSX.Element} - The rendered component.
 */
export function ImageLoader(props: ImageLoaderShape) {
  const {
    src,
    alt,
    width,
    height,
    className,
    fallbackSrc,
    draggable = false,
    fallbackClassName,
  } = props;

  // Define a state variable for tracking whether the image failed to load.
  const [error, setError] = React.useState(false);

  // Unset error if src changes
  React.useEffect(() => {
    setError(false);
  }, [src]);

  // If the image failed to load, or if props.src is falsey,
  // render either fallbackSrc or a gray box with the alt text
  if (error || !src) {
    if (fallbackSrc) {
      return (
        <img
          draggable={draggable}
          className={CN(className, fallbackClassName)}
          src={fallbackSrc}
          alt={alt}
          width={width}
          height={height}
        />
      );
    }

    return (
      <div
        draggable={draggable}
        className={CN(className, fallbackClassName)}
        role="img"
        aria-label={alt}
      >
        {alt}
      </div>
    );
  }

  // Otherwise, render the image with the given src and alt text, and attach the error handler.
  return (
    <img
      draggable={draggable}
      className={className}
      src={src}
      width={width}
      height={height}
      alt={alt}
      onError={() => {
        setError(true);
      }}
    />
  );
}
