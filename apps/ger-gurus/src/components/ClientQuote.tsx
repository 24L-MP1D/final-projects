'use client';

export default function ClientQuote() {
  return (
    <div className="max-w-[1440px] mx-auto">
      <section className="max-w-[1020px] mx-auto px-10 py-20 flex flex-col gap-8 items-center">
        <div className="text-lg font-bold text-purple-600">Our mission</div>
        <div className="text-5xl text-[#201116] font-bold text-center">
          Together, we aim to empower and inspire people to unlock their creative potential, making design accessible and impactful for everyone. 👻
        </div>
      </section>
      <section className="mx-auto px-10 py-20 max-w-[1280px] ">
        <div
          className="width-[100%] h-[100%] min-h-[640px] p-16 rounded-2xl grid grid-cols-2"
          style={{
            background: 'linear-gradient(100deg, #e1e2e2, #e1e2e2 50%, #abaaa8)',
          }}
        >
          <div className="pt-8 pb-4 flex flex-col gap-2">
            <div className="text-lg font-bold text-purple-600">Meet Your Instructor</div>
            <div className="text-7xl text-[#201116] font-bold">Who is Pablo Stanley?</div>
            <div className="text-xl">
              As your guide in this course, Pablo Stanley combines his entrepreneurial spirit and design expertise from co-founding Carbon Health and Blush Design, to his roles at Udemy, Lyft, and
              Invision. Celebrated for his Open Source Doodles and Robotos NFTs, Pablo's real passion lies in empowering emerging designers through practical insights and fostering a creative
              community. Join him to explore the depths of design and unlock your creative potential.
            </div>
            <div>icons</div>
          </div>
          <div>image</div>
        </div>
      </section>
    </div>
  );
}
