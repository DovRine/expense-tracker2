import type { Category } from '@/models'
import { conn as db } from '@/lib'

async function createCategory(
    category: Category
): Promise<number> {
    if (!db) {
        throw new Error('db is unavailable');
    }

    const { name } = category

    // TODO: convert to parameterized query
    const query = /*sql*/`
    INSERT INTO categories(name)
    VALUES ('${name}')
    RETURNING id
    `;
    const { rows } = await db.query(query);
    const id = rows[0].id
    return id
}

export { createCategory }