import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

/**
 * Skillio Site Production Audit [Next.js 16 LTS Native]
 * This script uses a declarative rule registry to audit the codebase for 
 * production readiness, accessibility, and architectural compliance.
 */

const GREEN = '\x1b[32m';
const RED = '\x1b[31m';
const YELLOW = '\x1b[33m';
const BOLD = '\x1b[1m';
const NC = '\x1b[0m';

console.log(`${BOLD}${YELLOW}🚀 Skillio 10x Declarative Audit${NC}\n`);

const srcDir = path.join(process.cwd(), 'src');
const rootDir = process.cwd();

// Load en.json for Localization Integrity check
const enJsonPath = path.join(rootDir, 'messages', 'en.json');
const enJson = fs.existsSync(enJsonPath) ? JSON.parse(fs.readFileSync(enJsonPath, 'utf8')) : {};

const getNestedValue = (obj, path) => {
  return path.split('.').reduce((acc, part) => acc && acc[part], obj);
};


/** 
 * Rule Registry: Declarative definitions of production best practices
 */
const rules = [
  {
    id: 'LTS_PROXY',
    name: 'Edge Architecture (Proxy)',
    check: () => fs.existsSync(path.join(rootDir, 'src/proxy.ts')) && !fs.existsSync(path.join(rootDir, 'src/middleware.ts')),
    tip: 'Next.js 16 favors proxy.ts for edge logic. Remove legacy middleware.ts.'
  },
  {
    id: 'LTS_METADATA',
    name: 'SEO: metadataBase',
    check: () => {
      const layoutPath = fs.existsSync(path.join(srcDir, 'app/[locale]/layout.tsx')) 
        ? path.join(srcDir, 'app/[locale]/layout.tsx')
        : path.join(srcDir, 'app/layout.tsx');
      const layout = fs.readFileSync(layoutPath, 'utf8');
      return layout.includes('metadataBase: new URL');
    },
    tip: 'metadataBase is required for resolving relative OG image and canonical URLs.'
  },
  {
     id: 'A11y_ALT',
     name: 'Accessibility: Alt Text',
     checkFile: (path, content) => {
        if (content.includes('<Image') && (!content.includes('alt=') || content.includes('alt=""'))) {
           return false;
        }
        return true;
     },
     tip: 'Every <Image> must have descriptive alt text for neurodivergent accessibility.'
  },
  {
     id: 'LTS_IMAGE_OPT',
     name: 'Performance: next/image',
     checkFile: (path, content) => !content.includes('<img'),
     tip: 'Direct <img> tags bypass optimization. Always use the next/image component.'
  },
  {
     id: 'LTS_LOADING',
     name: 'Declarative State: loading.tsx',
     checkFile: (filePath) => {
        if (filePath.endsWith('page.tsx')) {
           return fs.existsSync(path.join(path.dirname(filePath), 'loading.tsx'));
        }
        return true;
     },
     tip: 'Every page.tsx must have a sibling loading.tsx for immediate user feedback.'
  },
  {
     id: 'PUBLIC_SAFETY',
     name: 'Public Repo: No Local Secrets',
     check: () => !fs.existsSync(path.join(rootDir, '.env.local')) || fs.readFileSync(path.join(rootDir, '.gitignore'), 'utf8').includes('.env'),
     tip: 'Ensure all secret files are explicitly ignored in .gitignore.'
  },
  {
    id: 'LTS_DARK_MODE',
    name: 'Theme: Dark Mode Alignment',
    check: () => {
      const globals = fs.readFileSync(path.join(srcDir, 'app/globals.css'), 'utf8');
      return globals.includes('@variant dark (&:where(.dark, .dark *))');
    },
    tip: 'Tailwind 4 requires a standard @variant dark selector for class-based toggles.'
  },
  {
    id: 'TOUCH_SAFETY',
    name: 'UX: Touch Interaction Safety',
    checkFile: (path, content) => {
      if (content.includes('onClick=') && !content.includes('e.preventDefault()') && path.includes('Toggle')) {
        return false;
      }
      return true;
    },
    tip: 'Interactive toggles must use e.preventDefault() to avoid double-firing on touch devices.'
  },
  {
    id: 'LOCALISATION_INTEGRITY',
    name: 'Logic: Localization Integrity',
    checkFile: (filePath, content) => {
      if (!filePath.endsWith('.tsx')) return true;
      
      // Find useTranslations namespace
      const namespaceMatch = content.match(/useTranslations\((["'])([^"']+)\1\)/);
      const namespace = namespaceMatch ? namespaceMatch[2] : null;
      
      // Find all t("key") calls with word boundaries to avoid false positives
      const tCalls = content.match(/\bt\((["'])([^"']+)\1\)/g) || [];
      
      for (const call of tCalls) {
        const keyMatch = call.match(/\bt\((["'])([^"']+)\1\)/);
        if (!keyMatch) continue;
        const key = keyMatch[2];
        
        // Full key construction
        const fullKey = namespace ? `${namespace}.${key}` : key;
        const value = getNestedValue(enJson, fullKey);
        
        if (value === undefined) {
          console.error(`${RED}  - Missing key: ${NC}${fullKey} in ${filePath}`);
          return false;
        }
      }
      return true;
    },
    tip: 'Ensure all t("key") calls have entries in en.json.'
  },
  {
    id: 'HARDCODED_TEXT',
    name: 'Logic: No Hardcoded Text',
    checkFile: (path, content) => {
      if (!path.endsWith('.tsx') || path.includes('node_modules') || path.includes('Icons.tsx')) return true;
      
      // Remove common code blocks to reduce false positives
      const cleanContent = content
        .replace(/\{\/\*[\s\S]*?\*\/\}/g, '')
        .replace(/\/\/.*/g, '')
        .replace(/\/\*[\s\S]*?\*\//g, '')
        .replace(/className="[^"]*"/g, '')
        .replace(/style=\{\{[^}]*\}\}/g, '');

      // Specifically target text between tags that starts with a capital letter (likely English text)
      // and isn't just a single word like 'Sicamon' or 'Atelier'
      // We exclude characters commonly found in code but not in display text (like ; and =)
      const hardcodedMatches = cleanContent.match(/>\s*([A-Z][^<{;=]{2,})\s*</g) || [];
      
      const ignored = ['Sicamon', 'Atelier', 'Studio', 'Dahlia', 'Home', 'Contact', 'Gallery', 'Authenticity', 'Skillio', 'App', 'Terms', 'Privacy', 'Services', 'About', 'Dashboard', 'Sign In', 'Sign Out'];

      for (const match of hardcodedMatches) {
        const text = match.slice(1, -1).trim();
        if (text.startsWith('{') || ignored.includes(text)) continue;
        if (/^[A-Z0-9_\s]+$/.test(text)) continue; // Ignore all-caps constants/IDs
        
        console.error(`${RED}  - Hardcoded text found: ${NC}"${text}" in ${path}`);
        return false;
      }
      return true;
    },
    tip: 'Use t("key") for all user-facing text in components.'
  },
  {
    id: 'UI_ADAPTIVE_HELPERS',
    name: 'UX: Adaptive Gallery Spacing',
    checkFile: (path, content) => {
      if (path.endsWith('.tsx') && (path.includes('src/components') || path.includes('src/app'))) {
        const matches = content.match(/(?<!(sm|md|lg|xl|2xl):)\b(p[xy]?|m[xy]?|gap)-[0-9.]+\b/g) || [];
        for (const m of matches) {
           const baseProp = m.split('-')[0];
           if (!new RegExp(`(sm|md|lg|xl|2xl):${baseProp}-[0-9.]+`).test(content)) return false;
        }
      }
      return true;
    },
    tip: 'Use responsive spacing scales (e.g. mb-3 md:mb-4) instead of rigid static values.'
  },
  {
    id: 'UI_BOUTIQUE_AESTHETICS',
    name: 'Aesthetics: Museum Gallery Finish',
    checkFile: (path, content) => {
      if (path.endsWith('.tsx') && (content.includes('<h1') || content.includes('<h2') || content.includes('<h3'))) {
        return content.includes('tracking-tight') || content.includes('tracking-tighter') || /tracking-\[0\.[23]em\]/.test(content);
      }
      return true;
    },
    tip: 'Apply museum-grade letter spacing (tracking-tight or tracking-tighter) to all headings.'
  },
  {
    id: 'UI_CSS_CONFLICT',
    name: 'Aesthetics: Clean Prop Mapping',
    checkFile: (path, content) => {
      if (!path.endsWith('.tsx')) return true;
      const classPatterns = /className=["'`]([^"'`]+)["' `]/g;
      let match;
      while ((match = classPatterns.exec(content)) !== null) {
        const classes = match[1].split(/\s+/);
        const bps = { base: [], sm: [], md: [], lg: [], xl: [], '2xl': [] };
        classes.forEach(c => {
          const parts = c.split(':');
          const prop = parts.length > 1 ? parts[parts.length - 1] : parts[0];
          const bp = parts.length > 1 ? parts[0] : 'base';
          if (bps[bp]) bps[bp].push(prop);
        });
        for (const b in bps) {
          const p = bps[b];
          if (p.filter(x => x.startsWith('tracking-')).length > 1) return false;
          if (p.filter(x => x.startsWith('text-') && !/-zinc|-white|-black|-teal|-center|-left|-right|-justify|-xs|-sm|-base|-lg|-xl|-2xl|-3xl|-4xl|-5xl|-6xl|-7xl|-8xl|-9xl|-\[\d/.test(x)).length > 1) return false;
        }
      }
      return true;
    },
    tip: 'Avoid conflicting Tailwind classes on the same breakpoint.'
  }
];

const results = { passed: [], failed: [] };

function audit() {
  const allFiles = [];
  const walk = (dir) => {
    fs.readdirSync(dir).forEach(f => {
      const p = path.join(dir, f);
      fs.statSync(p).isDirectory() ? walk(p) : allFiles.push(p);
    });
  };
  walk(srcDir);

  rules.forEach(rule => {
    let ok = true;
    if (rule.check) {
       ok = rule.check();
    } else if (rule.checkFile) {
       for (const f of allFiles) {
          const content = fs.readFileSync(f, 'utf8');
          if (!rule.checkFile(f, content)) {
             ok = false;
             results.failed.push({ rule, file: path.relative(rootDir, f) });
          }
       }
    }
    
    if (ok && !results.failed.some(f => f.rule.id === rule.id)) {
       results.passed.push(rule);
    }
  });
}

// 1. Run Standard Tools
const runStep = (name, cmd) => {
  try {
    console.log(`${BOLD}[STEP] ${name}...${NC}`);
    execSync(cmd, { stdio: 'inherit' });
    return true;
  } catch {
    return false;
  }
};

const lintOk = runStep('Linting', 'npm run lint -- --fix');
const typeOk = runStep('Type Safety', 'npx tsc --noEmit');

// 2. Run Declarative Audit
console.log(`${BOLD}[STEP] Declarative Best Practices...${NC}`);
audit();

rules.forEach(rule => {
  const failures = results.failed.filter(f => f.rule.id === rule.id);
  if (failures.length > 0) {
    console.log(`${RED}✗ ${rule.name}${NC}`);
    failures.forEach(f => console.log(`  - ${f.file}`));
    console.log(`  ${YELLOW}💡 Tip: ${rule.tip}${NC}\n`);
  } else if (results.passed.includes(rule)) {
    console.log(`${GREEN}✓ ${rule.name}${NC}`);
  }
});

// 3. Verdict
if (lintOk && typeOk && results.failed.length === 0) {
  console.log(`\n${GREEN}${BOLD}✅ 10x AUDIT PASSED. Site is hardened for public production.${NC}`);
  process.exit(0);
} else {
  console.log(`\n${RED}${BOLD}❌ AUDIT FAILED. Resolve the declarative issues above.${NC}`);
  process.exit(1);
}
