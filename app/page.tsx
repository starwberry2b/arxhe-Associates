'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Fragment, useEffect, useRef, useState } from 'react';
import { useLang } from '@/lib/i18n';
import { useIsMobile } from '@/lib/useIsMobile';
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
  const isMobile = useIsMobile();
  /* 挂载后再渲染 video，避免手机端先误下载桌面大文件 */
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  /* 微信 X5 等内嵌浏览器会拦 autoplay 属性，需主动 play() + 首次触碰兜底 */
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (!mounted) return;
    const v = videoRef.current;
    if (!v) return;
    const tryPlay = () => v.play().catch(() => { /* 被拦时等用户触碰或 JSBridge */ });
    tryPlay();
    /* 微信专有：JSBridge 就绪后调用 play() 可绕过 X5 自动播放限制 */
    document.addEventListener('WeixinJSBridgeReady', tryPlay);
    const resume = () => tryPlay();
    document.addEventListener('touchstart', resume, { once: true });
    return () => {
      document.removeEventListener('WeixinJSBridgeReady', tryPlay);
      document.removeEventListener('touchstart', resume);
    };
  }, [mounted]);
  /* 微信内核只给 MP4（对 webm 的兼容性声明不可靠） */
  const isWeChat = mounted && /MicroMessenger/i.test(navigator.userAgent);
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

          {/* 编辑拼贴三联：左海岸线航拍 / 中央品牌短片 / 右墨尔本天际线长片帧 */}
          <figure className={styles.heroFigure}>
            <div className={styles.trio}>
              <div className={`${styles.tile} ${styles.tileL}`}>
                <Image
                  src="/images/bg-aerial-coastal-w1920.jpg"
                  alt="澳大利亚维多利亚州海岸线土地航拍"
                  fill
                  sizes="(max-width: 767px) 30vw, 220px"
                  className={styles.tileImg}
                />
              </div>
              <div className={`${styles.tile} ${styles.tileC}`}>
                {mounted && (
                  <video
                    ref={videoRef}
                    poster="/images/brand-cover-1080.jpg"
                    autoPlay
                    muted
                    loop
                    playsInline
                    {...{ 'x5-playsinline': 'true', 'webkit-playsinline': 'true', 'x5-video-player-type': 'h5-page' }}
                    preload="auto"
                    onClick={(e) => e.currentTarget.play()}
                    aria-label="Arxhe Associates 品牌短片：墨尔本天际线、土地航拍与商务意象蒙太奇"
                    className={styles.tileVideo}
                  >
                    {isMobile ? (
                      isWeChat ? (
                        <source src="/videos/brand-loop-720.mp4" type="video/mp4" />
                      ) : (
                        <>
                          {/* VP9 720p：同画质体积更小，安卓/Chrome 优先 */}
                          <source src="/videos/brand-loop-720.webm" type="video/webm" />
                          {/* H.264 720p：iOS Safari 兜底 */}
                          <source src="/videos/brand-loop-720.mp4" type="video/mp4" />
                        </>
                      )
                    ) : (
                      <source src="/videos/brand-loop-1080.mp4" type="video/mp4" />
                    )}
                  </video>
                )}
              </div>
              <div className={`${styles.tile} ${styles.tileR}`}>
                <Image
                  src="/images/brand-film-skyline.jpg"
                  alt="品牌片帧：墨尔本天际线"
                  fill
                  sizes="(max-width: 767px) 30vw, 220px"
                  className={styles.tileImg}
                />
              </div>
            </div>
            <figcaption className={styles.figCaption}>
              <span>VICTORIA, AUSTRALIA</span>
              <span>FIG. 01 — BRAND REEL</span>
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
        <Image
          src="/images/596c406df3d10809577e81d198971c82.jpg"
          alt="Ripley View 项目土地航拍"
          fill
          sizes="100vw"
          className={styles.bandImg}
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
