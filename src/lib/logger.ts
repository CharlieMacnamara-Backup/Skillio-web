/**
 * Declarative Logger for Skillio Lifecycle Events
 */
export const logger = {
  logEvent: (component: string, event: string, metadata?: any) => {
    console.log(`[EVENT] [${component}] ${event}`, metadata || "");
  },
  
  logError: (component: string, error: string, metadata?: any) => {
    console.error(`[ERROR] [${component}] ${error}`, metadata || "");
  },
  
  logStateChange: (component: string, from: any, to: any) => {
    console.log(`[STATE] [${component}] Changed from:`, from, "to:", to);
  },
  
  logResource: (resource: string, status: 'mounted' | 'disposed') => {
    console.log(`[RESOURCE] [${resource}] ${status.toUpperCase()}`);
  }
};
