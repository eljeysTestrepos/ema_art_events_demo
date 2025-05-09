import Image from "next/image";
import Button from "./components/global/Button";
import DiasShow from "./components/home/DiasShow";
import OpacityTextBox from "./components/global/OpacityTextBox";

export default function Home() {
  return (
    <main>
      <DiasShow />
      <Button />
      <OpacityTextBox />
    </main>
  );
}
