/**
 * Format an amount to currency locale
 *
 * @param {number} amount - amount to be formatted
 * @param {string} currency - currency format
 */
function formatAsCurrency(amount, currency) {
  const formatter = new Intl.NumberFormat(window.navigator.language, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  });

  return formatter.format(amount);
}

export default formatAsCurrency;
