import {NextRequest, NextResponse} from 'next/server';
import {createCategory, listCategories} from '@/lib';
import {Category} from '@/models';

export async function GET() {
  const categories = await listCategories();
  return NextResponse.json(categories);
}

export async function POST(request: NextRequest) {
  const category = (await request.json()) as Category;
  const insertId = await createCategory(category);
  return NextResponse.json({insertId});
}
