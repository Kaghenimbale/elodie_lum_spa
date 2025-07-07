import Beauty from "./components/Beauty";
import Hours from "./components/Hours";
import Presentation from "./components/Presentation";
import Wellness from "./components/Wellness";
import Wellness1 from "./components/Wellness1";

export default function Home() {
  return (
    <div className="w-[100%]">
      <Presentation />
      <Beauty />
      <Wellness />
      <Hours />
      <Wellness1 />
    </div>
  );
}
