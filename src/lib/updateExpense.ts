import { Expense } from "@/models";
import { conn as db } from '@/lib'
import { validateExpense } from "./isValidExpense";

async function updateExpense(id: number | string, newExpense: Expense): Promise<void> {
    if (!db) {
        throw new Error('db is unavailable');
    }
    id = typeof id === 'string' ? Number(id) : id
    if (!Number.isInteger(id) || id < 1) {
        throw new Error(`invalid id: ${id}`)
    }
    validateExpense(newExpense)

    const { year, month, amount, category_id } = newExpense

    const query = /*sql*/`
    UPDATE expenses
    SET year=${year},
        month=${month},
        amount=${amount},
        category_id=${category_id}
    WHERE id=${id}
    `
    const { rowCount } = await db.query(query);
    if (rowCount === 0) {
        throw new Error(`missing expense id: ${id}`)
    }
}
export { updateExpense }