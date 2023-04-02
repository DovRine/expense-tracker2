/**
 * @amount: integer
 * 
 * returns float
 * 
 * NOTE: amounts are in pennies. this converts to dollars and cents
 */
function toDecimal(amount: Expense['amount']): number {

    if (!amount) {
        throw new Error('amount is required')
    }
    if (typeof amount !== 'number') {
        throw new Error('amount must be a number')
    }

    const s = String(amount).padStart(2, '0');

    const cents = s.slice(-2);
    const dollars = s.slice(0, s.length - 2)
    const dollarsAndCents = +`${dollars}.${cents}`
    return dollarsAndCents
}

export { toDecimal }