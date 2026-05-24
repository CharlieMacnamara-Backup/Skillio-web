# Sicamon 10x CI/CD Specification

This document specifies the CI/CD rules and audit requirements for Sicamon projects. Follow these specifications to ensure your project passes CI/CD verification.

## CI/CD Workflow Configuration

### GitHub Actions Workflow

File: `.github/workflows/sicamon-verify.yml`

```yaml
name: Sicamon 10x CI

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  verify:
    name: 10x Audit & Build Verification
    runs-on: ubuntu-latest
    env:
      FORCE_JAVASCRIPT_ACTIONS_TO_NODE24: true
      STRIPE_SECRET_KEY: "${{secrets.STRIPE_SECRET_KEY || ''}}"
      NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: "${{secrets.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ''}}"
      STRIPE_WEBHOOK_SECRET: "${{secrets.STRIPE_WEBHOOK_SECRET || ''}}"
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '22'
          cache: 'npm'
          
      - name: Install Dependencies
        run: npm ci
        
      - name: Sicamon 10x Audit (Zod + Security)
        run: npm run verify
          
      - name: Next.js 16 Build Verification (OpenNext)
        run: npm run build
```

### Critical Environment Variables

- **Node.js Version**: Must use Node.js 22 in CI/CD
- **Stripe Secrets**: Must be optional (use `|| ''` fallback) to allow builds without secrets
- **FORCE_JAVASCRIPT_ACTIONS_TO_NODE24**: Required for GitHub Actions compatibility

## Audit Rules Specification

File: `scripts/verify.mjs`

### 1. Production: Exact Dependency Pins

**Rule ID**: `VERSION_LOCK`

**Requirement**: Pin critical dependencies without caret (^) or tilde (~) prefixes.

**Targets**: `next`, `react`, `stripe`, `tailwindcss`

**Example**:
```json
{
  "dependencies": {
    "next": "16.2.1",  // ✅ Correct
    "react": "19.0.0", // ✅ Correct
    "stripe": "17.3.1" // ✅ Correct
  }
}
```

### 2. Stripe Atelier (2026-03-25)

**Rule ID**: `ATELIER_PROTOCOL`

**Requirement**: Stripe library must use API version `2026-03-25.dahlia` and include appInfo.

**File**: `src/lib/stripe.ts`

**Required**:
```typescript
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2026-03-25.dahlia' as any,
  appInfo: {
    name: 'your-project-name',
    version: '1.0.0',
  },
  typescript: true,
});
```

**CRITICAL**: Make STRIPE_SECRET_KEY optional to prevent build failures in CI/CD:
```typescript
export const stripe = process.env.STRIPE_SECRET_KEY 
  ? new Stripe(process.env.STRIPE_SECRET_KEY, { ... })
  : null;
```

### 3. Stripe: Embedded Page Protocol

**Rule ID**: `DAHLIA_UI_MODE`

**Requirement**: All checkout sessions must use `ui_mode: 'embedded_page'`.

**Example**:
```typescript
const session = await stripe.checkout.sessions.create({
  ui_mode: 'embedded_page', // ✅ Required
  // ... other params
});
```

### 4. Stripe: Async Webhook Standard

**Rule ID**: `WEBHOOK_ASYNC`

**Requirement**: Webhook verification must use `constructEventAsync` for Cloudflare compatibility.

**File**: `src/app/api/webhook/route.ts`

**Required**:
```typescript
const event = await stripe.webhooks.constructEventAsync(
  body,
  signature,
  webhookSecret
);
```

### 5. Security: Zod/Protocol Validation

**Rule ID**: `SERVER_ACTION_ZOD`

**Requirement**: All server action inputs must be validated with Zod.

**Example**:
```typescript
export async function checkoutAction(formData: FormData) {
  const data = checkoutSchema.parse(formData); // ✅ Required
  // ... process data
}
```

### 6. Dahlia: Professional Zod Issues

**Rule ID**: `DAHLIA_ZOD_ISSUES`

**Requirement**: Use `.issues` instead of legacy `.errors` for ZodError handling.

**Example**:
```typescript
const result = schema.safeParse(data);
if (!result.success) {
  console.log(result.error.issues); // ✅ Correct
  // NOT: result.error.errors
}
```

### 7. Logic: Localization Integrity

**Rule ID**: `LOCALISATION_INTEGRITY`

**Requirement**: All `t("key")` calls must have corresponding entries in `messages/en.json`.

**Example**:
```typescript
// Component
const t = useTranslations('details');
return <h1>{t("title")}</h1>;

// messages/en.json
{
  "details": {
    "title": "Product Details" // ✅ Required
  }
}
```

### 8. Logic: No Hardcoded Text

**Rule ID**: `HARDCODED_TEXT`

**Requirement**: All user-facing text must use `t("key")` localization.

**Example**:
```tsx
// ❌ Wrong
<h1>Welcome to our store</h1>

// ✅ Correct
<h1>{t("welcome")}</h1>
```

**Ignored terms**: `Sicamon`, `Atelier`, `Studio`, `Dahlia`, `Home`, `Contact`, `Gallery`, `Authenticity`

### 9. UX: Adaptive Gallery Spacing ⚠️ CRITICAL

**Rule ID**: `UI_ADAPTIVE_HELPERS`

**Requirement**: All spacing classes (padding, margin, gap) must have responsive spacing variants in the same className.

