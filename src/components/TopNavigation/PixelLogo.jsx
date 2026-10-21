export function PixelLogo({ className, style }) {
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 43 35"
      width="46"
      height="38"
      shapeRendering="crispEdges"
      role="img"
      aria-label="Logotipo Lucas Rodrigues — o bug mascote"
    >
      <rect x="16" y="6" width="11" height="4" fill="var(--pixel-coral, #ff6f6f)" />
      <rect x="12" y="10" width="19" height="14" fill="var(--pixel-coral, #ff6f6f)" opacity="0.85" />
      <rect x="8" y="14" width="4" height="8" fill="var(--pixel-coral, #ff6f6f)" />
      <rect x="31" y="14" width="4" height="8" fill="var(--pixel-coral, #ff6f6f)" />
      <rect x="14" y="24" width="4" height="7" fill="var(--pixel-border, #0d0d1f)" />
      <rect x="25" y="24" width="4" height="7" fill="var(--pixel-border, #0d0d1f)" />
      <rect x="16" y="13" width="4" height="4" fill="var(--pixel-mustard, #ffcf56)" />
      <rect x="23" y="13" width="4" height="4" fill="var(--pixel-mustard, #ffcf56)" />
      <rect x="2" y="8" width="8" height="2" fill="var(--pixel-coral, #ff6f6f)" />
      <rect x="33" y="8" width="8" height="2" fill="var(--pixel-coral, #ff6f6f)" />
    </svg>
  );
}
