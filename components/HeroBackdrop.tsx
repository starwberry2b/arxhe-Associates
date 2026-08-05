/**
 * HeroBackdrop — 抽象地籍图（Cadastral Map）背景母题
 *
 * 寓意：土地资产 → 宗地边界网格 + 金色高亮宗地（从土地储备中发现并重构价值）。
 * v5：浅色科技奢华风。正方形宗地 + 四角锁定动画 + 低饱和金 + 忽亮忽暗。
 */

interface HeroBackdropProps {
  variant?: 'hero' | 'quiet';
}

/* 测点十字坐标（避开金框区域） */
const CROSSES = [
  [1020, 90], [1080, 60], [960, 140], [1040, 190],
  [1340, 400], [1280, 520], [1360, 460],
] as const;

/* 次级宗地（淡描边，营造地籍图密度） */
const SUB_PARCELS = [
  { x: 120, y: 240, w: 180, h: 140 },
  { x: 1040, y: 520, w: 220, h: 160 },
  { x: 320, y: 580, w: 160, h: 120 },
] as const;

/* 金色宗地配置：3 块正方形，大小不一 */
const GOLD_PARCELS = [
  { lot: 'LOT 008', x: 1180, y: 120, size: 200, sw: 1.8, fontSize: 12 },
  { lot: 'LOT 006', x: 80,   y: 260, size: 110, sw: 1.4, fontSize: 10 },
  { lot: 'LOT 016', x: 300,  y: 520, size: 150, sw: 1.6, fontSize: 11 },
] as const;

