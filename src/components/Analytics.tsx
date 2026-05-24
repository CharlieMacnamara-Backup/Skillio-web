"use client";

import { useEffect, useRef, useCallback } from "react";
import type { WebVitalsMetric, EngagementMetric } from "@/lib/analytics";
import { generateSessionId, calculateTimeOnPage, isBounce } from "@/lib/analytics";

export function Analytics() {
  const sessionIdRef = useRef<string>("");
  const pageViewsRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);
  const hasSentBounceRef = useRef<boolean>(false);

  const sendToAnalyticsEndpoint = useCallback((type: string, data: any) => {
    // Placeholder: Configure your analytics endpoint here
    // Example: Send to Vercel Analytics, Google Analytics, or custom endpoint
    // This is a no-op by default to avoid sending data without configuration
    
    if (process.env.NODE_ENV === 'development') {
      console.warn(`[Analytics] ${type}:`, data);
    }

    // Example implementation for custom endpoint:
    // fetch('/api/analytics', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ type, data }),
    //   keepalive: true,
    // }).catch(console.error);
  }, []);

  const sendToAnalytics = useCallback((metric: any) => {
    const webVital: WebVitalsMetric = {
      id: metric.id,
      name: metric.name,
      value: metric.value,
      rating: metric.rating,
      delta: metric.delta,
      navigationType: metric.navigationType || 'navigate',
    };

    sendToAnalyticsEndpoint('webvital', webVital);
  }, [sendToAnalyticsEndpoint]);

  const trackPageView = useCallback(() => {
    const pageView: EngagementMetric = {
      sessionId: sessionIdRef.current,
      pagePath: window.location.pathname,
      referrer: document.referrer || 'direct',
      timeOnPage: 0,
      bounce: false,
      timestamp: Date.now(),
    };

    sendToAnalyticsEndpoint('pageview', pageView);
  }, [sendToAnalyticsEndpoint]);

  const trackEngagement = useCallback(() => {
    if (hasSentBounceRef.current) return;

    const timeOnPage = calculateTimeOnPage(startTimeRef.current);
    const bounce = isBounce(timeOnPage, pageViewsRef.current);

    const engagement: EngagementMetric = {
      sessionId: sessionIdRef.current,
      pagePath: window.location.pathname,
      referrer: document.referrer || 'direct',
      timeOnPage,
      bounce,
      timestamp: Date.now(),
    };

    sendToAnalyticsEndpoint('engagement', engagement);
    hasSentBounceRef.current = true;
  }, [sendToAnalyticsEndpoint]);

  useEffect(() => {
    // Initialize session
    sessionIdRef.current = generateSessionId();
    pageViewsRef.current = 1;
    startTimeRef.current = Date.now();

    // Track Core Web Vitals using native browser Performance API
    const trackWebVitals = () => {
      try {
        if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
          // Track TTFB (Time to First Byte)
          const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
          if (navigation) {
            const ttfb = navigation.responseStart - navigation.requestStart;
            sendToAnalytics({
              id: `ttfb-${Date.now()}`,
              name: 'TTFB',
              value: ttfb,
              rating: ttfb < 800 ? 'good' : ttfb < 1800 ? 'needs-improvement' : 'poor',
              delta: 0,
              navigationType: navigation.type,
            });
          }

          // Track LCP (Largest Contentful Paint)
          try {
            const lcpObserver = new PerformanceObserver((list) => {
              const entries = list.getEntries();
              const lastEntry = entries[entries.length - 1];
              sendToAnalytics({
                id: `lcp-${Date.now()}`,
                name: 'LCP',
                value: lastEntry.startTime,
                rating: lastEntry.startTime < 2500 ? 'good' : lastEntry.startTime < 4000 ? 'needs-improvement' : 'poor',
                delta: 0,
                navigationType: 'navigate',
              });
            });
            lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
          } catch {
            // LCP not supported in this browser
          }

          // Track CLS (Cumulative Layout Shift)
          try {
            let clsValue = 0;
            const clsObserver = new PerformanceObserver((list) => {
              for (const entry of list.getEntries()) {
                const layoutShift = entry as any;
                if (!layoutShift.hadRecentInput) {
                  clsValue += layoutShift.value || 0;
                }
              }
              sendToAnalytics({
                id: `cls-${Date.now()}`,
                name: 'CLS',
                value: clsValue,
                rating: clsValue < 0.1 ? 'good' : clsValue < 0.25 ? 'needs-improvement' : 'poor',
                delta: 0,
                navigationType: 'navigate',
              });
            });
            clsObserver.observe({ entryTypes: ['layout-shift'] });
          } catch {
            // CLS not supported in this browser
          }
        }
      } catch (error) {
        console.warn('Web Vitals tracking failed:', error);
      }
    };

    // Track page view
    trackPageView();

    // Track engagement on visibility change
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        trackEngagement();
      }
    };

    // Track engagement on page unload
    const handleBeforeUnload = () => {
      trackEngagement();
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('beforeunload', handleBeforeUnload);

    // Start Web Vitals tracking after a small delay to avoid blocking
    const timer = setTimeout(trackWebVitals, 1000);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      trackEngagement(); // Final engagement tracking on unmount
    };
  }, [trackPageView, trackEngagement, sendToAnalytics]);

  return null; // This component renders nothing
}
