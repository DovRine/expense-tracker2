import './ExpenseItemForm.scss';
import {toInteger} from '@/lib/toInteger';
import {fetchCategories} from '@/lib/fetchCategories';
import {fetchExpenses} from '@/lib/fetchExpenses';
import {Expense} from '@/models';
import {Dispatch, SetStateAction, useState, use} from 'react';

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

async function createExpense(expense: Expense) {
  const url = 'http://localhost:5000/api/expense';
  await fetch(url, {
    method: 'POST',
    body: JSON.stringify(expense),
  });
}

async function updateExpense(expense: Expense) {
  const url = `http://localhost:5000/api/expense/${expense.id}`;
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
  const now = new Date();
  const [month, setMonth] = useState(
    expense ? expense.month : now.getMonth() + 1
  );
  const [year, setYear] = useState(expense ? expense.year : now.getFullYear());
  const [category_id, setCategory_id] = useState(
    expense ? expense.category_id : 1
  );
  const [amount, setAmount] = useState(expense ? expense.amount : 0);
  const categories = use(fetchCategories());
  const currentYear = new Date().getFullYear();
  const yearOptions = [];
  for (let i = year - 7; i <= currentYear; i++) {
    yearOptions.push({value: i, label: i});
  }
  const monthOptions = [];
  for (let i = 1; i <= 12; i++) {
    monthOptions.push({value: i, label: `${i} ${months[i]}`});
  }

  return (
    <div className="ExpenseItemForm">
      <div>
        <select
          name="month"
          value={month}
          onChange={e => setMonth(Number(e.currentTarget.value))}
        >
          {monthOptions.map(({label, value}) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        <select
          name="year"
          value={year}
          onChange={e => setYear(Number(e.currentTarget.value))}
        >
          {yearOptions.map(({label, value}) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <select
          name="category_id"
          value={category_id}
          onChange={e => setCategory_id(Number(e.currentTarget.value))}
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
          type="number"
          step="0.01"
          value={amount}
          onChange={e => setAmount(Number(e.currentTarget.value))}
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
              const expenseData: Expense = {
                year,
                month,
                amount: toInteger(amount),
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
        >
          {expense ? 'Edit' : 'Add'}
        </button>
      </div>
    </div>
  );
}
export {ExpenseItemForm};
