import './CategoryItemForm.scss';
import {fetchCategories} from '@/lib/fetchCategories';
import {Category} from '@/models';
import {Dispatch, SetStateAction, useState} from 'react';
import {Button} from '../Button';

async function createCategory(category: Category) {
  const url = '/api/category';
  await fetch(url, {
    method: 'POST',
    body: JSON.stringify(category),
  });
}

async function updateCategory(category: Category) {
  const url = `/api/category/${category.id}`;
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
          placeholder="Category..."
          onChange={e => setName(e.currentTarget.value)}
          autoFocus={true}
        />
      </div>
      <div className="toolbar">
        <Button
          classes="BtnCancel"
          onClick={() => setShowEditForm(false)}
          label="Cancel"
        />
        <Button
          classes={category ? 'BtnEdit' : 'BtnAdd'}
          label={category ? 'Edit' : 'Add'}
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
        />
      </div>
    </div>
  );
}
export {CategoryItemForm};
