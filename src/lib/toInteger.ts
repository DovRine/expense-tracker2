/**
 *
 * @param amount dollars and cents
 *
 * returns an integer in pennies
 */
// BUG: trailing zeroes are truncated causing invalid values. This affects the entire design of handling cents as I am.
function toInteger(amount: number): number {
  if (typeof amount !== 'number') {
    throw new Error('amount must be a number');
  }

  return Number(
    String(amount)
      .split('')
      .filter(n => n !== '.')
      .join('')
  );
}

export {toInteger};
