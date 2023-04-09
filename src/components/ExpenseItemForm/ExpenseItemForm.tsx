'use client';
import './ExpenseItemForm.scss';
import {toInteger} from '@/lib/toInteger';
import {fetchExpenses} from '@/lib/fetchExpenses';
import {Category, Expense} from '@/models';
import {Dispatch, SetStateAction, useState, useEffect} from 'react';
import {NumberSelect} from '../NumberSelect/NumberSelect';
import {Button} from '../Button';

// NOTE: empty first element to account for months 1-12
const months = [
  '',
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

async function listCategories() {
  const url = '/api/category';
  const response = await fetch(url);
  return (await response.json()) as Category[];
}

async function createExpense(expense: Expense) {
  const url = '/api/expense';
  await fetch(url, {
    method: 'POST',
    body: JSON.stringify(expense),
  });
}

async function updateExpense(expense: Expense) {
  const url = `/api/expense/${expense.id}`;
  await fetch(url, {
    method: 'PUT',
    body: JSON.stringify(expense),
  });
}

function ExpenseItemForm({
  expense,
  setShowEditForm,
  setExpenses,
}: {
  expense?: Expense;
  setShowEditForm: Dispatch<SetStateAction<boolean>>;
  setExpenses: Dispatch<SetStateAction<Expense[]>>;
}) {
  const [categories, setCategories] = useState<Category[]>([]);
  useEffect(() => {
    listCategories().then(res => setCategories(res));
  }, []);
  const now = new Date();
  const [month, setMonth] = useState(
    expense ? expense.month : now.getMonth() + 1
  );
  const [year, setYear] = useState(expense ? expense.year : now.getFullYear());
  const [category_id, setCategory_id] = useState(
    expense ? expense.category_id : 1
  );
  const [amount, setAmount] = useState<number | string>(
    expense ? expense.amount : ''
  );
  const currentYear = new Date().getFullYear();
  const yearOptions = [];
  for (let i = year - 7; i <= currentYear; i++) {
    yearOptions.push({value: i, label: String(i)});
  }
  const monthOptions = [];
  for (let i = 1; i <= 12; i++) {
    monthOptions.push({value: i, label: `${i} ${months[i]}`});
  }

  console.log('amount', toInteger(amount));
  return (
    <div className="ExpenseItemForm">
      <div className="DateSelects">
        <NumberSelect
          classes="MonthSelect"
          setter={setMonth}
          value={month}
          name="month"
          options={monthOptions}
        />
        <NumberSelect
          classes="YearSelect"
          setter={setYear}
          value={year}
          name="year"
          options={yearOptions}
        />
      </div>
      <div>
        <select
          className="CategorySelect"
          name="category_id"
          value={category_id}
          onChange={e => setCategory_id(Number(e.currentTarget.value))}
          autoFocus={true}
        >
          {categories.map(category => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}{' '}
        </select>
      </div>
      <div>
        <input
          inputMode="numeric"
          value={toInteger(amount)}
          onChange={e => setAmount(toInteger(Number(e.currentTarget.value)))}
        />
      </div>
      <div className="toolbar">
        <Button
          classes="BtnCancel"
          onClick={() => setShowEditForm(false)}
          label="Cancel"
        />
        <Button
          classes={expense ? 'BtnEdit' : 'BtnAdd'}
          label={expense ? 'Edit' : 'Add'}
          onClick={async () => {
            try {
              const expenseData: Expense = {
                year,
                month,
                amount: Number(toInteger(amount)),
                category_id,
              };
              if (expense) {
                expenseData.id = expense.id!;
                await updateExpense(expenseData);
              } else {
                await createExpense(expenseData);
              }
              const expenses = await fetchExpenses(new Date().getTime());
              setExpenses(expenses);
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
export {ExpenseItemForm};
