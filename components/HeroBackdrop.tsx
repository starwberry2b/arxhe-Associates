/**
 * HeroBackdrop — 抽象地籍图（Cadastral Map）背景母题
 *
 * 寓意体系：业务是土地资产 → 用「宗地边界线网」铺满首屏，
 * 一块宗地以低饱和金描边高亮，寓意「从土地储备池中
 * 发现并重构价值的那块土地」，直接视觉化品牌主张
 * 「重构土地价值边界」。
 *
 * 风格约束（CLAUDE.md §3.5）：
 * - 低透明度线条，不喧宾夺主；金色仅细节点缀
 * - 动效克制：金色宗地一次性描边绘入 + 极低幅呼吸
 * - SVG 装饰元素必须显式 fill="none"（skill 避坑）
 */

interface HeroBackdropProps {
  /** hero = 完整母题（含金色高亮宗地）；quiet = 仅淡雅线网（深色板块复用） */
  variant?: 'hero' | 'quiet';
}

export default function HeroBackdrop({ variant = 'hero' }: HeroBackdropProps) {
  const isHero = variant === 'hero';

  return (
    <svg
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
      className={`arxhe-hero-backdrop arxhe-hero-backdrop--${variant}`}
    >
      <defs>
        {/* 低饱和金渐变：宗地描边的微弱光泽 */}
        <linearGradient id="arxhe-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#8C7340" />
          <stop offset="100%" stopColor="#B59A5F" />
        </linearGradient>
      </defs>

      {/* ============ 基底宗地边界线网（极淡白线） ============ */}
      <g
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="1"
        opacity={isHero ? 0.07 : 0.05}
      >
        {/* 横向宗地边界 */}
        <path d="M-40,150 L280,132 L560,168 L880,140 L1180,176 L1480,152" />
        <path d="M-40,380 L240,404 L520,372 L840,398 L1140,368 L1480,396" />
        <path d="M-40,620 L260,600 L540,636 L860,612 L1160,644 L1480,618" />
        <path d="M-40,810 L320,830 L640,798 L980,826 L1480,800" />
        {/* 纵向宗地边界 */}
        <path d="M250,-40 L232,190 L268,430 L238,700 L258,940" />
        <path d="M620,-40 L640,220 L610,470 L645,730 L625,940" />
        <path d="M1010,-40 L990,210 L1022,480 L998,740 L1018,940" />
        <path d="M1330,-40 L1348,260 L1322,540 L1350,940" />
      </g>

      {/* ============ 规划道路走廊（双线，略亮一级） ============ */}
      <g
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="1"
        opacity={isHero ? 0.12 : 0.07}
      >
        <path d="M-40,900 L400,560 L860,330 L1480,120" />
        <path d="M20,940 L460,600 L920,370 L1480,172" />
      </g>

      {/* ============ 测绘节点十字标记 ============ */}
      <g
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="1"
        opacity={isHero ? 0.18 : 0.1}
      >
        <path d="M274,138 h12 M280,132 v12" />
        <path d="M514,378 h12 M520,372 v12" />
        <path d="M634,226 h12 M640,220 v12" />
        <path d="M984,216 h12 M990,210 v12" />
        <path d="M854,618 h12 M860,612 v12" />
        <path d="M314,824 h12 M320,818 v12" />
      </g>

      {/* ============ 地貌等高线（左下角，深度层次 + 左侧视觉配重） ============ */}
      <g
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="1"
        opacity={isHero ? 0.1 : 0.05}
      >
        <path d="M90,790 C150,730 270,725 330,785 C390,845 280,900 190,880 C110,862 40,845 90,790 Z" />
        <path d="M130,800 C180,755 270,752 315,800 C358,846 270,888 200,872 C140,858 88,840 130,800 Z" />
        <path d="M170,810 C205,780 265,778 295,810 C325,842 262,868 212,856 C168,846 140,836 170,810 Z" />
      </g>

      {isHero && (
        <>
          {/* ============ 金色高亮宗地（视觉焦点，锚定右上区避让文字带） ============ */}
          <g className="arxhe-parcel-breath">
            {/* 宗地主边界 */}
            <path
              className="arxhe-parcel-draw"
              d="M1080,178 L1360,136 L1422,410 L1132,452 Z"
              fill="none"
              stroke="url(#arxhe-gold)"
              strokeWidth="1.5"
            />
            {/* 宗地内部分割线（业态分割） */}
            <path
              d="M1080,178 L1132,452"
              fill="none"
              stroke="url(#arxhe-gold)"
              strokeWidth="1"
              opacity="0.4"
            />
            <path
              d="M1230,156 L1288,430"
              fill="none"
              stroke="url(#arxhe-gold)"
              strokeWidth="1"
              opacity="0.4"
            />
            {/* 四角测绘标记 */}
            <g fill="none" stroke="#B59A5F" strokeWidth="1.5">
              <path d="M1068,186 L1080,178 L1088,170" />
              <path d="M1352,128 L1360,136 L1368,144" />
              <path d="M1414,418 L1422,410 L1430,402" />
              <path d="M1124,460 L1132,452 L1140,444" />
            </g>
            {/* 宗地中心节点 */}
            <circle
              cx="1250"
              cy="295"
              r="4"
              fill="#B59A5F"
              stroke="none"
              opacity="0.9"
            />
            <circle
              className="arxhe-node-pulse"
              cx="1250"
              cy="295"
              r="14"
              fill="none"
              stroke="#B59A5F"
              strokeWidth="1"
            />
            {/* 地块编号标注于宗地内部（地籍图惯例），描边光晕防线条遮挡 */}
            <text
              className="arxhe-map-label"
              x="1250"
              y="262"
              textAnchor="middle"
              fill="#B59A5F"
              stroke="#0B1728"
              strokeWidth="4"
              paintOrder="stroke"
              fontFamily="'SFMono-Regular', Consolas, 'Liberation Mono', monospace"
              fontSize="13"
              letterSpacing="2"
              opacity="0.8"
            >
              LOT 012 · 12.84 ha
            </text>
          </g>

          {/* 维州坐标（墨尔本），呼应澳洲土地业务 */}
          <g
            className="arxhe-map-label"
            fill="#FFFFFF"
            stroke="none"
            fontFamily="'SFMono-Regular', Consolas, 'Liberation Mono', monospace"
            fontSize="12"
            letterSpacing="2"
            opacity="0.28"
          >
            <text x="48" y="852">37°48′S · 144°58′E — VICTORIA, AUSTRALIA</text>
          </g>
        </>
      )}
    </svg>
  );
}
