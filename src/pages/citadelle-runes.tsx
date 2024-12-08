import { SVGProps, useCallback, useEffect, useMemo, useState } from "react";

import Layout from "./_layout";
import Link from "next/link";
import { Symbols } from "../components/runicSymbols";
import { QuestionMark } from "../components/questionMark";

interface Props {}

const options = 6;

const numerials = ["I", "II", "III", "IV", "V", "VI"];

export default function Index(props: Props) {
  const [selectedRunes, setSelectedRunes] = useState<number[]>(
    new Array(options),
  );

  const [overrideNextIndex, setOverrideNextIndex] = useState<number>();

  const firstEmpty = useMemo(
    () => selectedRunes.findIndex((item) => typeof item == "undefined"),
    [selectedRunes],
  );

  const currentIndex = useMemo(
    () => selectedRunes.findLastIndex((item) => typeof item == "number"),
    [selectedRunes],
  );

  const nextIndex = useMemo(
    () => overrideNextIndex ?? firstEmpty ?? currentIndex,
    [overrideNextIndex, firstEmpty, currentIndex],
  );

  useEffect(() => {
    console.log(selectedRunes, "runes");
  }, [selectedRunes]);

  const selectRune = useCallback(
    (rune: number) => {
      if (nextIndex == options) return;

      if (typeof selectedRunes.find((item) => item == rune) != "undefined") {
        const idx = selectedRunes.findIndex((item) => item == rune);
        selectedRunes[idx] = undefined;
      } else {
        selectedRunes[nextIndex] = rune;
      }

      if (typeof overrideNextIndex != "undefined")
        setOverrideNextIndex(undefined);
      setSelectedRunes([...selectedRunes]);
    },
    [selectedRunes, currentIndex, firstEmpty, nextIndex, overrideNextIndex],
  );

  return (
    <Layout
      page_class="flex justify-center"
      page_title="Citadelle Des Morts - Raven Puzzle"
    >
      <div className="font-bold space-y-6">
        <div>
          <h1 className="font-bold text-3xl text-center">
            Citadelle Des Morts
          </h1>
          <h2 className="text-xl text-center">Rune Wall Puzzle Helper</h2>
        </div>

        <div className="flex flex-col justify-center space-y-2">
          <div className="flex justify-between">
            <h2 className="text-xl text-center">Select your symbols</h2>

            <p
              className="text-xl text-center text-blue-400 hover:underline cursor-pointer select-none"
              onClick={() => setSelectedRunes(new Array(options))}
            >
              Reset
            </p>
          </div>

          <div className="flex justify-center rounded-md p-1 bg-neutral-800">
            <div className="grid grid-cols-5">
              {Symbols.map((Symbol, idx) => (
                <span
                  className={`w-32 h-32 p-5 rounded-md bg-neutral-700 m-1 hover:brightness-75 cursor-pointer relative ${
                    typeof selectedRunes?.find((item) => item == idx) !=
                    "undefined"
                      ? "brightness-75"
                      : ""
                  }`}
                  key={idx}
                  onClick={() => selectRune(idx)}
                >
                  <span className="text-blue-400">
                    <Symbol />
                  </span>
                  {typeof selectedRunes?.find((item) => item == idx) !=
                  "undefined" ? (
                    <p className="absolute right-1 top-1">
                      {
                        numerials[
                          selectedRunes.findIndex((item) => item == idx)
                        ]
                      }
                    </p>
                  ) : (
                    <></>
                  )}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-row rounded-md">
            {new Array(options).fill(1).map((opt, idx) => {
              let Selected = Symbols[selectedRunes[idx]];
              return (
                <span
                  key={idx}
                  className={`p-2 m-2 flex flex-col items-center rounded-md bg-neutral-800 ${nextIndex == idx ? "border border-green-400" : "border border-white/0"} cursor-pointer`}
                  onClick={() => setOverrideNextIndex(idx)}
                >
                  <span className="w-32 h-32">
                    {typeof selectedRunes[idx] != "undefined" ? (
                      <span className="text-blue-400">
                        <Selected />
                      </span>
                    ) : (
                      <QuestionMark />
                    )}
                  </span>

                  <p className="text-2xl">{numerials[idx]}</p>
                </span>
              );
            })}
          </div>
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
          <div className="flex flex-col md:text-right">
            <Link
              href="https://dstn.to/MTEFoBPI"
              target="_blank"
              className="underline text-blue-400"
            >
              Citadelle Des Morts Easter Egg Guide (MrRoflWaffles)
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
