import { getOneCategory, deleteCategory, updateCategory } from "@/lib"
import { Category } from "@/models"
import { NextResponse } from "next/server"


export async function GET(request: Request, context: { params: any }) {
    const id = context.params.id
    const category = await getOneCategory(id)
    return NextResponse.json(category)
}

export async function PUT(request: Request, context: { params: any }) {
    const id = context.params.id
    const newCategory = await request.json() as Category
    await updateCategory(id, newCategory)
    return NextResponse.json({ status: 'ok' })
}

export async function DELETE(request: Request, context: { params: any }) {
    const id = context.params.id
    await deleteCategory(id)
    return NextResponse.json({ status: 'ok' })
}