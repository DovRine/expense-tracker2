/**
 *
 * @param amount dollars and cents
 *
 * returns an integer in pennies
 */
// BUG: trailing zeroes are truncated causing invalid values. This affects the entire design of handling cents as I am.
function toInteger(amount: number | string): number | string {
  if (typeof amount !== 'number' && typeof amount !== 'string') {
    throw new Error('amount must be a number or a string');
  }

  if (isNaN(Number(amount))) {
    throw new Error(`amount ${amount} is not a valid number`);
  }
  if (amount === 0 || amount === '') return '';

  return Number(
    String(amount)
      .split('')
      .filter(n => n !== '.')
      .join('')
  );
}

export {toInteger};
