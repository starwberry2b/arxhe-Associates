'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Fragment } from 'react';
import { useLang } from '@/lib/i18n';
import { HOME, STRATEGY, ASSETS, PROJECT } from '@/lib/translations';
import RevealSection from '@/components/RevealSection';
import styles from './page.module.css';

/**
 * 首页 / — 02 白廊 · 杂志编辑风（HANDOFF.md §3.5）
 * 板块顺序沿用 CLAUDE.md §6.1，文案逐字取自 lib/translations.ts
 * HeroBackdrop 组件保留但首页不再使用
 */

/** 将中点分隔的字符串拆分为可插 <br/> 的片段（兼容 · 与 ・ 两种中点字符） */
function splitByDot(text: string): string[] {
  return text.split(/[·・]/).map((s) => s.trim());
}

/** 超大中文数字编号（壹贰叁肆） */
const CN_NUM = ['壹', '贰', '叁', '肆'] as const;

export default function HomePage() {
  const lang = useLang();
  const t = (b: { zh: string; en: string }) => b[lang];

  /* Hero 标题：在中点处自然换行，末行品牌蓝强调 */
  const titleLines = splitByDot(t(HOME.hero.title));
  /* Hero 底部辅助文字：中点分隔 */
  const footerParts = splitByDot(t(HOME.hero.footerText));

  return (
    <>
      {/* ================================================================
          板块1 · Hero：通栏杂志封面式
          顶部 micro+VOL. 细线行 → 通栏巨标题 → 底部左副文案 + 右 FIG.01 图
          ================================================================ */}
      <section className={styles.hero}>
        <div className={styles.heroTop}>
          <span className={styles.micro}>{t(HOME.hero.brandTag)}</span>
          <span className={styles.vol}>VOL. 2026 · VICTORIA</span>
        </div>

        <h1 className={styles.heroTitle}>
          {titleLines.map((line, i) => (
            <Fragment key={i}>
              {i > 0 && <br />}
              {i === titleLines.length - 1 && titleLines.length > 1 ? (
                <strong>{line}</strong>
              ) : (
                line
              )}
            </Fragment>
          ))}
        </h1>

        <div className={styles.heroBottom}>
          <div className={styles.heroSub}>
            <p className={styles.heroSubtitle}>{t(HOME.hero.subtitle)}</p>
            <p className={styles.heroFooter}>
              {footerParts.map((part, i) => (
                <Fragment key={i}>
                  {i > 0 && <span className={styles.heroFooterSep} aria-hidden="true">·</span>}
                  <span>{part}</span>
                </Fragment>
              ))}
            </p>
          </div>

          <figure className={styles.heroFigure}>
            <Image
              src="/images/bg-aerial-coastal.jpg"
              alt="澳大利亚维多利亚州海岸线土地航拍"
              width={1120}
              height={840}
              priority
              className={styles.heroImg}
            />
            <figcaption className={styles.figCaption}>
              <span>VICTORIA, AUSTRALIA</span>
              <span>FIG. 01</span>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* ================================================================
          板块2 · 企业核心简介：首字下沉 + 右侧 facts 表
          ================================================================ */}
      <section className={styles.section}>
        <RevealSection>
          <div className={styles.secHead}>
            <h2>{t(HOME.intro.tag)}</h2>
            <span className={styles.secNo}>01 / PROFILE</span>
          </div>
          <div className={styles.profile}>
            <div className={styles.leadCol}>
              {HOME.intro.lines.map((line, i) => (
                <p key={i} className={`${styles.lead} ${i === 0 ? styles.dropCap : ''}`}>
                  {t(line)}
                </p>
              ))}
            </div>
            <div className={styles.facts}>
              <div className={styles.fact}>
                <span className={styles.factK}>PLATFORM</span>
                <span className={styles.factV}>{t(HOME.hero.subtitle)}</span>
              </div>
              <div className={styles.fact}>
                <span className={styles.factK}>FOCUS</span>
                <span className={styles.factV}>{t(HOME.hero.footerText)}</span>
              </div>
              <div className={styles.fact}>
                <span className={styles.factK}>GGR</span>
                <span className={styles.factV}>{t(PROJECT.intro.kpi)}</span>
              </div>
            </div>
          </div>
        </RevealSection>
      </section>

      {/* ================================================================
          板块3 · 三大核心优势：超大中文数字编号列表
          ================================================================ */}
      <section className={styles.section}>
        <div className={styles.secHead}>
          <h2>{t(HOME.advantages.title)}</h2>
          <span className={styles.secNo}>02 / ADVANTAGES</span>
        </div>
        <div className={styles.numList}>
          {HOME.advantages.cards.map((card, i) => (
            <RevealSection key={i}>
              <div className={styles.numItem}>
                <span className={styles.num} aria-hidden="true">{CN_NUM[i]}</span>
                <h3 className={styles.numTitle}>{t(card.title)}</h3>
                <p className={styles.numBody}>{t(card.body)}</p>
              </div>
            </RevealSection>
          ))}
        </div>
      </section>

      {/* ================================================================
          板块4 · 品牌理念：编辑式引语区块
          ================================================================ */}
      <section className={styles.section}>
        <RevealSection>
          <div className={styles.secHead}>
            <h2>{t(HOME.philosophy.title)}</h2>
            <span className={styles.secNo}>03 / PHILOSOPHY</span>
          </div>
          <p className={styles.philosophyBody}>{t(HOME.philosophy.body)}</p>
        </RevealSection>
      </section>

      {/* ================================================================
          板块5 · 四大核心投资策略体系：超大中文数字编号列表
          ================================================================ */}
      <section className={styles.section}>
        <div className={styles.secHead}>
          <h2>{t(STRATEGY.hero.subtitle)}</h2>
          <span className={styles.secNo}>04 / STRATEGY</span>
        </div>
        <div className={styles.numList}>
          {STRATEGY.strategies.map((s, i) => (
            <RevealSection key={i}>
              <div className={styles.numItem}>
                <span className={styles.num} aria-hidden="true">{CN_NUM[i]}</span>
                <h3 className={styles.numTitle}>{t(s.title)}</h3>
                <div className={styles.numBodyCol}>
                  {'body' in s && <p className={styles.numBody}>{t(s.body)}</p>}
                  {'intro' in s && (
                    <>
                      <p className={styles.numBody}>{t(s.intro!)}</p>
                      <ul className={styles.subList}>
                        {s.items!.map((item, j) => (
                          <li key={j}>{t(item)}</li>
                        ))}
                      </ul>
                      <p className={styles.numBody}>{t(s.outro!)}</p>
                    </>
                  )}
                </div>
              </div>
            </RevealSection>
          ))}
        </div>
      </section>

      {/* ================================================================
          板块6 · 四大稀缺资产板块：四栏刊物索引
          ================================================================ */}
      <section className={styles.section}>
        <div className={styles.secHead}>
          <h2>{t(ASSETS.hero.title)}</h2>
          <span className={styles.secNo}>05 / ASSETS</span>
        </div>
        <div className={styles.assetIndex}>
          {ASSETS.cards.map((card, i) => (
            <RevealSection key={i} delay={i * 80}>
              <div className={styles.assetCol}>
                <p className={styles.assetNo}>{`PILLAR 0${i + 1}`}</p>
                <h3 className={styles.assetTitle}>{t(card.title)}</h3>
                <p className={styles.assetBody}>{t(card.body)}</p>
              </div>
            </RevealSection>
          ))}
        </div>
      </section>

      {/* ================================================================
          板块7 · CTA：通栏图片带 + 浅色渐变蒙层 + 品牌蓝大 KPI
          ================================================================ */}
      <section className={styles.band}>
        {/* 旧站品牌循环片（30s 无声）， poster 回退为原土地航拍图 */}
        <video
          src="/videos/brand-loop.mp4"
          poster="/images/bg-aerial-terrain.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-label="Arxhe Associates 品牌影像：墨尔本天际线、土地航拍与商务意象蒙太奇"
          className={styles.bandVideo}
        />
        <div className={styles.bandVeil} aria-hidden="true" />
        <RevealSection className={styles.bandOverlay}>
          <div className={styles.bandText}>
            <p className={styles.micro}>FLAGSHIP PROJECT — FIG. 02</p>
            <h2 className={styles.bandTitle}>{t(HOME.cta.title)}</h2>
            <p className={styles.kpi}>
              {t(PROJECT.intro.kpi)}
              <small>ANNUALIZED · RIPLEY VIEW</small>
            </p>
            <Link href="/investor" className={styles.ctaButton}>
              {t(HOME.cta.button)}
            </Link>
          </div>
        </RevealSection>
      </section>
    </>
  );
}
