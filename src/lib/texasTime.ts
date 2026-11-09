/**
 * Texas Fiduciary Time & Greeting Utility
 * 
 * Configures the platform's official temporal zone to Texas (Central Time, America/Chicago).
 * Guarantees that client greetings and timestamps always reflect Texas local time
 * regardless of the user's physical device location (e.g. Nigeria, Europe, Asia, or California).
 */

export const TEXAS_TIMEZONE = 'America/Chicago';

/**
 * Returns current hour (0-23) in Texas (Central Time)
 */
export function getTexasHour(date: Date = new Date()): number {
  try {
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: TEXAS_TIMEZONE,
      hour: 'numeric',
      hour12: false
    });
    const hour = parseInt(formatter.format(date), 10);
    return isNaN(hour) ? (date.getUTCHours() - 6 + 24) % 24 : hour;
  } catch {
    // Fallback: Central Standard Time is UTC-6
    return (date.getUTCHours() - 6 + 24) % 24;
  }
}

/**
 * Returns contextually accurate Texas greeting:
 * - "Good morning" before 12:00 PM (00:00 - 11:59)
 * - "Good afternoon" from 12:00 PM to 4:59 PM (12:00 - 16:59)
 * - "Good evening" from 5:00 PM onwards (17:00 - 23:59)
 */
export function getTexasGreeting(date: Date = new Date()): string {
  const hour = getTexasHour(date);
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

/**
 * Formats a Date object in Texas local time
 */
export function formatTexasTime(
  date: Date = new Date(), 
  options?: Intl.DateTimeFormatOptions
): string {
  try {
    return new Intl.DateTimeFormat('en-US', {
      timeZone: TEXAS_TIMEZONE,
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
      ...options
    }).format(date);
  } catch {
    return date.toLocaleTimeString('en-US');
  }
}
