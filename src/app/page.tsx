'use client';
import {Button} from '@/components/Button';
import {CategoryAdmin} from '@/components/CategoryAdmin';
import {ExpensesList} from '@/components/ExpensesList';
import {useState} from 'react';
import './page.scss';

export default function Home() {
  const [showCategoryAdmin, setShowCategoryAdmin] = useState(false);
  return (
    <div className="Home">
      {showCategoryAdmin ? (
        <CategoryAdmin setShowCategoryAdmin={setShowCategoryAdmin} />
      ) : (
        <>
          <Button
            classes="BtnShowCategoryAdmin"
            onClick={() => setShowCategoryAdmin(true)}
            label="Category Admin"
          />
          <ExpensesList />
        </>
      )}
    </div>
  );
}
