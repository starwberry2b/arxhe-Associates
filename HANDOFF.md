# HANDOFF — 官网风格改造交接（2026-08-07）

> 换账号续作时请先读本文件。当前任务：把老板选定的「02 白廊·杂志编辑风」落到 Next.js 六页整站。

## 一、已确认决策

- **老板选定风格：02 白廊 · 杂志编辑风**（Gallery White Editorial）
- 模板文件：`design-templates/l2-gallery-white-blue.html`（以此页为视觉基准）
- 总览页：`design-templates/index.html`（6 套风格对比，含全部设计令牌）
- 在线预览（老板看过并拍板）：`https://associates.arxhe.com/design-preview/`

## 二、02 风格设计令牌（从 l2 模板提取）

| 项 | 值 |
| --- | --- |
| 纸白底 | `#FAFAF8` |
| 品牌蓝（点缀/关键字/编号/KPI） | `#003C60`（Logo 图形色） |
| 墨色正文标题 | `#33302F`（Logo 字标暖灰系） |
| 正文灰 | `rgba(51,48,47,.6)` |
| 图注/辅助银灰 | `#9F9E9F`（Logo 副文字色） |
| 细分隔线 | `rgba(51,48,47,.13)` |
| 衬线字体栈 | `"Noto Serif SC","Songti SC","STSong","Source Han Serif SC","SimSun",serif` |
| 无衬线字体栈 | `"Noto Sans SC","PingFang SC","Microsoft YaHei",sans-serif` |

**版式语言（必须体现的特征）**：
1. 通栏杂志封面式巨标题（衬线 200 极细字重，clamp 48–104px）
2. 顶部 microlabel（10.5px / letter-spacing .44em / 大写英文 / 品牌蓝）+ 细线规则
3. 首字下沉双栏简介（::first-letter 2.6em 品牌蓝下沉）
4. 壹贰叁肆超大数字编号列表（中文数字，衬线 200，88px 级）
5. 四栏刊物索引（顶部 2px 品牌蓝线 + PILLAR 01–04）
6. 通栏图片带 + 浅色渐变蒙层 + 叠品牌蓝大 KPI（68% GGR）
7. 图注规范：`FIG. 01` 编号 + 地点大写英文，10.5px letterspacing .3em 银灰
8. 页脚：细线顶边 + logo + 银灰 letterspaced 链接

## 三、实施计划（尚未开始改代码，分析已完成）

技术栈：Next.js 15 App Router + TypeScript + CSS Modules，静态导出 `output:'export'` → `out/`。全站中英双语（`lib/i18n` + `lib/translations.ts`）。**内容红线：所有文案逐字取自 `lib/translations.ts`，不得改写增删**（CLAUDE.md §4）。

待改文件（按序）：

1. `app/globals.css` — 加编辑风令牌：`--font-serif`、`--color-paper:#FAFAF8` 等；body 背景改纸白；标题色从品牌蓝改为 `#33302F`（品牌蓝仅作强调）
2. `components/Header.module.css` — 纸白底 + 1px 细线底边、导航 12.5px letterspacing .16em、hover 品牌蓝；TSX 逻辑不动
3. `components/Footer.module.css` — 细线顶边 + logo + 银灰 letterspaced 链接
4. `components/PageHero.tsx` + `.module.css` — 去 HeroBackdrop 地籍背景，改：顶部 micro 行（左 ARXHE ASSOCIATES / 右 VOL. 类标签）+ 细线 + 极细衬线大标题 + 副标题 + 底细线
5. `app/page.tsx` + `app/page.module.css` — **首页重点重制**，板块顺序沿用 CLAUDE.md §6.1 五板块，文案用 HOME/STRATEGY/ASSETS/PROJECT 翻译键：
   - Hero：杂志封面式（顶部 micro+VOL. 细线行 → 通栏巨标题 → 底部左副文案 + 右 FIG.01 图）
   - 简介：首字下沉 + 右侧 facts 表
   - 三大优势/四大策略：超大中文数字编号列表
   - 资产板块：四栏刊物索引
   - CTA：通栏图片带叠 68% GGR 品牌蓝 KPI
   - 首页 hero 不再用 `HeroBackdrop`（组件保留不删）
6. 五个子页面（about/strategy/assets/project/investor）各有 `page.module.css`，跟随全局令牌 + PageHero 自动统一；个别深色/金色残留再微调

**图片**：模板用的航拍图在仓库根目录（`bg-aerial-coastal.jpg` 等 4 张，已提交 git）。上线需拷贝到 `public/images/` 后用 `next/image` 引用（`images.unoptimized:true` 已配）。注意 `public/images/` 当前为空目录。

**字体**：Google Fonts 在国内不稳定，不引外链 webfont，用上述系统衬线字体栈兜底。

## 四、构建 / 部署 / 服务器

```bash
npm run build   # 静态导出到 out/（postbuild 会拷 routes-manifest.json）
```

部署目标：**beiming-web 服务器**（不要再用 arxhe-web001）：

- SSH：`miles_jin_cxgrp_com@34.92.1.23`，密钥 `~/.ssh/google_compute_engine`，known_hosts 用 `~/.ssh/google_compute_known_hosts`，`HostKeyAlias=compute.5683879411072502643`，`CheckHostIP=no`（完整 Host 配置见 `~/.ssh/config` 的 `beiming-web.asia-east2-a.inner-wares-307316`）
- 域名：`associates.arxhe.com`（HTTP→HTTPS 301），nginx 配置 `/etc/nginx/conf.d/associates.arxhe.com.conf`
- 站点根目录：`/web/arxhe-associates/`（现有正式站 = 上次部署的 out/ 内容；design-preview/ 子目录是本次模板预览）
- 部署方式：本地 `npm run build` 后把 `out/` 内容 scp 到服务器临时目录，再 `sudo cp -r` 覆盖 `/web/arxhe-associates/` 对应文件（**保留 `design-preview/`、`bg-*.jpg`、`public/` 子目录不动**）
- 验证：`curl -s -o /dev/null -w "%{http_code}" https://associates.arxhe.com/`

**注意**：SSH/scp 命令在客户端需要用户手动点批准，连续操作前先提醒用户。

## 五、已完成与 git 状态

- ✅ 全网调研（Awwwards/Sotheby's/Compass/Rockefeller/Village Properties/Webflow 模板）
- ✅ 6 套浅色模板 + 总览页，commit `8d2b764` 已推送 GitHub `origin/main`
- ✅ 部署预览到 `https://associates.arxhe.com/design-preview/`
- ✅ 老板选定 02
- ⬜ 整站改造（本文件第三节）→ 构建 → 部署 → 提交

## 六、续作第一句话

「读取 HANDOFF.md，按第三节计划把 02 白廊杂志编辑风落到六页整站，先改 globals.css 和首页。」
