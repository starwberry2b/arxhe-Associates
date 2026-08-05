'use client';

import { useLang } from '@/lib/i18n';
import { BRAND, FOOTER } from '@/lib/translations';
import styles from './Footer.module.css';

/**
 * 全局页脚 — 六页一致（CLAUDE.md §5.2）
 * 支持中英双语切换
 */
export default function Footer() {
  const lang = useLang();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        {/* 品牌 */}
        <div className={styles.brand}>
          <p className={styles.brandName}>{BRAND.name[lang]}</p>
          <p className={styles.tagline}>{FOOTER.tagline[lang]}</p>
          <p className={styles.slogan}>{FOOTER.slogan[lang]}</p>
        </div>

        {/* 点缀分割线 */}
        <div className={styles.divider} aria-hidden="true" />

        {/* 链接 */}
        <nav className={styles.links}>
          {FOOTER.links.map((link) => (
            <a key={link.en} href="#">
              {link[lang]}
            </a>
          ))}
        </nav>

        {/* 归属 */}
        <p className={styles.affiliation}>{FOOTER.affiliation[lang]}</p>
      </div>
    </footer>
  );
}
