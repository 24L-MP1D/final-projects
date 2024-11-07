// 'use client';

// import { useState } from 'react';
// // import { editComment } from '../../api/comment/route';
// import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../components/ui/dialog';
// // import StarRating from '../recipe/[slug]/StarRating';
// import { Button } from './ui/Button';

// export default function EditComment({ open, setOpen, reset, slug }: { open: boolean; setOpen: any; reset: any; slug: string }) {
//   const [rating, setRating] = useState(0);
//   const [comment, setComment] = useState('');
//   return (
//     <Dialog open={open} onOpenChange={setOpen}>
//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle>Are you sure you want to edit your comment?</DialogTitle>
//           <DialogDescription>
//             <StarRating rating={rating} onRatingChange={setRating} />
//             <textarea className="w-full p-2 border border-gray-300 rounded-md mt-2" placeholder="Write a comment..." onChange={(e) => setComment(e.target.value)}></textarea>
//             <Button
//               variant="outline"
//               className="rounded-full px-9 py-2 text-white bg-blue-600 text-sm mt-2"
//               onClick={async () => {
//                 await editComment(slug, rating, comment);
//                 reset();
//                 setOpen();
//               }}
//             >
//               Үнэлэх
//             </Button>
//           </DialogDescription>
//         </DialogHeader>
//       </DialogContent>
//     </Dialog>
//   );
// }
=======
import { useState } from 'react';
// import { editComment } from '../../api/comment/route';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../components/ui/Dialog';
import StarRating from '../recipe/[id]/StarRating';
import { Button } from './ui/Button';

export default function EditComment({ open, setOpen, reset, slug }: { open: boolean; setOpen: any; reset: any; slug: string }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure you want to edit your comment?</DialogTitle>
          <DialogDescription>
            <StarRating rating={rating} onRatingChange={setRating} />
            <textarea className="w-full p-2 border border-gray-300 rounded-md mt-2" placeholder="Write a comment..." onChange={(e) => setComment(e.target.value)}></textarea>
            <Button
              variant="outline"
              className="rounded-full px-9 py-2 text-white bg-blue-600 text-sm mt-2"
              onClick={async () => {
                // await editComment(slug, rating, comment);
                reset();
                setOpen();
              }}
            >
              Үнэлэх
            </Button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
