export const hideData = (data: any) => {
  return data.map((item: any) => ({
    id: item._id,
    prepTime: item.prepTime,
    description: item.description,
    title: item.title,
    img: item.images ? item.images[0] : null, // Ensure there's an image
  }));
};
