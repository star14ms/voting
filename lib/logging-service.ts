export const log = {
  error(code: string | Error, ...message: any[]) {
    if (code instanceof Error) {
      console.error('[Auth Error]', code.message, ...message);
    } else {
      console.error(`[Auth Error] ${code}:`, ...message);
    }
  },
  warn(code: string | Error, ...message: any[]) {
    if (code instanceof Error) {
      console.warn('[Auth Warning]', code.message, ...message);
    } else {
      console.warn(`[Auth Warning] ${code}:`, ...message);
    }
  },
  debug(code: string | Error, ...message: any[]) {
    if (code instanceof Error) {
      console.debug('[Auth Debug]', code.message, ...message);
    } else {
      console.debug(`[Auth Debug] ${code}:`, ...message);
    }
  }
}; 