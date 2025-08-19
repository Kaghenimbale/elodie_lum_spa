import Beauty from "./components/Beauty";
import Earn from "./components/Earn";
import Hours from "./components/Hours";
import Place from "./components/Place";
import Post from "./components/Post";
import Presentation from "./components/Presentation";
import Testimonial from "./components/Testimonial";
import Wellness from "./components/Wellness";
import Wellness1 from "./components/Wellness1";

export default function Home() {
  return (
    <div className="">
      <Presentation />
      <Beauty />
      <Wellness />
      <Hours />
      <Wellness1 />
      <Place />
      <Earn />
      <Testimonial />
    </div>
  );
}
