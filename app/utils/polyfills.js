import '@formatjs/intl-displaynames/polyfill';
import '@formatjs/intl-displaynames/locale-data/en'; // Import locale data for 'en'

export async function polyfill() {
  if (!Intl.DisplayNames) {
    await import('@formatjs/intl-displaynames/polyfill');
    await import('@formatjs/intl-displaynames/locale-data/en'); // Ensure locale data is loaded
  }
}