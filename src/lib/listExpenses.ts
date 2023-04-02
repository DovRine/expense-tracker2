import { Expense } from "@/models"
import { conn as db, toDecimal } from '@/lib'

async function listExpenses(): Promise<Expense[]> {
    if (!db) {
        throw new Error('db is unavailable');
    }

    const query = /*sql*/ `
    SELECT
        e.id,
        e.year,
        e.month,
        e.amount,
        e.category_id,
        c.name as category
    FROM expenses as e
    JOIN categories as c
        ON e.category_id = c.id
    ORDER by e.id DESC
    `;
    const { rows } = await db.query(query);
    return rows.map(expense => ({
        ...expense,
        amount: toDecimal(expense.amount)
    }))
}

export { listExpenses }