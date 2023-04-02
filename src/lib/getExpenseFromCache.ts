"use client"
import { use } from 'react';
import { Expense } from '@/models';
import { fetchExpenses } from './fetchExpenses';

function getExpenseFromCache(id: number): Expense | undefined {
    const expenses = use<Expense[]>(fetchExpenses());
    return expenses.find((expense) => expense.id === id);
}
export { getExpenseFromCache }