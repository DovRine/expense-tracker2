import { Dispatch, SetStateAction } from "react";
import "./CategoryAdmin.scss";
import { Button } from "../Button";
import { CategoriesList } from "../CategoriesList";

type Props = {
  setShowCategoryAdmin: Dispatch<SetStateAction<boolean>>;
};
function CategoryAdmin({ setShowCategoryAdmin }: Props) {
  return (
    <div className="CategoryAdmin">
      <Button
        classes="BtnClose"
        onClick={() => setShowCategoryAdmin(false)}
        label="Close"
      />
      <h1>Category Admin</h1>
      <CategoriesList />
    </div>
  );
}

export { CategoryAdmin };
