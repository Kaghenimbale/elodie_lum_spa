import Image from "next/image";

const Testimonial = () => {
  return (
    <div className=" bg-orange-50 flex flex-col items-center justify-center gap-10 py-20">
      <Image src="/apostrophe.png" alt="testimonial" width={150} height={0} />
      <div className="flex flex-col items-center gap-5">
        <p className="lg:w-[40vw] px-4 md:p-0 text-center font-thin">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sit aperiam
          aliquam molestiae atque! Dolor incidunt quidem delectus et rem
          recusandae placeat, esse, voluptatem facilis dicta labore consequuntur
          eveniet. Modi enim ea est labore ullam possimus, sit nam, id, vel sed
          praesentium architecto blanditiis magni reiciendis quia expedita eum
          ratione cum.
        </p>
        <div className="flex gap-2">
          <span className="font-thin text-gray-500">ALEXA MOURE</span>
          <span className="font-thin text-gray-500">-</span>
          <span className="font-thin text-gray-500">RELAX MASSAGE</span>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
