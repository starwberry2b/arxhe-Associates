'use client';

import { useState, type FormEvent, type ChangeEvent } from 'react';
import { useLang } from '@/lib/i18n';
import { INVESTOR } from '@/lib/translations';
import PageHero from '@/components/PageHero';
import RevealSection from '@/components/RevealSection';
import styles from './page.module.css';

/* 校验规则 */
const PHONE_RE = /^1[3-9]\d{9}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface FormData {
  name: string;
  organization: string;
  phone: string;
  email: string;
  type: string;
}

interface FormErrors {
  name?: string;
  organization?: string;
  phone?: string;
  email?: string;
  type?: string;
}

const INITIAL_FORM: FormData = {
  name: '',
  organization: '',
  phone: '',
  email: '',
  type: '',
};

export default function InvestorPage() {
  const lang = useLang();
  const t = (b: { zh: string; en: string }) => b[lang];
  const f = INVESTOR.form;

  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    /* 输入时清除对应字段错误 */
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = (): boolean => {
    const errs: FormErrors = {};

    if (!form.name.trim())           errs.name = t(f.errors.required);
    if (!form.organization.trim())   errs.organization = t(f.errors.required);
    if (!form.phone.trim())          errs.phone = t(f.errors.required);
    else if (!PHONE_RE.test(form.phone.trim())) errs.phone = t(f.errors.phone);
    if (!form.email.trim())          errs.email = t(f.errors.required);
    else if (!EMAIL_RE.test(form.email.trim())) errs.email = t(f.errors.email);
    if (!form.type)                  errs.type = t(f.errors.required);

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    /* 前端模拟提交 */
    setSubmitted(true);
    setForm(INITIAL_FORM);
    setErrors({});

    /* 5 秒后自动收起成功提示 */
    setTimeout(() => setSubmitted(false), 8000);
  };

  return (
    <>
      {/* 板块1 · 页面标题 */}
      <PageHero title={INVESTOR.hero.title} />

      {/* 板块2 · 合作前言 */}
      <section className={styles.intro}>
        <RevealSection>
          <div className={styles.sectionInner}>
            <div className={styles.introTexts}>
              {INVESTOR.intro.lines.map((line, i) => (
                <p key={i} className={`${styles.introText} ${i === 0 ? styles.lead : ''}`}>
                  {t(line)}
                </p>
              ))}
            </div>
          </div>
        </RevealSection>
      </section>

      {/* 板块3 · 合作方向 */}
      <section className={styles.directions}>
        <RevealSection>
          <div className={styles.sectionInner}>
            <p className={styles.sectionTag}>
              {lang === 'zh' ? '合作方向' : 'Partnership Directions'}
            </p>
            <ul className={styles.directionList}>
              {INVESTOR.directions.map((d, i) => (
                <li key={i}>{t(d)}</li>
              ))}
            </ul>
          </div>
        </RevealSection>
      </section>

      {/* 板块4 · 预约表单 */}
      <section className={styles.formSection}>
        <RevealSection>
          <div className={styles.sectionInner}>
            {/* 成功反馈 */}
            {submitted && (
              <div className={styles.successBanner} role="status">
                {t(f.success)}
              </div>
            )}

            <form className={styles.form} onSubmit={handleSubmit} noValidate>
              {/* 姓名 */}
              <div className={styles.field}>
                <label className={styles.label} htmlFor="investor-name">
                  {t(f.name)} <span className={styles.required}>*</span>
                </label>
                <input
                  id="investor-name"
                  className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder={t(f.name)}
                />
                {errors.name && <p className={styles.error}>{errors.name}</p>}
              </div>

              {/* 机构名称 */}
              <div className={styles.field}>
                <label className={styles.label} htmlFor="investor-org">
                  {t(f.organization)} <span className={styles.required}>*</span>
                </label>
                <input
                  id="investor-org"
                  className={`${styles.input} ${errors.organization ? styles.inputError : ''}`}
                  type="text"
                  name="organization"
                  value={form.organization}
                  onChange={handleChange}
                  placeholder={t(f.organization)}
                />
                {errors.organization && <p className={styles.error}>{errors.organization}</p>}
              </div>

              {/* 手机号 */}
              <div className={styles.field}>
                <label className={styles.label} htmlFor="investor-phone">
                  {t(f.phone)} <span className={styles.required}>*</span>
                </label>
                <input
                  id="investor-phone"
                  className={`${styles.input} ${errors.phone ? styles.inputError : ''}`}
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder={t(f.phone)}
                />
                {errors.phone && <p className={styles.error}>{errors.phone}</p>}
              </div>

              {/* 邮箱 */}
              <div className={styles.field}>
                <label className={styles.label} htmlFor="investor-email">
                  {t(f.email)} <span className={styles.required}>*</span>
                </label>
                <input
                  id="investor-email"
                  className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder={t(f.email)}
                />
                {errors.email && <p className={styles.error}>{errors.email}</p>}
              </div>

              {/* 意向合作类型 */}
              <div className={styles.field}>
                <label className={styles.label} htmlFor="investor-type">
                  {t(f.type)} <span className={styles.required}>*</span>
                </label>
                <select
                  id="investor-type"
                  className={`${styles.input} ${styles.select} ${errors.type ? styles.inputError : ''}`}
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    {lang === 'zh' ? '请选择合作类型' : 'Select partnership type'}
                  </option>
                  {INVESTOR.directions.map((d, i) => (
                    <option key={i} value={t(d)}>
                      {t(d)}
                    </option>
                  ))}
                </select>
                {errors.type && <p className={styles.error}>{errors.type}</p>}
              </div>

              {/* 提交按钮 */}
              <button type="submit" className={styles.submitBtn}>
                {t(f.submit)}
              </button>
            </form>
          </div>
        </RevealSection>
      </section>
    </>
  );
}
