import { conn as db } from '@/lib'
import { Expense } from '@/models'

async function getOneExpense(id: number | string): Promise<Expense> {
    if (!db) {
        throw new Error('db is unavailable');
    }
    id = typeof id === 'string' ? Number(id) : id
    if (!Number.isInteger(id) || id < 1) {
        throw new Error(`invalid id: ${id}`)
    }
    const query = /*sql*/`
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
    WHERE e.id = ${id}
    `

    const { rows } = await db.query(query)
    if (rows.length === 0) {
        throw new Error('missing expense')
    }
    return rows[0] as Expense
}
export { getOneExpense }