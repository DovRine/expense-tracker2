'use client';
import {Category} from '@/models';
import {cache} from 'react';

type FetchCategories = (cacheBuster?: string | number) => Promise<Category[]>;

async function doFetch(cacheBuster?: string | number): Promise<Category[]> {
  const url = `http://localhost:5000/api/category?q=${cacheBuster ?? ''}`;
  return fetch(url).then(res => res.json());
}

const fetchCategories: FetchCategories = cache(
  (cacheBuster?: string | number) => doFetch(cacheBuster)
);

export {fetchCategories};
