import { getOneExpense, deleteExpense, updateExpense } from '@/lib';
import { Expense } from '@/models';
import { NextResponse, NextRequest } from 'next/server';

export async function GET(
  context: { params: { id: number } }
) {

  const id = context.params.id;
  const expense = await getOneExpense(id);
  return NextResponse.json(expense);
}

export async function PUT(
  request: NextRequest,
  context: { params: { id: number } }
) {

  const id = context.params.id;
  const newExpense = await request.json() as Expense;
  try {
    await updateExpense(id, newExpense);
    return NextResponse.json({ status: 'ok' });
  } catch (e) {
    return NextResponse.json({ status: 'error', error: String(e) });
  }
}

export async function DELETE(
  _: NextRequest,
  context: { params: { id: number } }
) {
  const id = context.params.id;
  try {
    await deleteExpense(id);
    return NextResponse.json({ status: 'ok' });
  } catch (e) {
    return NextResponse.json({ status: 'error', error: String(e) });
  }
}
