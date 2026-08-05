# 浅色编辑风「晨光商埠」（souinco 定稿方案）

适用：供应链、贸易、物流、传统产业升级类企业；追求西方高级感、编辑杂志质感。

## Design Tokens

```css
:root {
  --bg: #FAFBFC;        /* 主背景：极浅冷灰 */
  --bg-alt: #F0F4F8;    /* 次背景：区块交替 */
  --brand: #0056A7;     /* 品牌蓝（取自 logo） */
  --brand-dark: #004386;/* hover 加深 */
  --brand-tint: #EAF2FA;/* 次按钮 hover 浅底 */
  --ink: #1A2B3C;       /* 标题 */
  --ink-sub: #5A6B7C;   /* 正文 */
  --line: #E2E8F0;      /* 分割线 */
  --deep: #0A2540;      /* 深色岛屿区块（点缀 #4FC3E8） */
}
```

- 区块交替：白 → --bg-alt → 深色岛屿（--deep）→ 白，形成节奏
- 深色岛屿：圆角 24px、内边距 72px×64px、内嵌蓝图网格（44px，#4FC3E8 5%）+ 右缘大齿轮线稿水印（9%）+ 径向光晕
- 按钮体系：主按钮实心 --brand（hover 变 --brand-dark + 上浮 + 蓝色投影）；次按钮白底蓝描边（hover --brand-tint 浅底）；均 999px 圆角胶囊

## Hero 母题：齿轮枢纽（logo 有齿轮时复用）

- **真实啮合齿轮组**：模数一致（如 m=14），主 24 齿/副 12 齿，中心距=节圆半径和（252），相位偏转使齿对槽，转速比=齿数反比（72s/36s，CSS animation）
- **航线**：从齿轮中心（公司枢纽城市）发出的二次贝塞尔大圆弧（单控制点），终点港口避开齿轮和文字
- **双层错位循环**：每条航线两个同形 path，相位错半周期；节奏=到达(38%)→等待(58%)→消散(96%)
- **货物光点**：每航线 3 个（circle + animateMotion），间隔 2.2~2.7s 错落出发；初始 opacity=0 + 同步 animate 驱动透明度（防 begin 延迟期间停在 SVG 原点）
- **统一心跳**：航线 12s = 主齿轮 72s 的 1/6
- **背景**：双层蓝图网格（52px + 13px，品牌蓝 3~5%）+ 44 齿水印齿轮（9%，90s 旋转）+ 底部标尺条（可放枢纽城市坐标）
- **标签**：textAnchor=middle + paint-order:stroke 背景色光晕

## 组件模式

- sec-tag：小字 eyebrow（13px、letter-spacing 4px、前置短横线 + 小齿轮图标）
- Reveal：IntersectionObserver 滚动入场（threshold 0.15，fadeUp 0.8s，支持 delay 错位）
- 卡片：白底、1px --line 边框、hover 上浮 + 边框变蓝
- i18n：lib/i18n.tsx Context + lib/translations.ts 集中双语数据，导航胶囊按钮切换
- favicon：logo 图标放 app/icon.svg（Next.js App Router 约定）
