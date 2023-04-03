'use client';
import './ExpensesList.scss';
import {ExpenseItem} from '@/components/ExpenseItem';
import {fetchExpenses} from '@/lib/fetchExpenses';
import {Expense} from '@/models';
import {useEffect, useState} from 'react';
import {ExpenseItemForm} from '../ExpenseItemForm';
import {Button} from '../Button';

function ExpensesList() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  useEffect(() => {
    fetchExpenses().then(res => setExpenses(res));
  }, []);
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  return (
    <div className="ExpensesList">
      {showExpenseForm ? (
        <ExpenseItemForm
          setShowEditForm={setShowExpenseForm}
          setExpenses={setExpenses}
        />
      ) : (
        <Button
          classes="BtnNew"
          onClick={() => setShowExpenseForm(true)}
          label="New"
        />
      )}
      <div className="ExpenseItemsWrapper">
        {expenses.map(expense => (
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

export {ExpensesList};
