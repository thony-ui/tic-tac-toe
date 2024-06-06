import GenerateStars from "@/components/GenerateStars";
import Grid from "@/components/Grid";
import Header from "@/components/Header";
import { useSelector } from "react-redux";

export default function Home() {
  const darkMode = useSelector((state) => state.darkMode.value)
  return (
    <main
      className={`transition-all ease-in duration-300 min-h-screen ${darkMode ? "text-white bg-black" : "text-black"} pt-[20px]`}
    >
      <GenerateStars />
      <Header />

      {/* grid consists of 1 square at the top followed by 3 squares and 5 finally 5 squares at the bottom */}
      <Grid />
    </main>
  );
}
