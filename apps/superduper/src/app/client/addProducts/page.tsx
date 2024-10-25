// 'use client';

// import { Category } from '@/components/CategoryType';
// import { DialogComponent } from '@/components/Dialog';
// import { ChevronLeft, ChevronRight } from 'lucide-react';
// import Image from 'next/image';
// import { useRouter } from 'next/navigation';
// import { useEffect, useState } from 'react';

// export default function Page() {
//   const router = useRouter();
//   const [open, setOpen] = useState(false);
//   const [category, setCategory] = useState<Category>();
//   const [categories, setCategories] = useState<Category[]>([]);
//   const loadCategory = async () => {
//     const response = await fetch('/api/addProducts');
//     const data = await response.json();
//     setCategories(data);
//   };
//   const saveCategory = (category: string) => {
//     const addProductObject = JSON.parse(localStorage.getItem('addProduct') || '{}');

//     addProductObject.category = category;
//     localStorage.setItem('addProduct', JSON.stringify(addProductObject));
//     router.push('/client/addProducts/2');
//   };
//   useEffect(() => {
//     loadCategory();
//   }, []);
//   return (
//     <div className="max-w-[50%] mx-auto mt-10">
//       <div className="flex flex-col gap-1 max-w-[500px] mx-auto text-2xl">
//         <div className="flex gap-2 items-center justify-center w-full text-[#00253e]">
//           <div className="p-0.5 border-2 border-[#00253e] rounded-full">
//             <div className="rounded-full w-4 h-4 bg-[#00253e]"></div>
//           </div>
//           <div className="bg-[#f3f3f3] h-0.5 w-[70px]"></div>
//           <div className="p-0.5 rounded-full">
//             <div className="rounded-full w-4 h-4 bg-[#f3f3f3]"></div>
//           </div>
//           <div className="bg-[#f3f3f3] h-0.5 w-[70px]"></div>
//           <div className="p-0.5 rounded-full">
//             <div className="rounded-full w-4 h-4 bg-[#f3f3f3]"></div>
//           </div>
//           <div className="bg-[#f3f3f3] h-0.5 w-[70px]"></div>
//           <div className="p-0.5 rounded-full">
//             <div className="rounded-full w-4 h-4 bg-[#f3f3f3]"></div>
//           </div>
//           <div className="bg-[#f3f3f3] h-0.5 w-[70px]"></div>
//           <div className="p-0.5 rounded-full">
//             <div className="rounded-full w-4 h-4 bg-[#f3f3f3]"></div>
//           </div>
//         </div>
//         <div className="flex gap-10 justify-center items-center ">
//           <div>Category</div>
//           <div className="text-[#f3f3f3]">Detail</div>
//           <div className="text-[#f3f3f3]">Photos</div>
//           <div className="text-[#f3f3f3]">Logistics</div>
//           <div className="text-[#f3f3f3]">Review</div>
//         </div>
//       </div>

//       <div className="mt-8 text-center text-[#333] text-[48px]">Choose your category</div>

//       <div className="text-[#aeaeae] w-full text-3xl">
//         <div className="flex gap-2 items-center py-8">
//           <div>
//             <ChevronLeft className="w-10 h-10" />
//           </div>
//           <div>Categories</div>
//         </div>
//         <div>
//           {categories.map((category, index) => (
//             <div key={category._id} className="flex justify-between py-6 border-b-[1px]">
//               <div onClick={() => saveCategory(category.category)} className="flex gap-2 text-black text-3xl hover:gap-1 hover:cursor-pointer items-center">
//                 <div>
//                   <ChevronRight className="w-10 h-10" />
//                 </div>
//                 <div>{category.category}</div>
//               </div>
//               <div className="hover:cursor-pointer">
//                 <Image
//                   onClick={() => {
//                     setOpen(true);
//                     setCategory(category);
//                   }}
//                   src={'/'}
//                   alt="image"
//                   width={500}
//                   height={500}
//                   className="w-10 h-10"
//                 />
//               </div>
//             </div>
//           ))}
//           <DialogComponent category={category} open={open} setOpen={setOpen} />
//         </div>
//       </div>
//     </div>
//   );
// }
