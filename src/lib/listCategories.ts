import {Category} from '@/models';
import {conn as db} from '@/lib';

async function listCategories(): Promise<Category[]> {
  if (!db) {
    throw new Error('db is unavailable');
  }

  const query = /*sql*/ `
    SELECT id, name
    FROM categories
    ORDER by name ASC
    `;

  const {rows} = await db.query(query);
  return rows;
}

export {listCategories};
