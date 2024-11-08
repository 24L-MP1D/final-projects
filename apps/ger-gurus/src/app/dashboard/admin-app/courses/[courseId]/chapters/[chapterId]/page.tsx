import { IconBadge } from '@/components/icon-badge';
import { db } from '@/lib/db';
import { ArrowLeft, CircleDollarSign, Eye, LayoutDashboard } from 'lucide-react';
import { ObjectId } from 'mongodb';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { ChapterAccessForm } from './_components/chapter-access-form';
import { ChapterDescriptionForm } from './_components/chapter-description-form';
import { ChapterTitleForm } from './_components/chapter-title-form';

type Params = Promise<{ courseId: string; chapterId: string }>;

export default async function Page({ params }: { params: Params }) {
  // const {userId}=auth()
  // if (!userId){return redirect("/")}
  const { courseId, chapterId } = await params;

  const chapter = await db.collection('chapters').findOne({
    _id: new ObjectId(chapterId),
    courseId: new ObjectId(courseId),
  });
  // include: {muxData: true}
  if (!chapter) {
    return redirect('/');
  }

  interface Chapter {
    _id: string; // Converted to string
    title: string;
    description?: string;
    videoUrl?: string;
    courseId: string; // Converted to string
    isPublished?: boolean;
    isFree?: boolean;
    position: number;
  }

  const chapterWithPlainId = {
    ...chapter,
    _id: chapter._id.toString(),
    courseId: chapter.courseId.toString(),
  };
  const requiredFields = [chapter.title, chapter.description, chapter.videoUrl];
  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  const completionText = `(${completedFields}/${totalFields})`;

  return (
    <main className="p-6">
      <div className="flex items-center justify-between">
        <Link href={`/admin-app/courses/${courseId}`} className="flex items-center text-sm hover:opacity-75 transition mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to course setup
        </Link>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-medium">Chapter Creation</h1>
          <span className="text-sm text-slate-700">Complete all fields {completionText}</span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
        <div>
          <div className="flex items-center gap-x-2">
            <IconBadge icon={LayoutDashboard} />
            <h2 className="text-xl">Customize your chapter</h2>
          </div>
          <ChapterTitleForm initialData={chapterWithPlainId} />
          <ChapterDescriptionForm initialData={chapterWithPlainId} />
        </div>
        <div>
          <div className="flex items-center gap-x-2">
            <IconBadge icon={Eye} />
            <h2 className="text-xl">Access settings</h2>
          </div>
          <ChapterAccessForm initialData={chapterWithPlainId} />
        </div>
        <div>
          <div className="flex items-center gap-x-2">
            <IconBadge icon={CircleDollarSign} />
            <h2 className="text-xl">Sell your course</h2>
          </div>
          {/* <PriceForm initialData={courseWithPlainId} /> */}
        </div>
      </div>
    </main>
  );
}
