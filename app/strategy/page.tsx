'use client';

import { useLang } from '@/lib/i18n';
import { STRATEGY } from '@/lib/translations';
import PageHero from '@/components/PageHero';
import RevealSection from '@/components/RevealSection';
import styles from './page.module.css';

export default function StrategyPage() {
  const lang = useLang();
  const t = (b: { zh: string; en: string }) => b[lang];

  return (
    <>
      {/* 板块1 · 页面标题 */}
      <PageHero title={STRATEGY.hero.title} subtitle={STRATEGY.hero.subtitle} />

      {/* 板块2 · 四大策略纵向排列 */}
      <section className={styles.strategies}>
        <div className={styles.sectionInner}>
          {STRATEGY.strategies.map((s, i) => (
            <RevealSection key={i}>
              <div className={styles.strategyBlock}>
                {/* 序号 */}
                <span className={styles.strategyIndex}>
                  {String(i + 1).padStart(2, '0')}
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
    </>
  );
}
