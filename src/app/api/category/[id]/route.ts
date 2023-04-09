import { getOneCategory, deleteCategory, updateCategory } from '@/lib';
import { Category } from '@/models';
import { NextResponse, NextRequest } from 'next/server';

export async function GET(
  context: { params: { id: number } }
) {
  const id = context.params.id;
  const category = await getOneCategory(id);
  return NextResponse.json(category);
}

export async function PUT(
  request: NextRequest,
  context: { params: { id: number } }
) {
  const id = context.params.id;
  const newCategory = await request.json() as Category;
  await updateCategory(id, newCategory);
  return NextResponse.json({ status: 'ok' });
}

export async function DELETE(
  _: NextRequest,
  context: { params: { id: number } }
) {
  const id = context.params.id;
  await deleteCategory(id);
  return NextResponse.json({ status: 'ok' });
}
