// export const postComment = async (
//     productId: string,
//     rating: number,
//     comment: string
//   ) => {
//     const token = localStorage.getItem("Authorization") || "";
//     try {
//       const res = await fetch(`${backCode}/comment/create`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json", authToken: token },
//         body: JSON.stringify({ productId, comment, rating })
//       });
//     } catch (e) {
//       console.error(e);
//     }
//   };

//   export const fetchComments = async (slug: string) => {
//     const token = localStorage.getItem("Authorization") || "";
//     try {
//       const res = await fetch(
//         `${backCode}/comment/getByProdId?productId=${slug}`,
//         {
//           method: "GET",
//           headers: { "Content-Type": "application/json", authToken: token }
//         }
//       );
//       const data = await res.json();
//       return data;
//     } catch (e) {
//       console.error(e);
//       return [];
//     }
//   };

//   export const deleteComment = async (slug: string) => {
//     const token = localStorage.getItem("Authorization") || "";
//     try {
//       const res = await fetch(`${backCode}/comment/delete`, {
//         method: "DELETE",
//         headers: { "Content-Type": "application/json", authToken: token },
//         body: JSON.stringify({ productId: slug })
//       });
//     } catch (e) {
//       console.error(e);
//     }
//   };

//   export const editComment = async (
//     productId: string,
//     rating: number,
//     comment: string
//   ) => {
//     const token = localStorage.getItem("Authorization") || "";
//     try {
//       const res = await fetch(`${backCode}/comment/edit`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json", authToken: token },
//         body: JSON.stringify({ productId, comment, rating })
//       });
//     } catch (e) {
//       console.error(e);
//     }
//   };
