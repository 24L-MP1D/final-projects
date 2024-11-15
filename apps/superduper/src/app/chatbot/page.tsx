'use client';
import { TextGenerateEffect } from '@/components/ui/text-generate-effect';
import Image from 'next/image';
import { useState } from 'react';

const mockAnswers = [
  'Дуудлага худалдаанд оролцохын тулд та бүртгэлтэй байх шаардлагатай. Бүртгэл үүсгээд нэвтэрсэн үед хүссэн дуудлага худалдаанд оролцож болно.',
  'Та манай сайтын нүүр хэсэгт байрлах дуудлага худалдаа явуулах хэсэгт дарснаар дуудлага худалдаанд бараагаа оруулах боломжтой болно. Жич: Нэвтэрсэн байх шаардлагатай.',
  'Бүртгэл үүсгэхийг хүсвэл та нүүр хуудасны баруун дээд буланд байрлах бүртгүүлэх товчийг дарна уу.',
];

const mockQuestions = ['Хэрхэн дуудлага худалдаанд оролцох вэ?', 'Хэрхэн дуудлага худалдаанд бараа оруулах вэ?', 'Хэрхэн бүртгэл үүсгэх вэ?'];

export default function App() {
  const [chating, setChating] = useState(false);
  const [words, setWords] = useState('');
  const [question, setQuestion] = useState('');

  // Function to handle answering questions
  const answerAction = (question: string) => {
    setChating(true);
    setQuestion(question);
    if (question === mockQuestions[0]) return setWords(mockAnswers[0]);
    if (question === mockQuestions[1]) return setWords(mockAnswers[1]);
    if (question === mockQuestions[2]) return setWords(mockAnswers[2]);
  };

  // Function to return to the question selection
  const returnToQuestions = () => {
    setChating(false);
    setWords('');
    setQuestion('');
  };

  // Function to return to home page
  const returnToHomePage = () => {
    window.location.href = '/client';
    console.log('Returning to home page...');
    // Example for Next.js navigation:
    // router.push('/');
  };

  return (
    <div className="p-4 text-[#f2f2f2] min-h-screen bg-[#E6F1FB]">
      {/* Header */}
      <div className="w-full bg-[#007BFF] rounded-xl flex items-center justify-center py-4">
        <div className="max-w-[1200px] flex flex-1 gap-6 mx-auto justify-between">
          <div className="hover:cursor-pointer hover:text-blue-200 text-white font-semibold">Чат бот</div>
          <div className="hover:cursor-pointer hover:text-blue-200 text-white font-bold">Асуулт асуух</div>
          <div className="hover:cursor-pointer hover:text-blue-200 text-white">BidScape</div>
        </div>
      </div>

      {/* Chat Section */}
      {chating ? (
        <div className="text-[#000000] max-w-[784px] mt-6 flex flex-col gap-6 w-full mx-auto">
          {/* Question Message */}
          <div className="flex justify-end">
            <div className="bg-[#C9E1F5] shadow rounded-xl p-5">{question}</div>
          </div>

          {/* AI Response */}
          <div className="bg-[#F1F8FF] rounded-xl p-5 shadow-md">
            <div className="flex justify-center">
              <Image src={'/avatar1.png'} alt="ai" width={500} height={500} className="object-cover w-32 h-32 rounded-full" />
            </div>
            <div className="py-5">
              <TextGenerateEffect words={words} />
            </div>
          </div>

          {/* Buttons Section: Return and Return to Home */}
          <div className="mt-4 flex justify-between">
            <button onClick={returnToQuestions} className="px-6 py-3 bg-[#007BFF] text-white rounded-lg hover:bg-[#0056b3] transition-all duration-300">
              Буцах
            </button>
            <button onClick={returnToHomePage} className="px-6 py-3 bg-[#FF4D4D] text-white rounded-lg hover:bg-[#d93c3c] transition-all duration-300">
              Нүүр хуудас руу буцах
            </button>
          </div>
        </div>
      ) : (
        <div className="max-w-[1000px] mx-auto mt-16 flex flex-col items-center text-[#000000]">
          <div className="w-32 h-32">
            <Image src={'/avatar1.png'} className="object-cover w-full h-full rounded-full" alt="ai" width={700} height={700} />
          </div>

          {/* Title */}
          <div className="text-5xl font-extrabold text-[#007BFF]">Асуулт асуух</div>
          <div className="text-sm my-2 text-gray-700">Бид одоогоор доорх асуултанд л хариулж чадна. Цаашид улам сайжруулах болноо.</div>
          <div className="hover:cursor-pointer hover:text-blue-200 text-blue-500 mt-3 text-xl font-semibold">Та асуулт аа сонгоно уу</div>

          {/* Questions */}
          <div className="mt-4 flex gap-4 flex-wrap">
            {mockQuestions.map((question) => {
              return (
                <div
                  key={question}
                  onClick={() => answerAction(question)}
                  className="bg-[#DBEAFE] hover:cursor-pointer hover:border-blue-500 border p-5 max-w-[320px] flex-1 rounded-xl text-center font-medium text-blue-800 hover:text-white hover:bg-blue-600 transition-all duration-300"
                >
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
