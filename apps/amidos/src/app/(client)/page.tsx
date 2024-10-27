import { Swipercomments } from '@/components/swipercomments';
import { Swipersnew } from '@/components/swiperimage';
import Aboutlower from '../../components/aboutlower';
import Aboutupper from '../../components/aboutupper';
import { Googlemap } from '../../components/googlemap';
import Hero from '../../components/hero';

export default function Home() {
  return (
    <div>
      <Hero />
      <Swipersnew />
      <Aboutupper />
      <Swipercomments />
      <Googlemap />
    </div>
  );
}
