"use client";
import "./CategoriesList.scss";
import { CategoryItem } from "@/components/CategoryItem";
import { fetchCategories } from "@/lib/fetchCategories";
import { Category } from "@/models";
import { use, useState } from "react";
import { CategoryItemForm } from "../CategoryItemForm";
import { Button } from "../Button";

function CategoriesList() {
  use<Category[]>(fetchCategories());
  const cachedCategories = use<Category[]>(fetchCategories());
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [expenses, setCategories] = useState(cachedCategories);

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
      <div>
        {expenses.map((category) => (
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

export { CategoriesList };
