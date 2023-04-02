"use client";
import { Expense } from '@/models';
import { cache } from 'react'

type FetchExpenses = (cacheBuster?: string | number) => Promise<Expense[]>;

async function doFetch(cacheBuster?: string | number): Promise<any> {
    const url = `http://localhost:5000/api/expense?q=${cacheBuster ?? ''}`
    return fetch(url).then((res) => res.json())
}

const fetchExpenses: FetchExpenses = cache((cacheBuster?: string | number) => doFetch(cacheBuster));

export { fetchExpenses }