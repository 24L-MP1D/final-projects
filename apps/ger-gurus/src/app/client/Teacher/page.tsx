'use client';

import TeacherWebFirstLayout from '@/components/teacherWebFirstLayoutHeader';
import TeacherWebThirdLayout from '@/components/teacherWebThirdLayout';

const Teacher = () => {
  return (
    <main>
      <TeacherWebFirstLayout />
      {/* <TeacherWebSecondLayout /> */}
      <TeacherWebThirdLayout />
    </main>
  );
};

export default Teacher;
