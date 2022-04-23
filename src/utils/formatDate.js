import { LOCALE } from '@constant/index.js';

const options = { year: 'numeric', month: 'numeric', day: 'numeric' };

export function formatDate(date) {
  return Intl.DateTimeFormat(LOCALE, options).format(date);
}
