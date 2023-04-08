async function deleteCategory(id: number) {
  try {
    await fetch(`/api/category/${id}`, {
      method: 'DELETE',
    });
  } catch (e) {
    // TODO: user feedback
    console.error(e);
  }
}
export {deleteCategory};
