import { IconBadge } from '@/components/icon-badge';
import { db } from '@/lib/db';
import { CircleDollarSign, File, LayoutDashboard, ListCheck } from 'lucide-react';
import { ObjectId } from 'mongodb';
import { redirect } from 'next/navigation';
import { AttachmentForm } from './_components/attachment-form';
import { DescriptionForm } from './_components/description-form';
import { ImageForm } from './_components/image-form';
import { PriceForm } from './_components/price-form';
import { TitleForm } from './_components/title-form';

export default async function Page({ params }: { params: { courseId: string } }) {
  // const {userId}=auth()
  // if (!userId){return redirect("/")}
  const course = await db.collection('courses').findOne({
    _id: new ObjectId(params.courseId),
  });
  if (!course) {
    return redirect('/');
  }
  const courseWithPlainId = {
    _id: course._id.toString(),
    title: course.title,
    description: course.description,
    imageUrl: course.imageUrl,
    price: course.price,
    categoryId: course.categoryId, // Ensure all required fields are included
  };
  const requiredFields = [course.title, course.description, course.imageUrl, course.price, course.categoryId];
  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  const completionText = `(${completedFields}/${totalFields})`;
  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-medium">Course setup</h1>
          <span className="text-sm text-slate-700">Complete all fields {completionText}</span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
        <div>
          <div className="flex items-center gap-x-2">
            <IconBadge icon={LayoutDashboard} />
            <h2 className="text-xl">Customize your course</h2>
          </div>
          <TitleForm initialData={courseWithPlainId} />
          <DescriptionForm initialData={courseWithPlainId} />
          <ImageForm initialData={courseWithPlainId} />
        </div>
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={ListCheck} />
              <h2 className="text-xl">Course chapters</h2>
            </div>
            <div>todo:chapters</div>
          </div>
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={CircleDollarSign} />
              <h2 className="text-xl">Sell your course</h2>
            </div>
            <PriceForm initialData={courseWithPlainId} />
          </div>
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={File} />
              <h2 className="text-xl">Resources and Attachments</h2>
            </div>
            <AttachmentForm initialData={courseWithPlainId} />
          </div>
        </div>
      </div>
    </div>
  );
}
