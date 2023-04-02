import { Dispatch, SetStateAction } from "react";

function BtnEdit({
  id,
  setShowEditForm,
}: {
  id: number;
  setShowEditForm: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <button
      className="BtnEdit"
      type="button"
      onClick={() => setShowEditForm(true)}
    >
      Edit
    </button>
  );
}
export { BtnEdit };
