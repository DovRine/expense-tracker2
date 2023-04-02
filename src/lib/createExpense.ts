import type { Expense } from '@/models'
import { conn as db } from '@/lib'
import { validateExpense } from './isValidExpense';

async function createExpense(
    expense: Expense
): Promise<number> {
    if (!db) {
        throw new Error('db is unavailable');
    }

    validateExpense(expense)

    console.log({ expense })
    const { year, month, amount, category_id } = expense

    // TODO: convert to parameterized query
    const query = /*sql*/`
    INSERT INTO expenses (year, month, amount, category_id)
    VALUES (${year}, ${month}, ${amount}, ${category_id})
    RETURNING id
    `;

    const { rows } = await db.query(query);
    const id = rows[0].id
    return id
}

export { createExpense }