import {Category} from '@/models';
import {conn as db} from '@/lib';

async function updateCategory(
  id: number | string,
  newCategory: Category
): Promise<void> {
  if (!db) {
    throw new Error('db is unavailable');
  }
  id = typeof id === 'string' ? Number(id) : id;
  if (!Number.isInteger(id) || id < 1) {
    throw new Error(`invalid id: ${id}`);
  }

  const {name} = newCategory;

  const query = /*sql*/ `
    UPDATE categories
    SET name='${name}'
    WHERE id=${id}
    `;
  await db.query(query);
}
export {updateCategory};
