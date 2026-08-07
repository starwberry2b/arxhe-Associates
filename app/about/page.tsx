'use client';

import { useLang } from '@/lib/i18n';
import { ABOUT } from '@/lib/translations';
import PageHero from '@/components/PageHero';
import RevealSection from '@/components/RevealSection';
import FigureBand from '@/components/FigureBand';
import styles from './page.module.css';

export default function AboutPage() {
  const lang = useLang();
  const t = (b: { zh: string; en: string }) => b[lang];

  return (
    <>
      {/* 板块1 · 页面标题 */}
      <PageHero title={ABOUT.hero.title} vol="02 / ABOUT" />

      {/* 板块2 · 企业完整版简介 */}
      <section className={styles.intro}>
        <RevealSection>
          <div className={styles.sectionInner}>
            <p className={styles.sectionTag}>{lang === 'zh' ? '企业简介' : 'Overview'}</p>
            <div className={styles.introTexts}>
              {ABOUT.intro.lines.map((line, i) => (
                <p key={i} className={`${styles.introText} ${i === 0 ? styles.lead : ''}`}>
                  {t(line)}
                </p>
              ))}
            </div>
          </div>
        </RevealSection>
      </section>

      {/* 通栏图片带：待开发土地航拍 */}
      <FigureBand
        src="/images/bg-aerial-development.jpg"
        alt="维州高潜力扩张区域待开发土地网格航拍"
        captionLeft="VICTORIA, AUSTRALIA"
        captionRight="FIG. 01"
      />

      {/* 板块3 · 核心壁垒 2×2 网格 */}
      <section className={styles.barriers}>
        <div className={styles.sectionInner}>
          <RevealSection>
            <p className={styles.sectionTag}>{t(ABOUT.barriers.title)}</p>
          </RevealSection>
          <div className={styles.grid2x2}>
            {ABOUT.barriers.cards.map((card, i) => (
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

      {/* 板块4 · 品牌理念完整版 */}
      <section className={styles.philosophy}>
        <RevealSection>
          <div className={styles.sectionInner}>
            <h2 className={styles.philosophyTitle}>{t(ABOUT.philosophy.title)}</h2>
            <span className={styles.divider} aria-hidden="true" />
            <p className={styles.philosophyBody}>{t(ABOUT.philosophy.body)}</p>
          </div>
        </RevealSection>
      </section>
    </>
  );
}
