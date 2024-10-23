import Aboutlower from '../components/aboutlower';
import Aboutupper from '../components/aboutupper';
import Comments from '../components/comments';
import { Googlemap } from '../components/googlemap';
import Hero from '../components/hero';
import Specialdishes from '../components/specialdishes';

export default function Home() {
  return (
    <div>
      <Hero />
      <Specialdishes />
      <Aboutupper />
      <Aboutlower />
      <Comments />
      <Googlemap />
    </div>
  );
}
