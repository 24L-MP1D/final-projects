'use client';

import TeacherWebFirstLayoutHeader from "./teacherWebFirstLayoutHeader";

export default function TeacherWebFirstLayout() {
  return (
    <div>
       <TeacherWebFirstLayoutHeader />
       <div className="flex flex-col justify-center">
         <p className="text-9xl">FINANCING</p>
         <p className="text-9xl">THE FUTURE</p>
       </div>
    </div>
  );
}
