import {getOneExpense, deleteExpense, updateExpense} from '@/lib';
import {Expense} from '@/models';
import {NextResponse} from 'next/server';

export async function GET(request: Request, context: {params: {id: number}}) {
  const id = context.params.id;
  const expense = await getOneExpense(id);
  return NextResponse.json(expense);
}

export async function PUT(request: Request, context: {params: {id: number}}) {
  const id = context.params.id;
  const newExpense = (await request.json()) as Expense;
  try {
    await updateExpense(id, newExpense);
    return NextResponse.json({status: 'ok'});
  } catch (e) {
    return NextResponse.json({status: 'error', error: String(e)});
  }
}

export async function DELETE(
  request: Request,
  context: {params: {id: number}}
) {
  const id = context.params.id;
  try {
    await deleteExpense(id);
    return NextResponse.json({status: 'ok'});
  } catch (e) {
    return NextResponse.json({status: 'error', error: String(e)});
  }
}
