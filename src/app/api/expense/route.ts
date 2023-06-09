import {createExpense, listExpenses} from '@/lib';
import {Expense} from '@/models';
import {NextRequest, NextResponse} from 'next/server';

export async function GET() {
  const expenses = await listExpenses();
  return NextResponse.json(expenses);
}

export async function POST(request: NextRequest) {
  const expense = (await request.json()) as Expense;
  const insertId = await createExpense(expense);
  return NextResponse.json({insertId});
}
