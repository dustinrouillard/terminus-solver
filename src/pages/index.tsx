import Link from "next/link";
import { Symbol2 } from "../components/terminusSymbols";
import { ITool, Tool } from "../components/tool";
import Layout from "./_layout";
import { ScorpionSymbol } from "../components/citadelleSymbols";

export const Tools: ITool[] = [
  {
    name: "Beamsmasher Calculator",
    description: "Calculator for the Terminus Beamsmasher Easter Egg",
    color: "#EBD9BE",
    path: "/terminus",
    icon: (<Symbol2 />) as JSX.Element,
  },
  {
    name: "Raven Sword Puzzle Helper",
    description: "Puzzle helpers for the Citadelle Raven Sword Upgrade",
    color: "#3FF5FF",
    path: "/citadelle",
    icon: (<ScorpionSymbol />) as JSX.Element,
  },
];

export default function Index() {
  return (
    <>
      <Layout>
        <div className="flex text-2xl w-full font-bold justify-center text-center mb-8">
          <h1>Various Tools/Utilities for Black Ops 6 Zombies</h1>
        </div>

        <div className="grid xl:grid-cols-2 xl:grid-rows-1 xl:grid-flow-row overflow-scroll p-2 rounded-lg bg-neutral-300 dark:bg-neutral-800">
          {Tools.map((tool, index) => (
            <Tool key={index} tool={tool} />
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
    props: {},
  };
}
