export interface WebVitalsMetric {
  id: string;
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  navigationType: string;
}

export interface EngagementMetric {
  sessionId: string;
  pagePath: string;
  referrer: string;
  timeOnPage: number;
  bounce: boolean;
  timestamp: number;
}

// Generate session ID for privacy-first tracking (no PII)
export function generateSessionId(): string {
  return crypto.randomUUID();
}

// Calculate time on page
export function calculateTimeOnPage(startTime: number): number {
  return Math.floor((Date.now() - startTime) / 1000);
}

// Determine bounce (single page view, < 10 seconds)
export function isBounce(timeOnPage: number, pageViews: number): boolean {
  return pageViews === 1 && timeOnPage < 10;
}
