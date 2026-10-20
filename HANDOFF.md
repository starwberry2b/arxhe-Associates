# HANDOFF — Arxhe Associates 官网运维交接（2026-10-20 更新）

> 换账号续作时请先读本文件。整站「02 白廊·杂志编辑风」改造已于 2026-08 完成并上线。本文件现以**部署架构与运维**为主。

## 一、站点与域名现状

| 域名 | 内容 | 服务器 | 站点目录 |
| --- | --- | --- | --- |
| **www.arxhe.com / arxhe.com** | 本项目最新版（2026-10-20 起成为主域名） | arxhe-web001（34.129.216.236，australia-southeast2-a） | `/www/data/arxhe-associates/` |
| **associates.arxhe.com** | 本项目同一构建（与主域名保持一致） | beiming-web（34.92.1.23，asia-east2-a） | `/web/arxhe-associates/` |
| arxhe.com.au / www.arxhe.com.au | **老版 Vue 站（保留中，勿动）** | arxhe-web001 | `/www/data/arxhe2` |
| api.arxhe.com / api.arxhe.com.au | 老站 Laravel 后端（保留中，勿动） | arxhe-web001 | `/www/data/arxhe_admin/public` |

两个域名前置均为 Cloudflare 橙云代理；源站只有 80 端口，CF SSL 模式为 Flexible（回源明文 HTTP，历史遗留，待改进）。

## 二、arxhe-web001 服务器要点（与其他机器都不一样）

- **nginx 是手编译的**：二进制 `/usr/local/nginx/sbin/nginx`，配置 `/usr/local/nginx/conf/nginx.conf` + `vhost/*.conf`（不是 /etc/nginx！）
- 本站的 vhost：`/usr/local/nginx/conf/vhost/www.arxhe.com.conf`（仓库根目录有同名副本存档）
- 改配置：`sudo /usr/local/nginx/sbin/nginx -t && sudo /usr/local/nginx/sbin/nginx -s reload`
- 原配置备份：`vhost/www.arxhe.com.conf.bak-20261020`。**回滚 = 还原该文件 + reload**，老站文件 `/www/data/arxhe2` 未动过一个字节
- nginx 配置含 `try_files $uri $uri.html $uri/ /404.html`（无后缀 URL 兼容）与 HTML `no-cache` 头
- 机器上有 PHP-FPM（老站后端用），运行用户 www；磁盘 30G 余量约 6.6G
- `/www/data/` 下有多个 `arxhe_2024xxxx` 历史目录，都是老站备份，可忽略

## 三、访问凭据与通道

- **gcloud**：`D:\GCCLI\google-cloud-sdk\bin`（不在 PATH，需 `export PATH="/d/GCCLI/google-cloud-sdk/bin:$PATH"`），项目 `inner-wares-307316`，账号 miles.jin@cxgrp.com。**授权会过期**，过期需重新 `gcloud auth login`（弹浏览器，需用户操作）
- **beiming-web**：也可直接 `ssh miles_jin_cxgrp_com@beiming-web.asia-east2-a.inner-wares-307316`（~/.ssh/config 已配好）
- **arxhe-web001**：只能走 `gcloud compute ssh arxhe-web001 --zone=australia-southeast2-a`（登录身份为 Administrator，有 sudo）；直接 ssh 密钥未授权
- 文件传输：`gcloud compute scp <file> <host>:/home/<user>/`，Windows 版 pscp **不支持 `~`，必须写绝对路径**

## 四、部署流程（两个域名）

```bash
npm run build   # 静态导出到 out/
tar -czf /tmp/site.tar.gz -C out --exclude='./videos/brand-film.mp4' --exclude='./videos/brand-film-mobile.mp4' .
# 长片 28MB 两台服务器都已有，跳过；视频有改动时不要排除

# arxhe-web001（主域名）
gcloud compute scp /tmp/site.tar.gz arxhe-web001:/home/Administrator/ --zone=australia-southeast2-a
gcloud compute ssh arxhe-web001 --zone=australia-southeast2-a --command="sudo tar -xzf /home/Administrator/site.tar.gz -C /www/data/arxhe-associates/"

# beiming-web（associates 子域名）
gcloud compute scp /tmp/site.tar.gz beiming-web:/home/miles_jin_cxgrp_com/ --zone=asia-east2-a
gcloud compute ssh beiming-web --zone=asia-east2-a --command="sudo tar -xzf /home/miles_jin_cxgrp_com/site.tar.gz -C /web/arxhe-associates/"
```

验证：

```bash
curl -s -o /dev/null -w "%{http_code}" https://www.arxhe.com/
curl -s -o /dev/null -w "%{http_code}" https://associates.arxhe.com/
```

## 五、Cloudflare 缓存陷阱（重要）

- CF 默认按扩展名缓存 mp4/jpg/css/js，源站 `expires 30d` 让边缘缓存 30 天
- **覆盖同名文件不会生效**（`cf-cache-status: HIT` 持续返回旧文件）
- 对策（已建立惯例）：**改名的方式发布新静态资源**（如 `brand-loop-hq.mp4` → `brand-loop-mobile-540.mp4`），HTML 引用随之更新即可
- HTML 已加 `Cache-Control: no-cache`，页面本身随时最新
- 或在 CF 控制台手动 Purge Cache（需老板/运维的 CF 账号）

## 六、视频素材谱系（别再踩坑）

| 文件 | 规格 | 说明 |
| --- | --- | --- |
| git 历史 `74fc8ce` 的 brand-loop.mp4 | 960x540 @ 5328kbps，30.5s | **循环片最高质量母版**（更高分辨率的源不存在，全域找过） |
| git 历史 `74fc8ce` 的 brand-film.mp4 | 1280x720 @ 2665kbps，4m36s | 长片母版（101MB，含音轨） |
| 现网 brand-loop-hq.mp4 | 540p 高码率无音轨 5.4MB | 桌面 Hero |
| 现网 brand-loop-mobile-hq.webm | VP9 540p 1.96MB | 移动端（安卓/Chrome） |
| 现网 brand-loop-mobile-540.mp4 | H.264 540p 2.67MB | 移动端 iOS 兜底 |
| 老站 `/www/data/arxhe2/media/1.5f43bb30.mp4` | 同循环片母版 | 老 Vue 站原始素材 |

- 转码工具：`scripts/mp4info.py`（无 ffprobe 时解析分辨率/码率）；ffmpeg 可用 `npm i ffmpeg-static` 获取
- 2026-08 的"性能优化"曾把循环片压到 322kbps 导致发糊，2026-10-20 已修复；**以后压缩视频不要低于 CRF 24**

## 七、内容红线（仍然有效）

- 所有页面文案逐字取自 `lib/translations.ts`，不得改写增删（详见 CLAUDE.md §4）
- 禁止住宅/楼盘类配图话术；中英双语由 `lib/i18n.tsx` 切换
