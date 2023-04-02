async function deleteExpense(id: number) {
  try {
    await fetch(`http://localhost:5000/api/expense/${id}`, {
      method: 'DELETE',
    });
  } catch (e) {
    // TODO: user feedback
    console.error(e);
  }
}
export {deleteExpense};
