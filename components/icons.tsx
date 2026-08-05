/**
 * 极简线性 SVG 图标集 — 统一 40×40 viewBox，描边宽度 1.5，强调色 #8C7340
 * CLAUDE.md §3.4：极简线性 SVG 风格，统一描边粗细
 */

const iconProps = {
  width: 40,
  height: 40,
  fill: 'none',
  stroke: '#8C7340',
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

/** 差异化土地财税架构 — 建筑/立柱结构 */
export function IconTaxArchitecture() {
  return (
    <svg {...iconProps} viewBox="0 0 40 40" aria-hidden="true">
      <rect x="8" y="14" width="24" height="24" rx="1" />
      <polyline points="6,14 20,4 34,14" />
      <line x1="16" y1="18" x2="16" y2="38" />
      <line x1="20" y1="18" x2="20" y2="38" />
      <line x1="24" y1="18" x2="24" y2="38" />
    </svg>
  );
}

/** 复合型另类土地开发 — 多层方块堆叠 */
export function IconMultiLayer() {
  return (
    <svg {...iconProps} viewBox="0 0 40 40" aria-hidden="true">
      <rect x="6" y="24" width="28" height="14" rx="1" />
      <rect x="11" y="14" width="18" height="10" rx="1" />
      <rect x="16" y="6" width="8" height="8" rx="1" />
      <line x1="20" y1="14" x2="20" y2="24" />
      <line x1="18" y1="14" x2="18" y2="24" />
      <line x1="22" y1="14" x2="22" y2="24" />
    </svg>
  );
}

/** 长期土地储备战略 — 地图定位/区域标记 */
export function IconLandReserve() {
  return (
    <svg {...iconProps} viewBox="0 0 40 40" aria-hidden="true">
      <path d="M8,12 L20,6 L32,10 L32,30 L20,36 L8,32 Z" />
      <circle cx="20" cy="21" r="5" />
      <circle cx="20" cy="21" r="2" fill="#8C7340" fillOpacity="0.3" />
      <line x1="20" y1="26" x2="20" y2="34" />
      <line x1="13" y1="16" x2="27" y2="16" opacity="0.3" />
    </svg>
  );
}

/** 优势板块三卡片图标集 */
export const ADVANTAGE_ICONS = [
  <IconTaxArchitecture key="tax" />,
  <IconMultiLayer key="dev" />,
  <IconLandReserve key="reserve" />,
];
