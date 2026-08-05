'use client';

import { useLang } from '@/lib/i18n';
import RevealSection from '@/components/RevealSection';
import HeroBackdrop from '@/components/HeroBackdrop';
import type { Bilingual } from '@/lib/translations';
import styles from './PageHero.module.css';

interface PageHeroProps {
  title: Bilingual;
  subtitle?: Bilingual;
  compact?: boolean;
}

/**
 * 子页统一头部 — 浅色科技奢华风
 * 暖珠光背景 + 地籍图母题 + 居中标题
 * 五子页（About / Strategy / Assets / Project / Investor）共用
 */
export default function PageHero({ title, subtitle, compact }: PageHeroProps) {
  const lang = useLang();
  const t = (b: Bilingual) => b[lang];

  return (
    <section className={`${styles.hero} ${compact ? styles.compact : ''}`}>
      {/* 抽象地籍图母题背景 */}
      <HeroBackdrop variant="hero" />

      <div className={styles.inner}>
        <RevealSection>
          <span className={styles.brandTag} aria-hidden="true">
            ARXHE ASSOCIATES
          </span>
          <h1 className={styles.title}>{t(title)}</h1>
          {subtitle && <p className={styles.subtitle}>{t(subtitle)}</p>}
        </RevealSection>
      </div>
    </section>
  );
}
