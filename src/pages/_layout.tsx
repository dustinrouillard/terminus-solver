import Head from "next/head";

import { PropsWithChildren } from "react";
import { Meta } from "../components/meta";

export interface Props extends PropsWithChildren {
  page_class?: string;
}

export default function Layout(props: Props) {
  return (
    <>
      <Head>
        <title>Terminus Calculator</title>

        <Meta />

        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>👋🏻</text></svg>"
        />
      </Head>

      <div className="flex flex-col items-center justify-center h-screen">
        <div
          className={`w-full py-5 md:py-10 px-3 md:px-36 ${props.page_class ?? ""}`}
        >
          {props.children}
        </div>
      </div>
    </>
  );
}
