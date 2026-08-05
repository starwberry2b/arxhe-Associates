'use client';

import Link from 'next/link';
import { Fragment } from 'react';
import { useLang } from '@/lib/i18n';
import { HOME } from '@/lib/translations';
import RevealSection from '@/components/RevealSection';
import { ADVANTAGE_ICONS } from '@/components/icons';
import styles from './page.module.css';

/**
 * 首页 / — 5 板块完整布局（CLAUDE.md §6.1）
 * 支持中英双语切换
 */

/** 将 `·` 分隔的字符串拆分为可插 <br/> 的片段 */
function splitByDot(text: string): string[] {
  return text.split('·').map((s) => s.trim());
}

export default function HomePage() {
  const lang = useLang();
  const t = (b: { zh: string; en: string }) => b[lang];

  /* Hero 标题：在中点处自然换行 */
  const titleLines = splitByDot(t(HOME.hero.title));
  /* 底部辅助文字：中点分隔 + 间隔符 */
  const footerParts = splitByDot(t(HOME.hero.footerText));

  return (
    <>
      {/* ================================================================
          板块1 · 首屏主视觉 Hero（无需 Reveal，自带 fadeIn）
          ================================================================ */}
      <section className={styles.hero}>
        {/* 四角测绘标记 */}
        <div className={`${styles.gridMark} ${styles.topLeft}`} aria-hidden="true" />
        <div className={`${styles.gridMark} ${styles.topRight}`} aria-hidden="true" />
        <div className={`${styles.gridMark} ${styles.bottomLeft}`} aria-hidden="true" />
        <div className={`${styles.gridMark} ${styles.bottomRight}`} aria-hidden="true" />

        <div className={styles.heroContent}>
          <p className={styles.brandTag}>{t(HOME.hero.brandTag)}</p>
          <h1 className={styles.heroTitle}>
            {titleLines.map((line, i) => (
              <Fragment key={i}>
                {i > 0 && <br />}
                {line}
              </Fragment>
            ))}
          </h1>
          <p className={styles.heroSubtitle}>{t(HOME.hero.subtitle)}</p>
          <span className={styles.divider} aria-hidden="true" />
          <p className={styles.heroFooter}>
            {footerParts.map((part, i) => (
              <Fragment key={i}>
                {i > 0 && <span className={styles.heroFooterSep}>·</span>}
                {part}
              </Fragment>
            ))}
          </p>
        </div>

        <div className={styles.scrollHint} aria-hidden="true">
          <span>{t(HOME.hero.scrollHint)}</span>
          <div className={styles.scrollLine} />
        </div>
      </section>

      {/* ================================================================
          板块2 · 企业核心简介
          ================================================================ */}
      <section className={styles.intro}>
        <RevealSection>
          <div className={styles.sectionInner}>
            <p className={styles.sectionTag}>{t(HOME.intro.tag)}</p>
            <div className={styles.introTexts}>
              {HOME.intro.lines.map((line, i) => (
                <p key={i} className={styles.introText}>{t(line)}</p>
              ))}
            </div>
          </div>
        </RevealSection>
      </section>

      {/* ================================================================
          板块3 · 三大核心优势
          ================================================================ */}
      <section className={styles.advantages}>
        <div className={styles.sectionInner}>
          <RevealSection>
            <p className={styles.sectionTag}>{t(HOME.advantages.tag)}</p>
            <h2 className={styles.sectionTitle}>{t(HOME.advantages.title)}</h2>
          </RevealSection>

          <div className={styles.cardGrid}>
            {HOME.advantages.cards.map((card, i) => (
              <RevealSection key={i} delay={i * 120}>
                <article className={styles.card}>
                  <div className={styles.cardIcon} aria-hidden="true">
                    {ADVANTAGE_ICONS[i]}
                  </div>
                  <h3 className={styles.cardTitle}>{t(card.title)}</h3>
                  <p className={styles.cardBody}>{t(card.body)}</p>
                </article>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          板块4 · 品牌理念 — 智慧放大器
          ================================================================ */}
      <section className={styles.philosophy}>
        <RevealSection>
          <div className={styles.sectionInner}>
            <h2 className={styles.philosophyTitle}>{t(HOME.philosophy.title)}</h2>
            <span className={`${styles.divider} ${styles.dividerGold}`} aria-hidden="true" />
            <p className={styles.philosophyBody}>{t(HOME.philosophy.body)}</p>
          </div>
        </RevealSection>
      </section>

      {/* ================================================================
          板块5 · 底部 CTA
          ================================================================ */}
      <section className={styles.cta}>
        <RevealSection>
          <div className={styles.sectionInner}>
            <h2 className={styles.ctaTitle}>{t(HOME.cta.title)}</h2>
            <Link href="/investor" className={styles.ctaButton}>
              {t(HOME.cta.button)}
            </Link>
          </div>
        </RevealSection>
      </section>
    </>
  );
}
