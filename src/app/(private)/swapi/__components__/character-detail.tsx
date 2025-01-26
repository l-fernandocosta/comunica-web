import React, { SVGProps } from "react";

type CharacterDetailProps = {
  readonly title: string;
  readonly icon: React.ComponentType<SVGProps<SVGSVGElement>>;
};
const CharacterDetail = ({ title, icon }: CharacterDetailProps) => {
  const Icon = icon;
  return (
    <div className="inline-flex gap-2" title="Cor do cabelo">
      <Icon />
      <span>{title.toUpperCase()}</span>
    </div>
  );
};

export default CharacterDetail;
