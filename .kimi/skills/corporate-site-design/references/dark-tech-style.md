# 深色科技风（beiming 定稿方案）

适用：算力、AI、硬科技、芯片类企业；对标 NVIDIA 技术硬核感 + 东方极简。

## Design Tokens

```css
--bg: #0A0E27;          /* 深空蓝（备选 #0D1117 GitHub Dark） */
--brand: #0247FE;       /* 品牌宝蓝（取自 logo） */
--accent: #9FFA08;      /* 荧光绿点缀（取自 logo，用于 hover/数据高亮） */
--text: #FFFFFF;
--text-sub: #C5C4C4;    /* 次级文字（取自 logo 浅灰） */
--card: rgba(255,255,255,0.05);  /* 玻璃态卡片 */
```

- 字体：Inter（英文）+ Noto Sans SC（中文），next/font/google 自动子集化 + display:swap；标题 tracking-tight
- 深色背景空感：1.5% 透明度 50px 网格线铺满所有 section

## Hero 母题：logo 生物/图形线框化（全息线框风）

- logo 图形**线框化**：极淡填充（4%）+ 边缘渐变描边（品牌蓝→点缀绿）+ 8px 克制发光 + 内部次要轮廓线（15% opacity）
- 动效：上下浮动 + 透明度同步呼吸（0.2 ↔ 0.75）
- 标题：第一行纯白，第二行 7 色标柔和渐变（白→浅蓝→中蓝→深蓝→深绿→亮绿）
- 文字与图形分离：径向暗化遮罩（不用 text-shadow）
- 背景：Canvas 粒子网络（支持鼠标交互）

## 微交互组件库

- **按钮涟漪**：::after 伪元素从中心扩散 300px 圆形
- **主按钮 hover**：双重 box-shadow（40px + 80px）+ translateY(-2px)
- **次按钮 hover**：点缀绿边框 + 绿色光晕
- **玻璃卡片渐变边框**（CSS mask-composite 技术）：
  ```css
  .glass-card::before {
    padding: 1px;
    background: linear-gradient(135deg, var(--brand), var(--accent));
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    opacity: 0; /* hover → 1 */
  }
  ```
- **tech-corner**：卡片左上+右下角直角装饰线，hover 变绿
- **能量流光线**：区块顶/底的蓝→绿渐变流动线（3s 动画），用于数据、SLA、CTA 区块
- **导航下划线**：蓝→绿渐变从左展开
- **滚动揭示**：统一 RevealWrapper（IntersectionObserver，threshold 0.15，800ms cubic-bezier(0.16,1,0.3,1)），卡片 delay 递增 100~120ms 错位入场

## 内容结构（算力企业参考）

Hero → 核心数据（递增动画）→ 业务板块卡片 → 技术优势 → 客户案例 → SLA 服务保障 → CTA
