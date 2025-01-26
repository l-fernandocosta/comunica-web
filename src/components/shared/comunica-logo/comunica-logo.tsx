import Image, { ImageProps } from "next/image";
import React from "react";

const ComunicaLogo = ({
  width = 100,
  height = 100,
}: Pick<ImageProps, "width" | "height">) => {
  return (
    <Image
      data-testid="comunica-logo"
      src="https://www.comunica.in/wp-content/uploads/2024/01/logo.svg"
      alt="Comunica.in logo"
      width={width}
      height={height}
    />
  );
};

export default ComunicaLogo;
