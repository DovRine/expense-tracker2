"use client";
import "./ExpensesList.scss";
import { ExpenseItem } from "@/components/ExpenseItem";
import { fetchCategories } from "@/lib/fetchCategories";
import { fetchExpenses } from "@/lib/fetchExpenses";
import { Category, Expense } from "@/models";
import { use, useState } from "react";
import { BtnNew } from "./BtnNew";
import { ExpenseItemForm } from "../ExpenseItemForm";

function ExpensesList() {
  // NOTE: this is preloading the categories even though they're not used here
  use<Category[]>(fetchCategories());
  const cachedExpenses = use<Expense[]>(fetchExpenses());
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [expenses, setExpenses] = useState(cachedExpenses);

  return (
    <div className="ExpensesList">
      {showExpenseForm ? (
        <ExpenseItemForm
          setShowEditForm={setShowExpenseForm}
          setExpenses={setExpenses}
        />
      ) : (
        <BtnNew setShowExpenseForm={setShowExpenseForm} />
      )}
      <div>
        {expenses.map((expense) => (
          <ExpenseItem
            key={expense.id}
            expense={expense}
            setExpenses={setExpenses}
          />
        ))}
      </div>
    </div>
  );
}

export { ExpensesList };
