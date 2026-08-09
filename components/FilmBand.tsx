import { useIsMobile } from '@/lib/useIsMobile';
import styles from './FilmBand.module.css';

interface FilmBandProps {
  /** 视频路径（/videos/ 下） */
  src: string;
  /** 移动端视频路径（可选，不传则使用 src） */
  mobileSrc?: string;
  /** 中文 aria-label 描述 */
  label: string;
  /** 图注左侧：主题大写英文，如 'ARXHE ASSOCIATES' */
  captionLeft: string;
  /** 图注右侧：FILM. 编号，如 'FILM. 01' */
  captionRight: string;
}

/**
 * 通栏杂志式视频带 — 02 白廊 · 杂志编辑风
 * 全宽长片（点击播放、不自动播放）+ 下方 FILM. 编号图注
 * 视觉规范与 FigureBand 一致；preload="metadata" 只取首帧，不影响首屏
 * 支持响应式：移动端自动加载 mobileSrc（如提供）
 */
export default function FilmBand({ src, mobileSrc, label, captionLeft, captionRight }: FilmBandProps) {
  const isMobile = useIsMobile();
  const videoSrc = mobileSrc && isMobile ? mobileSrc : src;

  return (
    <figure className={styles.figure}>
      <div className={styles.videoWrap}>
        <video
          src={videoSrc}
          controls
          preload="metadata"
          playsInline
          aria-label={label}
          className={styles.video}
        />
      </div>
      <figcaption className={styles.caption}>
        <span>{captionLeft}</span>
        <span>{captionRight}</span>
      </figcaption>
    </figure>
  );
}
