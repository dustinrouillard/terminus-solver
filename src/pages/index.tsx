import Link from "next/link";
import { Symbol2 } from "../components/terminusSymbols";
import { ITool, Tool } from "../components/tool";
import Layout from "./_layout";
import { ScorpionSymbol } from "../components/citadelleSymbols";
import { Symbols } from "../components/runicSymbols";

export const Tools: ITool[] = [
  {
    name: "Beamsmasher Calculator",
    description: "Calculator for the Terminus Beamsmasher Easter Egg",
    color: "#EBD9BE",
    path: "/terminus",
    icon: () => (<Symbol2 />) as JSX.Element,
  },
  {
    name: "Raven Sword Puzzle Helper",
    description: "Puzzle helpers for the Citadelle Raven Sword Upgrade",
    color: "#3FF5FF",
    path: "/citadelle",
    icon: () => (<ScorpionSymbol />) as JSX.Element,
  },
  {
    name: "Wall Puzzle Tracker",
    description:
      "Helps you keep track of the symbols for the wall puzzle part of the main quest on Citadelle",
    color: "#60a5fa",
    path: "/citadelle-runes",
    icon: (random: number) => {
      const Symbol = Symbols[random];
      return (<Symbol />) as JSX.Element;
    },
  },
];

interface Props {
  runeToolRandom: number;
}

export default function Index(props: Props) {
  return (
    <>
      <Layout>
        <div className="flex text-2xl w-full font-bold justify-center text-center mb-8">
          <h1>Various Tools/Utilities for Black Ops 6 Zombies</h1>
        </div>

        <div className="grid xl:grid-cols-2 xl:grid-rows-1 xl:grid-flow-row overflow-scroll p-2 rounded-lg bg-neutral-300 dark:bg-neutral-800">
          {Tools.map((tool, index) => (
            <Tool key={index} tool={tool} {...props} />
          ))}
        </div>

        <div className="flex flex-col md:flex-row justify-between space-y-4 md:space-y-0">
          <div className="flex flex-col md:text-left">
            <p className="opacity-40">
              Made by{" "}
              <Link
                href="https://dstn.to"
                target="_blank"
                className="underline text-blue-400"
              >
                dstn.to
              </Link>
            </p>
          </div>
        </div>
      </Layout>
    </>
  );
}

export function getServerSideProps() {
  return {
    props: {
      runeToolRandom: Math.floor(Math.random() * Symbols.length),
    },
  };
}
