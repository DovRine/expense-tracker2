"use client";
import "./page.scss";
import { Button } from "@/components/Button";
import { CategoryAdmin } from "@/components/CategoryAdmin";
import { ExpensesList } from "@/components/ExpensesList";
import { useState } from "react";

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
