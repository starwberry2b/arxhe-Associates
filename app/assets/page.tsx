'use client';

import { useLang } from '@/lib/i18n';
import { ASSETS } from '@/lib/translations';
import PageHero from '@/components/PageHero';
import RevealSection from '@/components/RevealSection';
import FigureBand from '@/components/FigureBand';
import styles from './page.module.css';

export default function AssetsPage() {
  const lang = useLang();
  const t = (b: { zh: string; en: string }) => b[lang];

  return (
    <>
      {/* 板块1 · 页面标题 */}
      <PageHero title={ASSETS.hero.title} vol="04 / ASSETS" />

      {/* 通栏图片带：原生土地地貌航拍 */}
      <FigureBand
        src="/images/bg-aerial-terrain.jpg"
        alt="维州原生土地储备地貌航拍"
        captionLeft="VICTORIA, AUSTRALIA"
        captionRight="FIG. 01"
      />

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
