import { db } from '@/lib/db';
import { CircleDollarSign, File, LayoutDashboard, ListCheck } from 'lucide-react';
import { ObjectId } from 'mongodb';
import { redirect } from 'next/navigation';
import { AttachmentForm } from './_components/attachment-form';
import { ChaptersForm } from './_components/chapters-form';
import { CourseActions } from './_components/course-actions';
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
    published: boolean;
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
          published: { $first: '$published' },
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
  const isComplete = requiredFields.every(Boolean);

  return (
    <>
      <main>
        {!course.published && (
          <div role="alert" className="alert alert-warning flex">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <span className="text-sm">Энэхүү сургалт нь нийтлэгдээгүй байна. Вебсайтын сургалтын хэсэгт харагдахгүй байх болно.</span>
          </div>
        )}
        <div className=" md:container md:mx-auto px-[10%] py-[2%] max-h-full">
          <div className="flex items-center justify-between">
            <div className="prose">
              <h1 className="">Сургалт тохиргоо</h1>
              <p className="text-error">Бүх талбарыг бөглөнө үү {completionText}</p>
            </div>
            <CourseActions disabled={!isComplete} courseId={courseId} isPublished={course.published} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-6 mt-8">
            <div>
              <div className="prose">
                <h2 className="flex items-center gap-x-2">
                  <LayoutDashboard />
                  Сургалтаа тохируулах
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
                    Сургалтын нэгж хичээлүүд
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
                  Сургалтаа худалдах
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
    </>
  );
}
