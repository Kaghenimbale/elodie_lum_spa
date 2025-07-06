import Beauty from "./components/Beauty";
import Presentation from "./components/Presentation";
import Wellness from "./components/Wellness";

export default function Home() {
  return (
    <div className="w-[100%]">
      <Presentation />
      <Beauty />
      <Wellness />
    </div>
  );
}
