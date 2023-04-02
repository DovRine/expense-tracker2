import { conn as db } from '@/lib'

async function deleteExpense(id: number | string): Promise<void> {
    if (!db) {
        throw new Error('db is unavailable');
    }
    id = typeof id === 'string' ? Number(id) : id
    if (!Number.isInteger(id) || id < 1) {
        throw new Error(`invalid id: ${id}`)
    }

    const query = /*sql*/`
    DELETE FROM expenses
    WHERE id=${id}
    `;

    const { rowCount } = await db.query(query);
    if (rowCount === 0) {
        throw new Error(`missing expense id: ${id}`)
    }
}

export { deleteExpense }