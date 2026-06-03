import type { CSSProperties } from "react";

interface Props {
  name: string;
  className?: string;
  filled?: boolean;
  weight?: number;
  style?: CSSProperties;
}

export function MaterialIcon({ name, className = "", filled, weight, style }: Props) {
  const fvs: string[] = [];
  if (filled) fvs.push("'FILL' 1");
  if (weight) fvs.push(`'wght' ${weight}`);
  const fontVariationSettings = fvs.length ? fvs.join(", ") : undefined;
  return (
    <span
      className={`material-symbols-outlined ${className}`}
      style={{ fontVariationSettings, ...style }}
    >
      {name}
    </span>
  );
}
