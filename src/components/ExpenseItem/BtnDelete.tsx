import { fetchExpenses } from "@/lib/fetchExpenses";
import { Expense } from "@/models";
import { Dispatch, SetStateAction } from "react";

async function deleteExpense(id: number) {
  try {
    await fetch(`http://localhost:5000/api/expense/${id}`, {
      method: "DELETE",
    });
  } catch (e) {
    // TODO: user feedback
    console.error(e);
  }
}
function BtnDelete({
  id,
  setExpenses,
}: {
  id: number;
  setExpenses: Dispatch<SetStateAction<Expense[]>>;
}) {
  return (
    <button
      className="BtnDelete"
      type="button"
      onClick={async () => {
        await deleteExpense(id);
        const expenses = await fetchExpenses(new Date().getTime());
        setExpenses(expenses);
      }}
    >
      Delete
    </button>
  );
}
export { BtnDelete };
