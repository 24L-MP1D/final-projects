export default async function fetchAddRecipe(recipe: any) {
  try {
    const res = await fetch(`/api/recipe`, { method: 'POST', body: JSON.stringify(recipe) });
  } catch (e) {
    console.error(e);
  }
}
