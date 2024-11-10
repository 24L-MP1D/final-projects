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
    attachments?: Attachment[];
  }
  interface Chapter {
    _id: string; // Converted to string
    title: string;
    courseId: string; // Converted to string
    isPublished?: boolean;
    isFree?: boolean;
    position: number;
  }
  interface Attachment {
    _id: string;
    createdAt?: Date;
    courseId: string;
    url?: string;
    name?: string;
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
      {
        $lookup: {
          from: 'attachments',
          localField: '_id',
          foreignField: 'courseId', // Assuming `courseId` in `attachments` links to `courses`
          as: 'attachments',
        },
      },
      {
        $addFields: {
          attachments: { $sortArray: { input: '$attachments', sortBy: { createdAt: -1 } } },
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
    chapters: course.chapters.map((chapter) => {
      const chapterAttachments = (course.attachments || []).filter((attachment) => attachment.courseId.toString() === chapter.courseId.toString());
      return {
        ...chapter,
        _id: chapter._id.toString(),
        courseId: chapter.courseId.toString(),
        attachments: chapterAttachments.map((attachment) => ({
          _id: attachment._id.toString(),
          url: attachment.url,
          name: attachment.name,
          courseId: attachment.courseId.toString(), // Ensure ObjectId is converted to string
          createdAt: attachment.createdAt ? attachment.createdAt.toISOString() : null, // Ensure Date is converted to string
        })),
      };
    }),
    attachments: course.attachments?.map((attachment) => ({
      _id: attachment._id.toString(),
      url: attachment.url,
      name: attachment.name,
      courseId: attachment.courseId.toString(), // Ensure ObjectId is converted to string
      createdAt: attachment.createdAt ? attachment.createdAt.toISOString() : null, // Ensure Date is converted to string
    })),
  };

  const requiredFields = [course.title, course.description, course.imageUrl, course.price, course.chapters?.[0], course.attachments?.[0]];
  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  const completionText = `(${completedFields}/${totalFields})`;

  return (
    <main>
      <div className=" md:container md:mx-auto shadow-xl p-[10%] max-h-full">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-2 prose">
            <h1 className="">Курс тохиргоо</h1>
            <p className="text-error">Бүх талбарыг бөглөнө үү {completionText}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-6 mt-8">
          <div>
            <div className="prose">
              <h2 className="flex items-center gap-x-2">
                <LayoutDashboard />
                Курсээ тохируулах
              </h2>
            </div>
            <TitleForm initialData={courseWithPlainId} />
            <ImageForm initialData={courseWithPlainId} />
            <DescriptionForm initialData={courseWithPlainId} />
          </div>
          <div className="space-y-6">
            <div>
              <div className="prose">
                <h2 className="flex items-center gap-x-2">
                  <ListCheck />
                  Курсын бүлгүүд
                </h2>
              </div>
              <div>
                <ChaptersForm initialData={courseWithPlainId} />
              </div>
            </div>
          </div>
          <div>
            <div className="prose">
              <h2 className="flex items-center gap-x-2">
                <CircleDollarSign />
                Курсаа худалдах
              </h2>
            </div>
            <PriceForm initialData={courseWithPlainId} />
            <div className="mt-6">
              <div className="prose">
                <h2 className="flex items-center gap-x-2">
                  <File />
                  Нөөц материал ба хавсралтууд
                </h2>
              </div>
              <AttachmentForm initialData={courseWithPlainId} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
