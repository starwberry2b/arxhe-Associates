'use client';

import { useLang } from '@/lib/i18n';
import RevealSection from '@/components/RevealSection';
import type { Bilingual } from '@/lib/translations';
import styles from './PageHero.module.css';

interface PageHeroProps {
  title: Bilingual;
  subtitle?: Bilingual;
  compact?: boolean;
}

/**
 * 子页统一头部 — 深蓝渐变背景 + 居中标题
 * 五子页（About / Strategy / Assets / Project / Investor）共用
 */
export default function PageHero({ title, subtitle, compact }: PageHeroProps) {
  const lang = useLang();
  const t = (b: Bilingual) => b[lang];

  return (
    <section className={`${styles.hero} ${compact ? styles.compact : ''}`}>
      <div className={styles.inner}>
        <RevealSection>
          <h1 className={styles.title}>{t(title)}</h1>
          {subtitle && <p className={styles.subtitle}>{t(subtitle)}</p>}
        </RevealSection>
      </div>
    </section>
  );
}
