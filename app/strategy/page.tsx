'use client';

import { useLang } from '@/lib/i18n';
import { STRATEGY } from '@/lib/translations';
import PageHero from '@/components/PageHero';
import RevealSection from '@/components/RevealSection';
import FigureBand from '@/components/FigureBand';
import styles from './page.module.css';

export default function StrategyPage() {
  const lang = useLang();
  const t = (b: { zh: string; en: string }) => b[lang];

  /* 超大中文数字编号（壹贰叁肆） */
  const CN_NUM = ['壹', '贰', '叁', '肆'] as const;

  return (
    <>
      {/* 板块1 · 页面标题 */}
      <PageHero title={STRATEGY.hero.title} subtitle={STRATEGY.hero.subtitle} vol="03 / STRATEGY" />

      {/* 板块2 · 四大策略纵向排列 */}
      <section className={styles.strategies}>
        <div className={styles.sectionInner}>
          {STRATEGY.strategies.map((s, i) => (
            <RevealSection key={i}>
              <div className={styles.strategyBlock}>
                {/* 超大中文数字编号 */}
                <span className={styles.strategyIndex} aria-hidden="true">
                  {CN_NUM[i]}
                </span>
                <h2 className={styles.strategyTitle}>{t(s.title)}</h2>
                {'body' in s && (
                  <p className={styles.strategyBody}>{t(s.body)}</p>
                )}

                {/* 策略3 特有：引导语 + 列表 + 收尾 */}
                {'intro' in s && (
                  <>
                    <p className={styles.strategyIntro}>{t(s.intro)}</p>
                    <ul className={styles.strategyList}>
                      {s.items!.map((item, j) => (
                        <li key={j}>{t(item)}</li>
                      ))}
                    </ul>
                    <p className={styles.strategyOutro}>{t(s.outro)}</p>
                  </>
                )}
              </div>
            </RevealSection>
          ))}
        </div>
      </section>
      {/* 通栏图片带：土地总体规划图（收尾视觉） */}
      <FigureBand
        src="/images/bg-site-plan.jpg"
        alt="土地总体规划分区图"
        captionLeft="LAND MASTER PLAN"
        captionRight="FIG. 01"
      />
    </>
  );
}
