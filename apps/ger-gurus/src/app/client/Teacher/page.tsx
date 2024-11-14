'use client';

import TeacherWebFirstLayout from '@/components/teacherWebFirstLayoutHeader';
import TeacherWebSecondLayout from '@/components/teacherWebSecondLayout';
import TeacherWebThirdLayout from '@/components/teacherWebThirdLayout';

const Teacher = () => {
  return (
    <main>
      <TeacherWebFirstLayout />
      <TeacherWebSecondLayout />
      <TeacherWebThirdLayout />
    </main>
  );
};

export default Teacher;
