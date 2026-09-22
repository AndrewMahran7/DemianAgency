import Link from "next/link";

export function Brand() {
  return (
    <Link className="wordmark" href="/" aria-label="Demian Insurance Agency home">
      <span className="wordmark-name">Demian</span>
      <span className="wordmark-subtitle">Insurance Agency</span>
    </Link>
  );
}
