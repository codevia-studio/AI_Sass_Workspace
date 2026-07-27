# فیچرهای پروژه Codevia Space

> **AI Sass Workspace** — یک SaaS workspace مبتنی بر AI  
> **Stack:** Next.js 16 · React 19 · Supabase · PostgreSQL (Drizzle) · Stripe · Groq

---

## فهرست

- [احراز هویت](#۱-احراز-هویت-authentication)
- [Workspace](#۲-workspace-فضای-کاری)
- [داشبورد](#۳-داشبورد-dashboard)
- [چت AI](#۴-چت-ai)
- [کتابخانه Prompt](#۵-کتابخانه-prompt)
- [تنظیمات](#۶-تنظیمات-settings)
- [SaaS و Billing](#۷-saas-و-billing)
- [Landing Page](#۸-landing-page)
- [زیرساخت](#۹-زیرساخت-و-کیفیت)
- [Roadmap](#roadmap)

---

## ۱. احراز هویت (Authentication)

| فیچر | وضعیت |
|------|--------|
| ثبت‌نام (Signup) | ✅ |
| ورود (Login) | ✅ |
| فراموشی رمز عبور | ✅ |
| بازنشانی رمز عبور | ✅ |
| OAuth callback | ✅ |
| مسیرهای محافظت‌شده (redirect به login) | ✅ |
| مدیریت session با Supabase | ✅ |

**مسیرهای مرتبط:**
- `app/auth/login/`
- `app/auth/signup/`
- `app/auth/forgot-password/`
- `app/auth/reset-password/`
- `app/auth/callback/route.ts`
- `proxy.ts`

---

## ۲. Workspace (فضای کاری)

| فیچر | وضعیت |
|------|--------|
| ساخت workspace جدید | ✅ |
| تعویض بین workspaceها | ✅ |
| ویرایش نام workspace | ✅ |
| حذف workspace | ✅ |
| جداسازی context (چت‌ها و promptها per workspace) | ✅ |

**مسیرهای مرتبط:**
- `lib/actions/workspace.ts`
- `components/shared/dashboard/workspace-selector.tsx`
- `components/shared/dashboard/workspace-create-modal.tsx`
- `components/shared/dashboard/workspace-actions.tsx`

---

## ۳. داشبورد (Dashboard)

| فیچر | وضعیت |
|------|--------|
| نمایش لیست چت‌های هر workspace | ✅ |
| ساخت چت جدید | ✅ |
| پین کردن چت | ✅ |
| ویرایش عنوان چت | ✅ |
| حذف چت | ✅ |
| حالت empty state (وقتی workspace انتخاب نشده) | ✅ |

**مسیرهای مرتبط:**
- `app/(dashboard)/dashboard/page.tsx`
- `lib/actions/chat.ts`
- `components/shared/dashboard/chats-list.tsx`
- `components/shared/dashboard/chat-item-row.tsx`

---

## ۴. چت AI

| فیچر | وضعیت |
|------|--------|
| پاسخ streaming (Groq API) | ✅ |
| رندر Markdown + GFM | ✅ |
| Syntax highlighting برای بلاک‌های کد | ✅ |
| دکمه کپی کد | ✅ |
| ذخیره پیام‌های user و assistant در DB | ✅ |
| بارگذاری تاریخچه مکالمه | ✅ |
| عنوان خودکار از اولین پیام | ✅ |
| Prompt Picker (استفاده از prompt ذخیره‌شده داخل چت) | ✅ |
| محدودیت credit برای هر پیام | ✅ |

**مسیرهای مرتبط:**
- `app/api/chat/route.ts`
- `app/(dashboard)/dashboard/chat/[chatId]/`
- `components/shared/dashboard/prompt-picker.tsx`

---

## ۵. کتابخانه Prompt

| فیچر | وضعیت |
|------|--------|
| ساخت / ویرایش / حذف prompt | ✅ |
| دسته‌بندی (General, Coding, Writing, Marketing, Productivity) | ✅ |
| علامت‌گذاری Favorite | ✅ |
| جستجو و فیلتر (دسته + favorites) | ✅ |
| scope سراسری یا مخصوص workspace | ✅ |
| استفاده مستقیم در چت | ✅ |

**مسیرهای مرتبط:**
- `app/(dashboard)/dashboard/prompts/`
- `lib/actions/prompts.ts`
- `lib/validations/prompt.ts`

---

## ۶. تنظیمات (Settings)

| فیچر | وضعیت |
|------|--------|
| ویرایش نام پروفایل | ✅ |
| آپلود آواتار (Supabase Storage) | ✅ |
| تب Billing | ✅ |
| Dark / Light mode (Theme toggle در sidebar) | ✅ |

**مسیرهای مرتبط:**
- `app/(dashboard)/dashboard/settings/`
- `lib/actions/user.ts`
- `components/ui/theme-togle.tsx`

---

## ۷. SaaS و Billing

| فیچر | وضعیت |
|------|--------|
| صفحه Pricing عمومی | ✅ |
| پلن‌های Free, Pro, Pro+, Enterprise | ✅ |
| Stripe Checkout | ✅ |
| تغییر / ارتقای پلن | ✅ |
| Webhook برای sync اشتراک | ✅ |
| سیستم message credits | ✅ |
| نمایش credit باقی‌مانده در sidebar | ✅ |
| پلن Free: ۱۰ credit پیش‌فرض | ✅ |

**مسیرهای مرتبط:**
- `app/pricing/page.tsx`
- `app/api/stripe/webhook/route.ts`
- `lib/actions/stripe.ts`
- `lib/stripe/`
- `lib/subscription/credits.ts`

---

## ۸. Landing Page

| بخش | توضیح |
|-----|--------|
| Hero | معرفی محصول |
| Features | لیست فیچرها با وضعیت MVP / Soon / Phase 2 |
| Roadmap | فازهای توسعه |
| MVP | خلاصه حداقل محصول |
| CTA + Footer | دعوت به action |

**مسیرهای مرتبط:**
- `app/(landing)/`
- `app/(landing)/_components/constants.ts`

---

## ۹. زیرساخت و کیفیت

| موضوع | جزئیات |
|-------|--------|
| دیتابیس | PostgreSQL + Drizzle ORM |
| جداول | `profiles`, `workspaces`, `chats`, `messages`, `subscriptions`, `prompts` |
| Authorization | بررسی مالکیت chat، workspace و prompt |
| تست | Jest — credits، Stripe، validation، UI |
| UI | shadcn/ui + Tailwind CSS 4 |

**دستورات تست:**

```bash
pnpm test
pnpm test:watch
pnpm test:coverage
```

---

## Roadmap

| فاز | عنوان | محتوا | وضعیت |
|-----|--------|-------|--------|
| 01 | Foundation | Auth · Database · Protected routes | ✅ |
| 02 | Core Product | Dashboard · Workspaces · Navigation | ✅ |
| 03 | AI Chat Engine | Streaming · History · Markdown | ✅ |
| 04 | Productivity | Prompt library · Search & filter | ✅ |
| 05 | Polish | Settings · Loading · Mobile UX | ✅ |
| 06 | SaaS Layer | Stripe · Plans · Usage limits | ✅ |

### MVP (حداقل محصول)

- [x] Login system
- [x] Workspace system
- [x] AI chat with streaming
- [x] Save & load conversations
- [x] Basic dashboard

---

## مدل داده (Schema)

```
profiles
  └── workspaces
        ├── chats
        │     └── messages
        └── prompts
  └── subscriptions
```

---

## پلن‌های اشتراک

| پلن | Credit | توضیح |
|-----|--------|-------|
| Free | 10 | شروع رایگان |
| Pro | — | از Stripe |
| Pro+ | — | از Stripe |
| Enterprise | — | از Stripe |