export default function HeroBackdrop({ variant = 'hero' }: HeroBackdropProps) {
  const isHero = variant === 'hero';
  /* hero=浅底→海军蓝线；quiet=深底→白线 */
  const lineColor = isHero ? '#003C60' : '#FFFFFF';
  const lineAlpha = isHero ? 0.085 : 0.04;
  const nodeAlpha = isHero ? 0.16 : 0.12;
  const parcelAlpha = isHero ? 0.09 : 0.05;
  const contourAlpha = isHero ? 0.06 : 0.03;
  const coordAlpha = isHero ? 0.22 : 0.28;
  const labelStroke = isHero ? '#F7F6F1' : '#001E33';

  /* 低饱和金色 */
  const goldSolid = '#9C8856';

  return (
    <svg
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
      className={`arxhe-hero-backdrop arxhe-hero-backdrop--${variant}`}
    >
      {/* ============ 等高线（地形深度，柔和不规则曲线） ============ */}
      <g fill="none" stroke={lineColor} strokeWidth="1" opacity={contourAlpha}>
        <path d="M -20,340 C 200,300 420,360 640,320 S 1060,280 1280,330 L 1460,350" />
        <path d="M -20,420 C 240,380 480,440 720,400 S 1120,360 1340,410 L 1460,430" />
        <path d="M -20,620 C 220,580 460,640 700,600 S 1080,560 1320,610 L 1460,630" />
        <path d="M -20,700 C 260,660 500,720 740,680 S 1100,640 1360,690 L 1460,710" />
      </g>

      {/* ============ 宗地网格（正交直线） ============ */}
      <g fill="none" stroke={lineColor} strokeWidth="1" opacity={lineAlpha}>
        <line x1="260" y1="-20" x2="260" y2="920" />
        <line x1="580" y1="-20" x2="580" y2="920" />
        <line x1="900" y1="-20" x2="900" y2="920" />
        <line x1="1180" y1="-20" x2="1180" y2="920" />

        <line x1="-20" y1="220" x2="1460" y2="220" />
        <line x1="-20" y1="480" x2="1460" y2="480" />
        <line x1="-20" y1="720" x2="1460" y2="720" />
      </g>

      {/* ============ 次级宗地（淡描边矩形，增加地籍密度） ============ */}
      <g fill="none" stroke={lineColor} strokeWidth="1" opacity={parcelAlpha}>
        {SUB_PARCELS.map((p) => (
          <rect key={`${p.x},${p.y}`} x={p.x} y={p.y} width={p.w} height={p.h} />
        ))}
      </g>

      {/* ============ 测点十字标记 ============ */}
      <g fill="none" stroke={lineColor} strokeWidth="1.5" opacity={nodeAlpha}>
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
          {/* ============ 金色高亮宗地（3 块正方形，大小不一，低饱和金） ============ */}
          {GOLD_PARCELS.map((p, idx) => {
            const cx = p.x + p.size / 2;
            const cy = p.y + p.size / 2;
            /* 四角锁定标记：简洁 L 形角标，等臂、精准 45° */
            const arm = Math.max(10, p.size * 0.12); /* 角标臂长，随方块缩放 */
            const gap = Math.max(4, p.size * 0.05);  /* 角标与边框间距 */
            const brackets = [
              /* 左上 */
              `M${p.x - gap},${p.y + arm} L${p.x - gap},${p.y - gap} L${p.x + arm},${p.y - gap}`,
              /* 右上 */
              `M${p.x + p.size - arm},${p.y - gap} L${p.x + p.size + gap},${p.y - gap} L${p.x + p.size + gap},${p.y + arm}`,
              /* 左下 */
              `M${p.x - gap},${p.y + p.size - arm} L${p.x - gap},${p.y + p.size + gap} L${p.x + arm},${p.y + p.size + gap}`,
              /* 右下 */
              `M${p.x + p.size - arm},${p.y + p.size + gap} L${p.x + p.size + gap},${p.y + p.size + gap} L${p.x + p.size + gap},${p.y + p.size - arm}`,
            ];
            return (
              <g key={p.lot} className="arxhe-parcel-breath" style={{ animationDelay: `${2 + idx * 1.5}s` }}>
                {/* 正方形边框 */}
                <rect
                  className="arxhe-parcel-draw"
                  x={p.x} y={p.y} width={p.size} height={p.size}
                  fill="none" stroke={goldSolid} strokeWidth={p.sw}
                />
                {/* 四角锁定标记：各角向外侧来回移动 */}
                {brackets.map((d, i) => {
                  const dirs = [
                    { tx: '-8px', ty: '-8px' }, /* 左上 → 左上外 */
                    { tx: '8px',  ty: '-8px' }, /* 右上 → 右上外 */
                    { tx: '-8px', ty: '8px'  }, /* 左下 → 左下外 */
                    { tx: '8px',  ty: '8px'  }, /* 右下 → 右下外 */
                  ];
                  return (
                    <path
                      key={i} d={d} fill="none" stroke={goldSolid} strokeWidth="1.5" strokeLinecap="square"
                      className="arxhe-bracket-lock"
                      style={{
                        animationDelay: `${1.2 + idx * 0.4}s`,
                        ['--bx' as string]: dirs[i].tx,
                        ['--by' as string]: dirs[i].ty,
                      }}
                    />
                  );
                })}
                {/* 中心点 + 向外扩散外环 */}
                <circle cx={cx} cy={cy} r={Math.max(2.5, p.size * 0.02)} fill={goldSolid} stroke="none" opacity="0.7" />
                <circle
                  className="arxhe-center-ring"
                  cx={cx} cy={cy}
                  r={Math.max(6, p.size * 0.05)}
                  fill="none" stroke={goldSolid} strokeWidth="1"
                  style={{ animationDelay: `${0.5 + idx * 0.6}s` }}
                />
                {/* 地块标注 */}
                <text
                  className="arxhe-map-label"
                  x={cx} y={p.y + p.size + 22}
                  textAnchor="middle"
                  fill={goldSolid}
                  stroke={labelStroke}
                  strokeWidth="5"
                  paintOrder="stroke"
                  fontFamily="'SFMono-Regular', Consolas, monospace"
                  fontSize={p.fontSize}
                  letterSpacing="2"
                  opacity="0.75"
                >
                  {p.lot}
                </text>
              </g>
            );
          })}

          {/* 规划道路走廊（双线） */}
          <g fill="none" stroke={lineColor} strokeWidth="1" opacity={lineAlpha * 1.3}>
            <line x1="-20" y1="560" x2="1460" y2="560" />
            <line x1="-20" y1="566" x2="1460" y2="566" />
          </g>

          {/* 维州坐标 */}
          <g
            className="arxhe-map-label"
            fill={lineColor}
            stroke="none"
            fontFamily="'SFMono-Regular', Consolas, monospace"
            fontSize="12"
            letterSpacing="2"
            opacity={coordAlpha}
          >
            <text x="48" y="860">37°48′S · 144°58′E — VICTORIA, AUSTRALIA</text>
          </g>
        </>
      )}
    </svg>
  );
}
