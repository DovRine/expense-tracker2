import {conn as db} from '@/lib';

async function deleteCategory(id: number | string): Promise<void> {
  if (!db) {
    throw new Error('db is unavailable');
  }
  id = typeof id === 'string' ? Number(id) : id;
  if (!Number.isInteger(id) || id < 1) {
    throw new Error(`invalid id: ${id}`);
  }

  const query = /*sql*/ `
    DELETE FROM categories
    WHERE id=${id}
    `;

  await db.query(query);
}

export {deleteCategory};
