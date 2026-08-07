'use client';

import { useLang } from '@/lib/i18n';
import RevealSection from '@/components/RevealSection';
import type { Bilingual } from '@/lib/translations';
import styles from './PageHero.module.css';

interface PageHeroProps {
  title: Bilingual;
  subtitle?: Bilingual;
  compact?: boolean;
  /** 顶部 micro 行右侧标签（刊物编号式，如 '02 / ABOUT'） */
  vol?: string;
}

/**
 * 子页统一头部 — 02 白廊 · 杂志编辑风
 * 顶部 micro 行（左 ARXHE ASSOCIATES / 右 VOL. 类标签）+ 细线
 * + 极细衬线大标题 + 副标题 + 底细线
 * 五子页（About / Strategy / Assets / Project / Investor）共用
 */
export default function PageHero({ title, subtitle, compact, vol }: PageHeroProps) {
  const lang = useLang();
  const t = (b: Bilingual) => b[lang];

  return (
    <section className={`${styles.hero} ${compact ? styles.compact : ''}`}>
      <div className={styles.inner}>
        <RevealSection>
          {/* 顶部 micro 行 + 细线 */}
          <div className={styles.topRow}>
            <span className={styles.micro}>ARXHE ASSOCIATES</span>
            <span className={styles.vol}>{vol ?? 'ARXHE'}</span>
          </div>

          <h1 className={styles.title}>{t(title)}</h1>
          {subtitle && <p className={styles.subtitle}>{t(subtitle)}</p>}

          {/* 底细线 */}
          <span className={styles.rule} aria-hidden="true" />
        </RevealSection>
      </div>
    </section>
  );
}
