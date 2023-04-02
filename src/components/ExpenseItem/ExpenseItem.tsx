"use client";
import "./ExpenseItem.scss";
import { BtnEdit } from "./BtnEdit";
import { BtnDelete } from "./BtnDelete";
import { Expense } from "@/models";
import { Dispatch, SetStateAction, useState } from "react";
import { ExpenseItemForm } from "./ExpenseItemForm";

function ExpenseItem({
  expense,
  setExpenses,
}: {
  expense: Expense;
  setExpenses: Dispatch<SetStateAction<Expense[]>>;
}) {
  const [showEditForm, setShowEditForm] = useState(false);

  if (!expense) return null;
  const { year, month, amount, category } = expense;

  return (
    <div className="ExpenseItem">
      {showEditForm ? (
        <ExpenseItemForm
          expense={expense}
          setShowEditForm={setShowEditForm}
          setExpenses={setExpenses}
        />
      ) : (
        <>
          <div className="date">
            {month}/{year}
          </div>
          <div className="category">{category}</div>
          <div className="amount">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(amount)}
          </div>
          <div className="toolbar">
            <BtnEdit id={expense.id!} setShowEditForm={setShowEditForm} />
            <BtnDelete id={expense.id!} setExpenses={setExpenses} />
          </div>
        </>
      )}
    </div>
  );
}
export { ExpenseItem };
