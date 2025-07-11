import Image from "next/image";

const Testimonial = () => {
  return (
    <div className=" bg-orange-50 flex flex-col items-center justify-center gap-10 py-20">
      <Image src="/apostrophe.png" alt="testimonial" width={150} height={0} />
      <div className="flex flex-col items-center gap-5">
        <p className="lg:w-[40vw] px-4 md:p-0 text-center font-thin">
          From the moment I walked into ELODIA, I felt completely at peace. The
          atmosphere is so calming, and the staff truly go above and beyond to
          make you feel special. My skin has never looked better, and I always
          leave feeling refreshed and confident. I wouldn’t go anywhere else!
        </p>
        <div className="flex gap-2">
          <span className="font-thin text-gray-500">Isabelle M.</span>
          <span className="font-thin text-gray-500">-</span>
          <span className="font-thin text-gray-500">RELAX MASSAGE</span>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
