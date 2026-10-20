# 品牌视频母版（Master Files）

从 git 历史 commit `74fc8ce` 提取的**最高质量原始素材**，是全站所有视频/封面转码的唯一母版。请勿压缩或替换。

| 文件 | 规格 | 用途 |
| --- | --- | --- |
| `brand-loop-master-540p.mp4` | 960×540 @ 5328kbps，30.5s，含音轨 | 首页 Hero 循环片母版（线上各版本均由它转码） |
| `brand-film-master-720p.mp4` | 1280×720 @ 2665kbps，4m36s，含音轨 | 关于页品牌长片母版 |

## 注意事项

- **不存在更高分辨率的源**：2026-10 已在所有服务器历史目录（含老 Vue 站 `/www/data/arxhe2/media/`、Webflow 旧站）确认过。若未来从品牌片制作方拿到 1080p/4K 母带，放这里并更新本表
- 本目录不参与构建发布（构建只拷贝 `public/`）
- 线上压缩下限：CRF 24，再低会明显发糊（2026-08 事故教训）
- 封面图由母版抽帧 + AI 超分生成：`scripts/upscale_poster.py`（Real-ESRGAN x4）
- 服务器上同源文件：`arxhe-web001:/www/data/arxhe2/media/1.5f43bb30.mp4`（= 循环片母版）、`/www/data/aa/media/1.06be187b.mp4`（= 长片母版）
