import {conn as db} from '@/lib';
import {Category} from '@/models';

async function getOneCategory(id: number | string): Promise<Category> {
  if (!db) {
    throw new Error('db is unavailable');
  }

  id = typeof id === 'string' ? Number(id) : id;

  if (!Number.isInteger(id) || id < 1) {
    throw new Error(`invalid id: ${id}`);
  }
  const query = /*sql*/ `
    SELECT id, name
    FROM categories
    WHERE id = ${id}
    `;

  const {rows} = await db.query(query);
  if (rows.length === 0) {
    throw new Error('missing category');
  }
  return rows[0] as Category;
}
export {getOneCategory};
