function BtnNew({
  setShowExpenseForm,
}: {
  setShowExpenseForm: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <button
      className="BtnNew"
      onClick={() => {
        setShowExpenseForm(true);
      }}
    >
      New
    </button>
  );
}
export { BtnNew };