**CRITICAL IMPLEMENTATION DETAILS**:
- The regex checks for **responsive spacing classes specifically**, not just any responsive class
- Pattern: `/^(sm|md|lg|xl|2xl):(p[xy]?|m[xy]?|gap)-/`
- If a className has `px-6`, it must have `sm:px-8` (or similar responsive spacing)
- Having `sm:text-sm` does NOT satisfy the requirement for `px-6`

**Examples**:
```tsx
// ❌ Wrong - spacing without responsive spacing variant
<div className="px-6 py-2.5 text-[10px] sm:text-sm">

// ✅ Correct - spacing has responsive spacing variant
<div className="px-4 sm:px-6 py-2 sm:py-2.5 text-[10px] sm:text-sm">

// ❌ Wrong - gap without responsive spacing variant
<div className="flex gap-6">

// ✅ Correct - gap has responsive spacing variant
<div className="flex gap-6 sm:gap-8">
```

**Affected files**: All `.tsx` files in `src/app` and `_components`

**Spacing classes checked**: `p-`, `px-`, `py-`, `m-`, `mx-`, `my-`, `gap-`

### 10. Aesthetics: Museum Gallery Finish

**Rule ID**: `UI_BOUTIQUE_AESTHETICS`

**Requirement**: All headings must have tracking classes.

**Example**:
```tsx
<h1 className="tracking-tight">Title</h1> // ✅ Required
<h2 className="tracking-tighter">Subtitle</h2> // ✅ Required
```

### 11. Safety: Site-wide Fraud Detection

**Rule ID**: `UI_FRAUD_TELEMETRY`

**Requirement**: Stripe.js must be injected site-wide in layout.

**File**: `src/app/[locale]/layout.tsx`

**Required**:
```tsx
<Script src="https://js.stripe.com/v3" />
```

### 12. Accessibility: Alt Text

**Rule ID**: `A11y_ALT`

**Requirement**: All images must have alt text.

**Example**:
```tsx
<Image src="/image.jpg" alt="Description" /> // ✅ Required
```

### 13. UX: Loading States

**Rule ID**: `LTS_LOADING`

**Requirement**: Every page must have a sibling `loading.tsx` file.

**Example**:
```
src/app/[locale]/page.tsx
src/app/[locale]/loading.tsx // ✅ Required
```

### 14. Aesthetics: Clean Prop Mapping

**Rule ID**: `UI_CSS_CONFLICT`

**Requirement**: Avoid conflicting Tailwind classes on the same breakpoint.

**Example**:
```tsx
// ❌ Wrong - conflicting tracking classes
<div className="tracking-tight tracking-tighter">

// ❌ Wrong - conflicting text colors
<div className="text-zinc-900 text-white">

// ✅ Correct - no conflicts
<div className="tracking-tight text-zinc-900">
```

## Verification Steps

The CI/CD pipeline runs these steps in order:

1. **Linting**: `npx eslint src --fix`
2. **Type Safety**: `npx tsc --noEmit --strict --skipLibCheck`
3. **Declarative Audit**: All rules above
4. **Build**: `npm run build`

## Common Pitfalls

### 1. Adaptive Gallery Spacing False Positives

**Problem**: Audit fails with "Spacing classes without responsive spacing variant" even though you have responsive classes.

**Cause**: The rule checks for **responsive spacing classes specifically**, not just any responsive class.

**Solution**: Ensure every spacing class has a corresponding responsive spacing class:
- `px-6` needs `sm:px-8` (not just `sm:text-sm`)
- `gap-6` needs `sm:gap-8` (not just `sm:flex`)

### 2. STRIPE_SECRET_KEY Build Failure

**Problem**: Build fails with "STRIPE_SECRET_KEY is required" in CI/CD.

**Cause**: Stripe library throws error when secret is missing.

**Solution**: Make STRIPE_SECRET_KEY optional:
```typescript
export const stripe = process.env.STRIPE_SECRET_KEY 
  ? new Stripe(process.env.STRIPE_SECRET_KEY, { ... })
  : null;
```

### 3. Node.js Version Mismatch

**Problem**: Audit passes locally but fails in CI/CD.

**Cause**: Local Node.js version differs from CI/CD (Node 22).

**Solution**: Test with Node 22 locally before pushing.

### 4. Line Ending Issues

**Problem**: Git converts LF to CRLF on Windows, causing issues.

**Solution**: Use `.gitattributes` or let Git handle it automatically.

## Testing Locally

Before pushing, run the full audit locally:

```bash
npm run verify
npm run build
```

Ensure you're using Node.js 22:
```bash
node --version  # Should be v22.x.x
```

## Checklist for New Projects

- [ ] Pin critical dependencies in package.json
- [ ] Configure Stripe with 2026-03-25.dahlia API version
- [ ] Add appInfo to Stripe configuration
- [ ] Make STRIPE_SECRET_KEY optional
- [ ] Use ui_mode: 'embedded_page' for checkout sessions
- [ ] Use constructEventAsync for webhooks
- [ ] Validate all server action inputs with Zod
- [ ] Use .issues for ZodError handling
- [ ] Add all t("key") entries to en.json
- [ ] Replace hardcoded text with t("key") calls
- [ ] Add responsive spacing variants to all spacing classes
- [ ] Add tracking classes to all headings
- [ ] Inject Stripe.js site-wide
- [ ] Add alt text to all images
- [ ] Create loading.tsx for all pages
- [ ] Remove conflicting Tailwind classes
- [ ] Configure GitHub Actions workflow
- [ ] Add environment variables with fallbacks
- [ ] Test audit locally with Node.js 22
- [ ] Test build locally
