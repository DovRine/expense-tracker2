import {Dispatch, SetStateAction} from 'react';
import './CategoryAdmin.scss';
import {Button} from '../Button';
import {CategoriesList} from '../CategoriesList';

type Props = {
  setShowCategoryAdmin: Dispatch<SetStateAction<boolean>>;
};
function CategoryAdmin({setShowCategoryAdmin}: Props) {
  return (
    <div className="CategoryAdmin">
      <h1>Category Admin</h1>
      <Button
        classes="BtnClose"
        onClick={() => setShowCategoryAdmin(false)}
        label="Close"
      />
      <CategoriesList />
    </div>
  );
}

export {CategoryAdmin};
