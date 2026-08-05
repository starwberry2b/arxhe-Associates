'use client';

import { useLang } from '@/lib/i18n';
import { ASSETS } from '@/lib/translations';
import PageHero from '@/components/PageHero';
import RevealSection from '@/components/RevealSection';
import styles from './page.module.css';

export default function AssetsPage() {
  const lang = useLang();
  const t = (b: { zh: string; en: string }) => b[lang];

  return (
    <>
      {/* 板块1 · 页面标题 */}
      <PageHero title={ASSETS.hero.title} />

      {/* 板块2 · 2×2 资产卡片 */}
      <section className={styles.assets}>
        <div className={styles.sectionInner}>
          <div className={styles.grid2x2}>
            {ASSETS.cards.map((card, i) => (
              <RevealSection key={i} delay={i * 100}>
                <article className={styles.card}>
                  <span className={styles.cardIndex} aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className={styles.cardTitle}>{t(card.title)}</h3>
                  <p className={styles.cardBody}>{t(card.body)}</p>
                </article>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
