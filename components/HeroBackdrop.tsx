/**
 * HeroBackdrop — 抽象地籍图（Cadastral Map）背景母题
 *
 * 寓意：土地资产 → 宗地边界网格 + 一块金色高亮宗地。
 * v3：直线网格 + 大面积宗地 + 测点集中在右上角。
 */

interface HeroBackdropProps {
  variant?: 'hero' | 'quiet';
}

/* 右上角测点十字坐标 */
const CROSSES = [
  [1020, 90], [1180, 90], [1260, 130], [1100, 160],
  [960, 140], [1200, 180], [1040, 190],
] as const;

export default function HeroBackdrop({ variant = 'hero' }: HeroBackdropProps) {
  const isHero = variant === 'hero';
  const lineAlpha = isHero ? 0.07 : 0.04;
  const nodeAlpha = isHero ? 0.22 : 0.12;

  return (
    <svg
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
      className={`arxhe-hero-backdrop arxhe-hero-backdrop--${variant}`}
    >
      <defs>
        <linearGradient id="arxhe-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#B8943A" />
          <stop offset="100%" stopColor="#D4AF5A" />
        </linearGradient>
      </defs>

      {/* ============ 宗地网格（正交直线，大面积区块） ============ */}
      <g fill="none" stroke="#FFFFFF" strokeWidth="1" opacity={lineAlpha}>
        <line x1="260" y1="-20" x2="260" y2="920" />
        <line x1="580" y1="-20" x2="580" y2="920" />
        <line x1="900" y1="-20" x2="900" y2="920" />
        <line x1="1180" y1="-20" x2="1180" y2="920" />

        <line x1="-20" y1="220" x2="1460" y2="220" />
        <line x1="-20" y1="480" x2="1460" y2="480" />
        <line x1="-20" y1="720" x2="1460" y2="720" />
      </g>

      {/* ============ 测点十字标记（仅右上角区域） ============ */}
      <g fill="none" stroke="#FFFFFF" strokeWidth="1.5" opacity={nodeAlpha}>
        {CROSSES.map((cross) => {
          const cx = cross[0];
          const cy = cross[1];
          return (
            <g key={`${cx},${cy}`}>
              <line x1={cx - 6} y1={cy} x2={cx + 6} y2={cy} />
              <line x1={cx} y1={cy - 6} x2={cx} y2={cy + 6} />
            </g>
          );
        })}
      </g>

      {isHero && (
        <>
          {/* ============ 金色高亮宗地（中心偏右大区块 580→900, 220→480） ============ */}
          <g className="arxhe-parcel-breath">
            <rect
              className="arxhe-parcel-draw"
              x="580"
              y="220"
              width="320"
              height="260"
              fill="none"
              stroke="url(#arxhe-gold)"
              strokeWidth="1.8"
            />
            {/* 内部十字分割 */}
            <line
              x1="740" y1="220" x2="740" y2="480"
              fill="none" stroke="url(#arxhe-gold)" strokeWidth="1" opacity="0.45"
            />
            <line
              x1="580" y1="350" x2="900" y2="350"
              fill="none" stroke="url(#arxhe-gold)" strokeWidth="1" opacity="0.45"
            />
            {/* 四角测绘标记 */}
            <g fill="none" stroke="#C9A850" strokeWidth="1.5">
              <path d="M568,232 L580,220 L592,208" />
              <path d="M888,208 L900,220 L912,232" />
              <path d="M568,468 L580,480 L592,492" />
              <path d="M888,492 L900,480 L912,468" />
            </g>
            {/* 中心节点 + 脉冲 */}
            <circle cx="740" cy="350" r="5" fill="#C9A850" stroke="none" opacity="0.9" />
            <circle
              className="arxhe-node-pulse"
              cx="740" cy="350" r="18"
              fill="none" stroke="#C9A850" strokeWidth="1"
            />
            {/* 地块标注 */}
            <text
              className="arxhe-map-label"
              x="740" y="310"
              textAnchor="middle"
              fill="#C9A850"
              stroke="#001E33"
              strokeWidth="5"
              paintOrder="stroke"
              fontFamily="'SFMono-Regular', Consolas, monospace"
              fontSize="14"
              letterSpacing="3"
              opacity="0.85"
            >
              LOT 012 · 12.84 ha
            </text>
          </g>

          {/* 维州坐标 */}
          <g
            className="arxhe-map-label"
            fill="#FFFFFF"
            stroke="none"
            fontFamily="'SFMono-Regular', Consolas, monospace"
            fontSize="12"
            letterSpacing="2"
            opacity="0.28"
          >
            <text x="48" y="860">37°48′S · 144°58′E — VICTORIA, AUSTRALIA</text>
          </g>
        </>
      )}
    </svg>
  );
}
