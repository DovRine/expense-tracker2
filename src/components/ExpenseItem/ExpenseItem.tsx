'use client';
import './ExpenseItem.scss';
import {Expense} from '@/models';
import {Dispatch, SetStateAction, useState} from 'react';
import {ExpenseItemForm} from '../ExpenseItemForm';
import {Button} from '../Button';
import {fetchExpenses} from '@/lib/fetchExpenses';
import {deleteExpense} from './deleteExpense';

function ExpenseItem({
  expense,
  setExpenses,
}: {
  expense: Expense;
  setExpenses: Dispatch<SetStateAction<Expense[]>>;
}) {
  const [showEditForm, setShowEditForm] = useState(false);

  if (!expense) return null;
  const {year, month, amount, category} = expense;

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
            {new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
            }).format(amount)}
          </div>
          <div className="toolbar">
            <Button
              classes="BtnEdit"
              onClick={() => setShowEditForm(true)}
              label="Edit"
            />
            <Button
              classes="BtnDelete"
              onClick={async () => {
                await deleteExpense(expense.id!);
                const expenses = await fetchExpenses(new Date().getTime());
                setExpenses(expenses);
              }}
              label="Delete"
            />
          </div>
        </>
      )}
    </div>
  );
}
export {ExpenseItem};
