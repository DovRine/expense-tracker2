'use client';
import './CategoryItem.scss';
import {Category} from '@/models';
import {Dispatch, SetStateAction, useState} from 'react';
import {CategoryItemForm} from '../CategoryItemForm';
import {Button} from '../Button';
import {fetchCategories} from '@/lib/fetchCategories';
import {deleteCategory} from './deleteCategory';

function CategoryItem({
  category,
  setCategories,
}: {
  category: Category;
  setCategories: Dispatch<SetStateAction<Category[]>>;
}) {
  const [showEditForm, setShowEditForm] = useState(false);

  if (!category) return null;
  const {name} = category;

  return (
    <>
      {showEditForm ? (
        <CategoryItemForm
          category={category}
          setShowEditForm={setShowEditForm}
          setCategories={setCategories}
        />
      ) : (
        <div className="CategoryItem">
          <div className="name">{name}</div>
          <div className="toolbar">
            <Button
              classes="BtnEdit"
              onClick={() => setShowEditForm(true)}
              label="Edit"
            />
            <Button
              classes="BtnDelete"
              onClick={async () => {
                await deleteCategory(category.id!);
                const categories = await fetchCategories(new Date().getTime());
                setCategories(categories);
              }}
              label="Delete"
            />
          </div>
        </div>
      )}
    </>
  );
}
export {CategoryItem};
