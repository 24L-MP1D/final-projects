'use client';
import { Star } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

export function Swipercomments() {
  const comments = [
    { star: 5, title: 'Mаш тохилог гоё хоолтой газар байна', description: 'Mаш их таалагдлаа хурдан шуурхай үйлчилгээтэй байлаа' },
    { star: 1, title: 'Mаш тохилог гоё хоолтой газар байна', description: 'Mаш их таалагдлаа хурдан шуурхай үйлчилгээтэй байлаа' },
    { star: 3, title: 'Mаш тохилог гоё хоолтой газар байна', description: 'Mаш их таалагдлаа хурдан шуурхай үйлчилгээтэй байлаа' },
    { star: 5, title: 'Mаш тохилог гоё хоолтой газар байна', description: 'Mаш их таалагдлаа хурдан шуурхай үйлчилгээтэй байлаа' },
    { star: 1, title: 'Mаш тохилог гоё хоолтой газар байна', description: 'Mаш их таалагдлаа хурдан шуурхай үйлчилгээтэй байлаа' },
    { star: 3, title: 'Mаш тохилог гоё хоолтой газар байна', description: 'Mаш их таалагдлаа хурдан шуурхай үйлчилгээтэй байлаа' },
  ];
  //   const [news, setNews] = useState([]);
  //   useEffect(() => {
  //     fetch(`https://dev.to/api/articles?username=ben&per_page=9`)
  //       .then((response) => {
  //         return response.json();
  //       })
  //       .then((data) => {
  //         setNews(data);
  //       });
  //   }, []);
  return (
    <>
      <div className="md:block hidden mx-20 my-20 ">
        <Swiper
          slidesPerView={4}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 2500,
            disableOnInteraction: true,
          }}
          modules={[Pagination, Autoplay]}
          className="mySwiper my-16 "
        >
          {comments.map((comment) => (
            <SwiperSlide className="flex  flex-col gap-7 px-6 py-20 border bg-slate-100  " key={comment.title}>
              <div className="flex ">
                <Star color="#FFEA00" fill="#FFEA00" />
                <Star color="#FFEA00" fill={comment.star !== 1 ? '#FFEA00' : 'white'} />
                <Star color="#FFEA00" fill={comment.star !== 1 && comment.star !== 2 ? '#FFEA00' : 'white'} />
                <Star color="#FFEA00" fill={comment.star !== 1 && comment.star !== 2 && comment.star !== 3 ? '#FFEA00' : 'white'} />
                <Star color="#FFEA00" fill={comment.star !== 1 && comment.star !== 2 && comment.star !== 3 && comment.star !== 4 ? '#FFEA00' : 'white'} />
              </div>
              <div className="text-[#8B0000] font-semibold text-base">{comment.title}</div>
              <div className="text-[#342216] text-xs">{comment.description}</div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="md:hidden block">
        <Swiper
          slidesPerView={2}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 2500,
            disableOnInteraction: true,
          }}
          modules={[Pagination, Autoplay]}
          className="mySwiper"
        >
          {comments.map((comment) => (
            <SwiperSlide className="flex  flex-col gap-7 px-6 py-20 border border-gray-300 text-justify" key={comment.title}>
              <div className="flex">
                <Star color="#FFEA00" fill="#FFEA00" />
                <Star color="#FFEA00" fill={comment.star !== 1 ? '#FFEA00' : 'white'} />
                <Star color="#FFEA00" fill={comment.star !== 1 && comment.star !== 2 ? '#FFEA00' : 'white'} />
                <Star color="#FFEA00" fill={comment.star !== 1 && comment.star !== 2 && comment.star !== 3 ? '#FFEA00' : 'white'} />
                <Star color="#FFEA00" fill={comment.star !== 1 && comment.star !== 2 && comment.star !== 3 && comment.star !== 4 ? '#FFEA00' : 'white'} />
              </div>
              <div className="text-[#8B0000] font-semibold  text-base">{comment.title}</div>
              <div className="text-[#342216]  text-xs">{comment.description}</div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}
