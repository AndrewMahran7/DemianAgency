import { ImageIcon } from "lucide-react";

type ImagePlaceholderProps = {
  label: string;
  detail?: string;
  className?: string;
};

export function ImagePlaceholder({ label, detail, className = "" }: ImagePlaceholderProps) {
  return (
    <div className={`image-placeholder ${className}`} role="img" aria-label={`Reserved for ${label}`}>
      <div className="placeholder-grid" aria-hidden="true" />
      <div className="placeholder-orbit" aria-hidden="true" />
      <div className="placeholder-copy">
        <ImageIcon aria-hidden="true" size={18} />
        <span>{detail ?? "Photography placeholder"}</span>
        <strong>{label}</strong>
      </div>
    </div>
  );
}
