async function deleteCategory(id: number) {
  try {
    await fetch(`http://localhost:5000/api/category/${id}`, {
      method: 'DELETE',
    });
  } catch (e) {
    // TODO: user feedback
    console.error(e);
  }
}
export {deleteCategory};
