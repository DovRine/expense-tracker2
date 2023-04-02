import './CategoryItemForm.scss';
import {fetchCategories} from '@/lib/fetchCategories';
import {Category} from '@/models';
import {Dispatch, SetStateAction, useState} from 'react';

async function createCategory(category: Category) {
  const url = 'http://localhost:5000/api/category';
  await fetch(url, {
    method: 'POST',
    body: JSON.stringify(category),
  });
}

async function updateCategory(category: Category) {
  const url = `http://localhost:5000/api/category/${category.id}`;
  await fetch(url, {
    method: 'PUT',
    body: JSON.stringify(category),
  });
}

function CategoryItemForm({
  category,
  setShowEditForm,
  setCategories,
}: {
  category?: Category;
  setShowEditForm: Dispatch<SetStateAction<boolean>>;
  setCategories: Dispatch<SetStateAction<Category[]>>;
}) {
  const [name, setName] = useState(category ? category.name : '');

  return (
    <div className="CategoryItemForm">
      <div>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.currentTarget.value)}
        />
      </div>
      <div>
        <button type="button" onClick={() => setShowEditForm(false)}>
          Cancel
        </button>
        <button
          type="button"
          onClick={async () => {
            try {
              const categoryData: Category = {name};
              if (category) {
                categoryData.id = category.id!;
                await updateCategory(categoryData);
              } else {
                await createCategory(categoryData);
              }
              const categories = await fetchCategories(new Date().getTime());
              setCategories(categories);
            } catch (e) {
              // TODO: user feedback
              console.error(e);
            } finally {
              setShowEditForm(false);
            }
          }}
        >
          {category ? 'Edit' : 'Add'}
        </button>
      </div>
    </div>
  );
}
export {CategoryItemForm};
