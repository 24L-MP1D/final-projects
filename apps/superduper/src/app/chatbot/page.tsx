'use client';
import { TextGenerateEffect } from '@/components/ui/text-generate-effect';
import Image from 'next/image';
import { useState } from 'react';

const mockAnswers = [
  'Дуудлага худалдаанд оролцохын тулд та бүртгэлтэй байх шаардлагатай. Бүртгэл үүсгээд нэвтэрсэн үед хүссэн дуудлага худалдаанд оролцож болно.',
  'Та манай сайтын баруун дээд хэсэгт байрлах sell хэсэгт дарснаар дуудлага худалдаанд бараагаа оруулах боломжтой. Жич: Нэвтэрсэн байх шаардлагатай.',
  'Бүртгэл үүсгэхийг хүсвэл та нүүр хуудасны баруун дээд буланд байрлах бүртгүүлэх товчийг дарна уу.',
];
const mockQuestions = ['Хэрхэн дуудлага худалдаанд оролцох вэ?', 'Хэрхэн дуудлага худалдаанд бараа оруулах вэ?', 'Хэрхэн бүртгэл үүсгэх вэ?'];
export default function App() {
  const [chating, setChating] = useState(false);
  const [words, setWords] = useState('');
  const [question, setQuestion] = useState('');
  const answerAction = (question: string) => {
    setChating(true);
    setQuestion(question);
    if (question == mockQuestions[0]) return setWords(mockAnswers[0]);
    if (question == mockQuestions[1]) return setWords(mockAnswers[1]);
    if (question == mockQuestions[2]) return setWords(mockAnswers[2]);
  };

  return (
    <div className="p-2 text-[#f2f2f2] min-h-screen bg-[#f2f2f2]">
      <div className="w-full bg-[#333] rounded-xl flex items-center justify-center py-4">
        <div className="max-w-[1200px] flex flex-1 gap-6 mx-auto justify-center">
          <div className="hover:cursor-pointer hover:text-red-500">Чатлах</div>
          <div className="hover:cursor-pointer hover:text-red-500">Асуулт асуух</div>
        </div>
      </div>
      {chating ? (
        <div className="text-[#000000] max-w-[784px] mt-6 flex flex-col gap-6 w-full mx-auto">
          <div className="flex justify-end">
            <div className="bg-[#E8EBEA] shadow rounded-xl p-5">{question}</div>
          </div>
          <div className="bg-[#F9F9F9] rounded-xl p-5 shadow">
            <div className="">
              <Image src={'/images/imgAi.png'} alt="ai" width={500} height={500} className="object-cover w-32 h-32" />
            </div>
            <div className="py-5">
              <TextGenerateEffect words={words} />
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-[1000px] mx-auto mt-16 flex flex-col items-center text-[#000000]">
          <div className="w-32 h-32">
            <Image src={'/images/imgAi.png'} className="object-cover w-full h-full" alt="ai" width={500} height={500} />
          </div>
          <div className="text-5xl">Чатлах</div>
          <div className="text-sm my-2">Бид одоогоор доорх асуултанд л хариулж чадна. Цаашид улам сайжруулах болноо.</div>
          <div className="mt-4 flex gap-4 flex-wrap">
            {mockQuestions.map((question) => {
              return (
                <div onClick={() => answerAction(question)} className="bg-[#DBDBDB] hover:cursor-pointer hover:border-blue-400 border p-5 max-w-[320px] flex-1 rounded-xl">
                  {question}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
