import Image from "next/image";
import Button from "../components/global/Button";
import DiasShow from "../components/home/DiasShow";
import OpacityTextBox from "../components/global/OpacityTextBox";

export default async function Home() {
  return (
    <main className="">
      <DiasShow />
      <Button />
      <OpacityTextBox />
    </main>
  );
}
