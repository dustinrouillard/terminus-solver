import PlausibleProvider from "next-plausible";

import "../assets/app.css";

export default function App({ Component, pageProps }) {
  return (
    <PlausibleProvider
      domain="bo6.dstn.to"
      enabled={
        typeof window != "undefined" &&
        window.location.hostname == "bo6.dstn.to"
      }
      selfHosted
    >
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Roboto+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&family=Noto+Color+Emoji&family=Coda&display=swap"
        rel="stylesheet"
      />

      <Component {...pageProps} />
    </PlausibleProvider>
  );
}
