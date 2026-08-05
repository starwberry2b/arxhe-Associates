/**
 * HeroBackdrop — 抽象地籍图（Cadastral Map）背景母题
 *
 * 寓意：土地资产 → 宗地边界网格铺满首屏。
 * 一块大面积宗地以金色描边高亮，视觉化「重构土地价值边界」。
 *
 * v2 改进：直线网格 + 大区块 + 工整几何结构（无曲线/等高线）
 */

interface HeroBackdropProps {
  variant?: 'hero' | 'quiet';
}

export default function HeroBackdrop({ variant = 'hero' }: HeroBackdropProps) {
  const isHero = variant === 'hero';
  const lineAlpha = isHero ? 0.07 : 0.04;
  const roadAlpha = isHero ? 0.11 : 0.06;
  const nodeAlpha = isHero ? 0.22 : 0.1;

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
        {/* 纵向宗地边界 */}
        <line x1="260" y1="-20" x2="260" y2="920" />
        <line x1="580" y1="-20" x2="580" y2="920" />
        <line x1="900" y1="-20" x2="900" y2="920" />
        <line x1="1180" y1="-20" x2="1180" y2="920" />

        {/* 横向宗地边界 */}
        <line x1="-20" y1="220" x2="1460" y2="220" />
        <line x1="-20" y1="480" x2="1460" y2="480" />
        <line x1="-20" y1="720" x2="1460" y2="720" />
      </g>

      {/* ============ 地块编号标注（网格交点处，地籍图惯例） ============ */}
      <g
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="2"
        opacity={nodeAlpha}
      >
        {[
          [200, 170], [530, 170], [850, 170], [1130, 170],
          [200, 430], [530, 430], [850, 430], [1130, 430],
          [200, 670], [530, 670], [850, 670], [1130, 670],
        ].map(([cx, cy]) => (
          <g key={`${cx},${cy}`}>
            <line x1={cx - 7} y1={cy} x2={cx + 7} y2={cy} />
            <line x1={cx} y1={cy - 7} x2={cx} y2={cy + 7} />
          </g>
        ))}
      </g>

      {/* ============ 规划道路走廊（对角线，略亮） ============ */}
      <g fill="none" stroke="#FFFFFF" strokeWidth="1.2" opacity={roadAlpha}>
        <line x1="-20" y1="820" x2="580" y2="280" />
        <line x1="10" y1="880" x2="610" y2="340" />
        <line x1="580" y1="280" x2="1340" y2="-20" />
        <line x1="610" y1="340" x2="1400" y2="40" />
      </g>

      {/* ============ 区域标注（极淡文字，呼应土地规划图纸） ============ */}
      <g
        fill="#FFFFFF"
        stroke="none"
        fontFamily="'SFMono-Regular', Consolas, monospace"
        fontSize="11"
        letterSpacing="3"
        opacity={isHero ? 0.14 : 0.08}
      >
        <text x="70" y="160" textAnchor="middle">Z-04</text>
        <text x="420" y="130" textAnchor="start">Z-03 · RURAL</text>
        <text x="740" y="160" textAnchor="start">Z-07 · MIXED USE</text>
        <text x="1100" y="100" textAnchor="middle">Z-02</text>
        <text x="200" y="400" textAnchor="start">Z-06 · RESERVE</text>
        <text x="1050" y="400" textAnchor="end">Z-01 · TRANSIT</text>
        <text x="160" y="650" textAnchor="start">Z-09</text>
        <text x="650" y="670" textAnchor="start">Z-05 · DEVELOPMENT</text>
        <text x="1050" y="650" textAnchor="end">Z-08</text>
      </g>

      {isHero && (
        <>
          {/* ============ 金色高亮宗地（中心偏右大区块） ============ */}
          <g className="arxhe-parcel-breath">
            {/* 宗地主边界 — 580→900, 220→480 */}
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
            {/* 内部业态分割线 */}
            <line
              x1="740" y1="220" x2="740" y2="480"
              fill="none" stroke="url(#arxhe-gold)" strokeWidth="1" opacity="0.45"
            />
            <line
              x1="580" y1="350" x2="900" y2="350"
              fill="none" stroke="url(#arxhe-gold)" strokeWidth="1" opacity="0.45"
            />
            {/* 左下子区块对角线 */}
            <line
              x1="580" y1="350" x2="740" y2="480"
              fill="none" stroke="url(#arxhe-gold)" strokeWidth="1" opacity="0.3"
            />
            {/* 四角测绘标记 */}
            <g fill="none" stroke="#C9A850" strokeWidth="1.5">
              <path d="M568,232 L580,220 L592,208" />
              <path d="M888,208 L900,220 L912,232" />
              <path d="M568,468 L580,480 L592,492" />
              <path d="M888,492 L900,480 L912,468" />
            </g>
            {/* 宗地中心节点 */}
            <circle cx="740" cy="350" r="5" fill="#C9A850" stroke="none" opacity="0.9" />
            <circle
              className="arxhe-node-pulse"
              cx="740" cy="350" r="18"
              fill="none" stroke="#C9A850" strokeWidth="1"
            />
            {/* 地块编号标注（描边光晕防线条遮挡） */}
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
