# Session 01 — 首页 / Hero 首屏重设计

日期：2026-08-05

## 用户反馈（原话要点）
- 首页「不居中、不美观」，Hero 首屏问题大
- 要求用 skill 调整，结合业务场景元素设计 Hero 背景与风格

## 诊断（截图实测）
1. Hero 纯蓝底 + 微弱 CSS 网格，无业务视觉元素 → 「空」是不美观主因
2. 英文标题被 800px 容器挤压成 4 行断行；底部辅助文字换行
3. 中文标题未按 `・` 断行：translations 用的是片假名中点 `・`(U+30FB)，代码只按 `·`(U+00B7) 切分

## 设计方案（寓意体系，已向用户说明）
- **母题：抽象地籍图（Cadastral Map）**——业务是土地资产，宗地边界线网铺满首屏
- 一块宗地以低饱和金描边高亮 = 「从土地储备池中发现并重构价值的那块土地」，
  直接视觉化品牌主张「重构土地价值边界」
- 细节：宗地内业态分割线、四角测绘标记、中心节点脉冲、LOT 012 地块编号、
  维州坐标（37°48′S 144°58′E）、规划道路走廊双线、左下等高线
- 动效克制（CLAUDE.md §3.5）：金色宗地一次性描边绘入 1.6s + 7s 极低幅呼吸；
  尊重 prefers-reduced-motion

## 改动文件
- 新增 `components/HeroBackdrop.tsx`（hero / quiet 两变体，quiet 复用于品牌理念板块）
- `app/page.tsx`：接入背景组件；splitByDot 兼容 `・`；heroFooter 每段包 span
- `app/page.module.css`：Hero 重写（分层径向背景、晕影、子元素依次淡入、
  `:lang(en)` 标题降档、brandTag 双侧金线）；卡片序号水印 + 顶部金线 hover；
  简介首句放大加深；sectionTag 双侧饰线
- `app/globals.css`：HeroBackdrop 定位 + 动效 keyframes + 移动端适配

## 实测教训（新增避坑）
1. **SVG 内联 style 会挡住外部 CSS 媒体查询**：定位属性要放全局 CSS 类里，
   移动端才能覆盖（本次 width/left 覆盖被 inline style 顶掉，返工一轮）
2. **flex 容器内相邻文本节点会合并成一个匿名 flex item**：靠 display:none
   分隔的纯文本不会逐行堆叠，必须包真实元素（span）才能按项纵排
3. 移动端 slice 裁切计算：height 主导时纵向映射固定，横向用
   加宽画布 + 负 left 把视觉焦点平移进视口（250% / -155%）
4. WebBridge 截图要在滚动/刷新后等 2s+，否则抓到 Reveal 动画中间态（画面发白）

## 验证
- 桌面英文 / 桌面中文 / 移动 375px 三档截图逐项核对通过
- `npm run build` 静态导出通过（首页 3.21 kB）
- dev server（7100 端口）待停止：taskkill 命令审批未获响应，挂起中

## 追加修复（同日第二轮）
- **用户反馈**：滚动后及最底部内容仍不居中（附全页截图）
- **逐像素定位**：页脚品牌/slogan/归属文字中心在 ~x715，分割线/链接中心在 ~x950，
  两个中心轴不一致；根因是 `globals.css` 的 `p{max-width:720px}` 把页脚段落盒子
  压窄且默认靠左，文字在 720px 盒内居中而非页居中
- **修复**：`Footer.module.css` 给 brandName/tagline/slogan/affiliation 加
  `margin-inline: auto`；3001 端口截图验证页脚所有元素同一中心轴
- **避坑补充**：全局 `p{max-width}` 是居中布局的隐形炸弹，任何居中容器内的
  `<p>` 都必须显式 `margin-inline:auto`，写新页面时逐页检查

## 追加修复（同日第三轮：卡片等高 + 宗地构图）
- **用户反馈**：卡片高度不统一；滚动展示没有居中；优先消灭视觉不对称/错乱
- **实测（1920 视口）**：各板块中心点 952-953，水平居中本就无偏差；
  卡片 1/2 高 421px、卡片 3 仅 390px → 用户感知的「错乱」主要来自卡片不等高
  和金色宗地侵入标题区
- **卡片等高根因**：`.card` 被 `RevealSection` 包装 div 隔开，grid 的
  stretch 作用于包装层而非卡片。修复：`.cardGrid > * { display:flex;
  flex-direction:column }` + `.card { flex:1 }`
- **宗地构图**：金色宗地整体右移 100 单位（1060-1402），避开标题右缘；
  LOT 标注改为宗地内部居中 + `paint-order:stroke` 深色光晕（skill 技巧）；
  移动端偏移同步改为 `left:-169%`
- **补 favicon**：`app/icon.svg`（深蓝圆角 + 金色宗地），消除控制台 404 issue
- **教训**：dev server 运行中执行 `npm run build` 会把 `.next` 冲掉导致
  服务器 500——以后 build 前停 dev server 或 build 后重启
- **验证**：`npm run build` 通过；三端截图复查因浏览器扩展断开/审批过期
  暂未完成，待用户在场时补验

## 追加修复（同日第四轮：Scroll to Explore 偏右）
- **用户反馈**：滚动提示偏右、整体偏右
- **实测实锤**：scrollHint 中心 1033 vs 页面中心 952（偏右 81px）。根因是
  `left:50% + transform:translateX(-50%)` 的定位 transform 被自身淡入动画
  （heroFadeUp 的 translateY，fill-mode both）永久覆盖——**CSS 动画的
  transform 会顶掉静态 transform**，此前截图为证
- **修复**：scrollHint 改为 `left:0; right:0; width:fit-content;
  margin-inline:auto` 居中，与动画 transform 彻底解耦
- **构图再平衡**：宗地上移右收（y 136-452），减轻中部文字带右侧重量；
  左下等高线透明度 0.08→0.1 作配重；移动端偏移同步 -174%
- **避坑补充（重要）**：任何「transform 定位 + transform 动画」同存的元素
  都会丢定位——要么用 margin/translate 属性居中，要么把定位量写进 keyframes
- **环境备注**：dev server 运行中跑 build 会把 `.next` 冲掉（又一次 500，
  已重启）；浏览器标签页 evaluate 一度卡死，重新导航可恢复；用户浏览器
  可能对 localhost:3001 存了页面缩放（截图呈现放大偏移），提醒 Ctrl+0
