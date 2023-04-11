'use client';
import './CategoriesList.scss';
import {CategoryItem} from '@/components/CategoryItem';
import {fetchCategories} from '@/lib/fetchCategories';
import {Category} from '@/models';
import {useEffect, useState} from 'react';
import {CategoryItemForm} from '../CategoryItemForm';
import {Button} from '../Button';

function CategoriesList() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  useEffect(() => {
    fetchCategories().then(res => setCategories(res));
  }, []);

  return (
    <div className="CategoriesList">
      {showCategoryForm ? (
        <CategoryItemForm
          setShowEditForm={setShowCategoryForm}
          setCategories={setCategories}
        />
      ) : (
        <Button
          classes="BtnNew"
          onClick={() => setShowCategoryForm(true)}
          label="New"
        />
      )}
      <div className="CategoryItemsWrapper">
        {categories.map(category => (
          <CategoryItem
            key={category.id}
            category={category}
            setCategories={setCategories}
          />
        ))}
      </div>
    </div>
  );
}

export {CategoriesList};
