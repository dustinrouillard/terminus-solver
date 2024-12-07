import { useCallback, useEffect, useMemo, useState } from "react";

import Layout from "./_layout";
import {
  Symbol1,
  Symbol2,
  Symbol3,
  Symbol4,
  Symbol5,
  Symbol6,
} from "../components/terminusSymbols";
import Link from "next/link";

interface Props {}

const values = ["X", "Y", "Z"];
const symbols = [
  { component: Symbol1, value: 0 },
  { component: Symbol2, value: 10 },
  { component: Symbol3, value: 11 },
  { component: Symbol4, value: 20 },
  { component: Symbol5, value: 21 },
  { component: Symbol6, value: 22 },
];

export default function Index(props: Props) {
  const [numbers, setNumbers] = useState<number[]>([0, 0, 0]);
  const [selections, setSelections] = useState<number[]>([]);

  const setSelection = useCallback(
    async (index: number, selected: number) => {
      setSelections((curr) => {
        curr[index] = curr[index] == selected ? undefined : selected;
        return [...curr];
      });
    },
    [selections],
  );

  useEffect(() => {
    if (selections.filter((c) => typeof c != "undefined").length != 3)
      setNumbers([]);
    else
      setNumbers(
        selections.map((val, i) =>
          i == 0
            ? symbols[selections[0]].value * 2 + 11
            : i == 1
              ? symbols[selections[2]].value * 2 +
                symbols[selections[1]].value -
                5
              : i == 2
                ? symbols[selections[2]].value +
                  symbols[selections[1]].value -
                  symbols[selections[0]].value
                : 0,
        ),
      );
  }, [selections]);

  return (
    <Layout page_class="flex justify-center">
      <div className="font-bold space-y-6">
        <div>
          <h1 className="font-bold text-3xl text-center">
            Terminus Equation Calculator
          </h1>
          <h2 className="text-xl text-center">
            for the free beamsmasher step of the easter egg
          </h2>
        </div>

        <div className="flex flex-col justify-center space-y-2">
          <h2 className="text-xl text-center">Calculated Code</h2>

          <div className="flex flex-row space-x-3 justify-center">
            <span className="text-6xl bg-neutral-800 rounded-lg p-4">
              {Math.abs(numbers?.[0] ?? 0)
                .toString()
                .padStart(2, "0")}
            </span>
            <span className="text-6xl bg-neutral-800 rounded-lg p-4">
              {Math.abs(numbers?.[1] ?? 0)
                .toString()
                .padStart(2, "0")}
            </span>
            <span className="text-6xl bg-neutral-800 rounded-lg p-4">
              {Math.abs(numbers?.[2] ?? 0)
                .toString()
                .padStart(2, "0")}
            </span>
          </div>
        </div>

        <div className="flex flex-col space-y-2 items-center md:max-w-4xl">
          <h2 className="text-xl text-center">
            Select the symbols for X, Y, & Z
          </h2>

          {values.map((value, codeIndex) => (
            <span className="flex p-4 rounded-lg items-center bg-neutral-800 space-x-2">
              <p className="font-bold text-3xl">{value}:</p>
              {symbols.map((symbol, index) => (
                <symbol.component
                  className={`transition-all bg-neutral-700 rounded-md cursor-pointer hover:brightness-75 ${selections[codeIndex] == index ? "box-border border-4 border-green-500 brightness-75" : "border-2 border-white/40"}`}
                  onClick={() => {
                    setSelection(codeIndex, index);
                  }}
                />
              ))}
            </span>
          ))}
        </div>

        <div className="flex flex-col md:flex-row justify-between space-y-4 md:space-y-0">
          <div className="flex flex-col md:text-left">
            <p>Math is simple, but code is life.</p>

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
          <div className="flex flex-col md:text-right">
            <Link
              href="https://dstn.to/VqvH5B0a"
              target="_blank"
              className="underline text-blue-400"
            >
              Terminus Easter Egg Guide (NoahJ456)
            </Link>
            <Link
              href="https://dstn.to/ur1zBgZw"
              target="_blank"
              className="underline text-blue-400"
            >
              Beamsmasher Guide (MrRoflWaffles)
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
