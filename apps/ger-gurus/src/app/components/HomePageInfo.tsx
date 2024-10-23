import { Button } from './ui/button';

export const HomePageInfo = () => {
  return (
    <div style={{ position: 'relative', height: '400px', overflow: 'hidden' }}>
      <video
        autoPlay
        muted
        loop
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover', // Ensures the video covers the container
        }}
      >
        <source src="/video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div
        className="font-bold justify-center"
        style={{
          position: 'absolute',
          top: '70%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: 'white',
          fontSize: '3rem',
          textAlign: 'center',
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
        }}
      >
        <div> Ger Gurus </div>
        <div className="flex gap-4">
          <Button className="bg-[#8c8c8c] rounded-full hover:bg-[#333333] text-[18px]">Танилцах</Button>
          <Button className="bg-[#8c8c8c] rounded-full hover:bg-[#333333] text-[18px]">Бүртгүүлэх</Button>
        </div>
      </div>
    </div>
  );
};
