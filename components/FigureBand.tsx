import Image from 'next/image';
import styles from './FigureBand.module.css';

interface FigureBandProps {
  /** 图片路径（/images/ 下） */
  src: string;
  /** 中文 alt 描述 */
  alt: string;
  /** 图注左侧：地点/主题大写英文，如 'VICTORIA, AUSTRALIA' */
  captionLeft: string;
  /** 图注右侧：FIG. 编号，如 'FIG. 01' */
  captionRight: string;
}

/**
 * 通栏杂志式图片带 — 02 白廊 · 杂志编辑风
 * 全宽图片 + 下方 FIG. 编号图注（10.5px / letter-spacing .3em / 银灰）
 * 纯展示组件，五个子页共用
 */
export default function FigureBand({ src, alt, captionLeft, captionRight }: FigureBandProps) {
  return (
    <figure className={styles.figure}>
      <div className={styles.imgWrap}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes="100vw"
          className={styles.img}
        />
      </div>
      <figcaption className={styles.caption}>
        <span>{captionLeft}</span>
        <span>{captionRight}</span>
      </figcaption>
    </figure>
  );
}
