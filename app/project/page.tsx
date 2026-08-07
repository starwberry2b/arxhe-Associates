'use client';

import { useLang } from '@/lib/i18n';
import { PROJECT } from '@/lib/translations';
import PageHero from '@/components/PageHero';
import RevealSection from '@/components/RevealSection';
import FigureBand from '@/components/FigureBand';
import styles from './page.module.css';

export default function ProjectPage() {
  const lang = useLang();
  const t = (b: { zh: string; en: string }) => b[lang];

  return (
    <>
      {/* 板块1 · 页面标题 */}
      <PageHero title={PROJECT.hero.title} vol="05 / PROJECT" />

      {/* 板块2 · 项目简介 + KPI */}
      <section className={styles.intro}>
        <RevealSection>
          <div className={styles.sectionInner}>
            <p className={styles.introText}>{t(PROJECT.intro.text)}</p>
            <div className={styles.kpi}>
              <span className={styles.kpiValue}>{t(PROJECT.intro.kpi)}</span>
            </div>
          </div>
        </RevealSection>
      </section>

      {/* 通栏图片带：Ripley View 总体规划图 */}
      <FigureBand
        src="/images/bg-site-plan.jpg"
        alt="Ripley View 项目土地总体规划分区图"
        captionLeft="RIPLEY VIEW, AUSTRALIA"
        captionRight="FIG. 01"
      />

      {/* 板块3 · 核心创新 */}
      <section className={styles.innovations}>
        <div className={styles.sectionInner}>
          <RevealSection>
            <p className={styles.sectionTag}>
              {lang === 'zh' ? '核心创新' : 'Core Innovations'}
            </p>
          </RevealSection>
          <div className={styles.innovationGrid}>
            {PROJECT.innovations.map((item, i) => (
              <RevealSection key={i} delay={i * 100}>
                <div className={styles.innovationItem}>
                  <span className={styles.innovationIndex}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p>{t(item)}</p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* 板块4 · 区位优势 */}
      <section className={styles.location}>
        <RevealSection>
          <div className={styles.sectionInner}>
            <p className={styles.sectionTag}>
              {lang === 'zh' ? '区位优势' : 'Location Advantages'}
            </p>
            <p className={styles.locationIntro}>{t(PROJECT.location.intro)}</p>
            <ul className={styles.locationList}>
              {PROJECT.location.items.map((item, i) => (
                <li key={i}>{t(item)}</li>
              ))}
            </ul>
            <p className={styles.locationOutro}>{t(PROJECT.location.outro)}</p>
          </div>
        </RevealSection>
      </section>

      {/* 通栏图片带：Ripley View 区域土地航拍 */}
      <FigureBand
        src="/images/bg-aerial-development.jpg"
        alt="Ripley View 项目区域土地开发航拍"
        captionLeft="RIPLEY VIEW, AUSTRALIA"
        captionRight="FIG. 02"
      />

      {/* 板块5 · 生态保育 */}
      <section className={styles.ecology}>
        <RevealSection>
          <div className={styles.sectionInner}>
            <p className={styles.sectionTag}>
              {lang === 'zh' ? '生态保育' : 'Ecology & Conservation'}
            </p>
            <p className={styles.ecologyText}>{t(PROJECT.ecology.text)}</p>
            <p className={styles.ecologyCompliance}>{t(PROJECT.ecology.compliance)}</p>
          </div>
        </RevealSection>
      </section>

      {/* 板块6 · 分期开发 */}
      <section className={styles.phasing}>
        <RevealSection>
          <div className={styles.sectionInner}>
            <p className={styles.sectionTag}>
              {lang === 'zh' ? '分期开发' : 'Phased Development'}
            </p>
            <p className={styles.phasingText}>{t(PROJECT.phasing.text1)}</p>
            <p className={styles.phasingText}>{t(PROJECT.phasing.text2)}</p>
          </div>
        </RevealSection>
      </section>

      {/* 板块7 · 价值总结 + 脚注 */}
      <section className={styles.summary}>
        <RevealSection>
          <div className={styles.sectionInner}>
            <p className={styles.summaryText}>{t(PROJECT.summary)}</p>
            <p className={styles.footnote}>{t(PROJECT.footnote)}</p>
          </div>
        </RevealSection>
      </section>
    </>
  );
}
