import { IconBadge } from '@/components/icon-badge';
import { db } from '@/lib/db';
import { CircleDollarSign, File, LayoutDashboard, ListCheck } from 'lucide-react';
import { ObjectId } from 'mongodb';
import { redirect } from 'next/navigation';
import { AttachmentForm } from './_components/attachment-form';
import { ChaptersForm } from './_components/chapters-form';
import { DescriptionForm } from './_components/description-form';
import { ImageForm } from './_components/image-form';
import { PriceForm } from './_components/price-form';
import { TitleForm } from './_components/title-form';

type Params = Promise<{ courseId: string }>;

export default async function Page({ params }: { params: Params }) {
  const { courseId } = await params;
  // const {userId}=auth()
  // if (!userId){return redirect("/")}

  // const course = await db.collection('courses').findOne({
  //   _id: new ObjectId(courseId),
  // });
  // if (!course) {
  //   return redirect('/');
  // }

  interface Course {
    _id: ObjectId;
    title: string;
    description: string;
    imageUrl: string;
    price: number;
    chapters: Chapter[];
  }
  interface Chapter {
    _id: string; // Converted to string
    title: string;
    courseId: string; // Converted to string
    isPublished?: boolean;
    isFree?: boolean;
    position: number;
  }

  const course1 = (await db
    .collection('courses')
    .aggregate([
      {
        $match: { _id: new ObjectId(courseId) },
      },
      {
        $lookup: {
          from: 'chapters',
          localField: '_id',
          foreignField: 'courseId', // Assuming `courseId` in `chapters` links to `courses`
          as: 'chapters',
        },
      },
      {
        $unwind: {
          path: '$chapters',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $sort: { 'chapters.position': 1 },
      },
      {
        $group: {
          _id: '$_id',
          title: { $first: '$title' },
          description: { $first: '$description' },
          imageUrl: { $first: '$imageUrl' },
          price: { $first: '$price' },
          chapters: { $push: '$chapters' },
        },
      },
    ])
    .toArray()) as Course[];

  if (!course1 || course1.length === 0) {
    return redirect('/');
  }
  const course = course1[0];

  const courseWithPlainId = {
    ...course,
    _id: course._id.toString(),
    chapters: course.chapters.map((chapter) => ({
      ...chapter,
      _id: chapter._id.toString(),
      courseId: chapter.courseId.toString(),
    })),
  };
  const requiredFields = [course.title, course.description, course.imageUrl, course.price, course.chapters];
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
            <div>
              <ChaptersForm initialData={courseWithPlainId} />
            </div>
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
