import { db } from '@/lib/db';
import { ArrowLeft, Eye, LayoutDashboard, Video } from 'lucide-react';
import { ObjectId } from 'mongodb';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { ChapterAccessForm } from './_components/chapter-access-form';
import { ChapterActions } from './_components/chapter-actions';
import { ChapterDescriptionForm } from './_components/chapter-description-form';
import { ChapterTitleForm } from './_components/chapter-title-form';
import { ChapterVideoEmbedForm } from './_components/chapter-video-embed-form';
type Params = Promise<{ courseId: string; chapterId: string; schoolId: string }>;

export default async function Page({ params }: { params: Params }) {
  // const {userId}=auth()
  // if (!userId){return redirect("/")}
  const { courseId, chapterId, schoolId } = await params;

  const chapter = await db.collection('chapters').findOne({
    _id: new ObjectId(chapterId),
    courseId: new ObjectId(courseId),
  });
  if (!chapter) {
    return redirect('/');
  }

  const muxData = await db.collection('muxData').findOne({ chapterId });

  interface Chapter {
    _id: string; // Converted to string
    title: string;
    description?: string;
    videoUrl?: string;
    courseId: string; // Converted to string
    isPublished?: boolean;
    isFree?: boolean;
    position: number;
    muxData?: any;
    videoEmbedUrl?: string;
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
  const isComplete = requiredFields.every(Boolean);

  return (
    <div className="h-full mb-20">
      {!chapter.isPublished && (
        <div role="alert" className="alert alert-warning flex">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <span className="text-sm">Энэхүү нэгж хичээл нь нийтлэгдээгүй байна. Вебсайтын хичээл хэсэгт харагдахгүй байх болно.</span>
        </div>
      )}

      <div className="p-6 md:container md:mx-auto h-full">
        <div className="flex items-center justify-between max-w-2xl">
          <Link href={`/admin-app/${schoolId}/courses/${courseId}`} className="flex items-center text-sm  transition mb-6 link link-primary hover:scale-125">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Курсын тохиргоонд буцах
          </Link>
        </div>
        <div className="flex items-center justify-between">
          <div className="prose">
            <h1 className="">Бүлэг үүсгэх</h1>
            <p className="text-error">Бүх талбарыг бөглөнө үү {completionText}</p>
          </div>
          <ChapterActions disabled={!isComplete} courseId={courseId} chapterId={chapterId} isPublished={chapter.isPublished} />
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-3 md:grid-cols-2 gap-6 mt-8">
          <div>
            <div className="prose">
              <h2 className="flex items-center gap-x-2 ">
                <LayoutDashboard className="bg-secondary" /> Бүлгээ тохируулах
              </h2>
            </div>
            <ChapterTitleForm initialData={chapterWithPlainId} />
            <ChapterDescriptionForm initialData={chapterWithPlainId} />
          </div>
          <div>
            <div className="prose">
              <h2 className="flex items-center gap-x-2">
                <Video />
                Видео нэмэх
              </h2>
            </div>
            <ChapterVideoEmbedForm initialData={chapterWithPlainId} />
            {/* <div className="prose mt-20">
              <h2 className="flex items-center gap-x-2">
                <Video />
                Видео нэмэх
              </h2>
            </div>
            <ChapterVideoForm initialData={chapterWithPlainId} playbackId={muxData?.playbackId} /> */}
          </div>
          <div>
            <div className=" prose text-accent">
              <h2 className="flex items-center gap-x-2">
                <Eye />
                Хандалтын тохиргоо
              </h2>
            </div>
            <ChapterAccessForm initialData={chapterWithPlainId} />
          </div>
        </div>
      </div>
    </div>
  );
}
