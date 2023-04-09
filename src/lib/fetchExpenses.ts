'use client';
import {Expense} from '@/models';
import {cache} from 'react';

type FetchExpenses = (cacheBuster?: string | number) => Promise<Expense[]>;

async function doFetch(cacheBuster?: string | number): Promise<Expense[]> {
  const url = `/api/expense?q=${cacheBuster ?? ''}`;
  return fetch(url)
    .then(res => {
      return res.json();
    })
    .catch(e => {
      console.log(e);
      return [];
    });
}

const fetchExpenses: FetchExpenses = cache((cacheBuster?: string | number) =>
  doFetch(cacheBuster)
);

export {fetchExpenses};
