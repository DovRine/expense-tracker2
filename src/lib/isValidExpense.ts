import {Expense} from '@/models';

function validateExpense(expense: Expense) {
  const {year, month, category_id} = expense;

  Object.entries(expense).forEach(([field, value]) => {
    if (typeof value === 'undefined' || !Number.isInteger(value)) {
      throw new Error(`${field} must be integer. got ${value}`);
    }
  });

  const now = new Date();
  if (year > now.getFullYear()) {
    throw new Error(`Year cannot be in the future. got ${year}`);
  }
  if (month < 1 || month > 12) {
    throw new Error(`Invalid month. got ${month}`);
  }
  if (category_id < 1) {
    throw new Error('invalid category');
  }
}

export {validateExpense};
