import Head from "next/head";
import { SessionProvider } from "next-auth/client";
import { useState, useEffect } from "react";
import "../styles/globals.css";
import styles from "../styles/Layout.module.css";

function TransitionLayout({ children }) {
  const [displayChildren, setDisplayChildren] = useState(children);
  const [transitionStage, setTransitionStage] = useState("fadeOut");
  useEffect(() => {
    setTransitionStage("fadeIn");
  }, []);

  useEffect(() => {
    if (children !== displayChildren) setTransitionStage("fadeOut");
  }, [children, setDisplayChildren, displayChildren]);

  return (
    <div
      onTransitionEnd={() => {
        if (transitionStage === "fadeOut") {
          setDisplayChildren(children);
          setTransitionStage("fadeIn");
        }
      }}
      className={`${styles.content} ${styles[transitionStage]}`}
    >
      {displayChildren}
    </div>
  );
}

export default function App({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <Head>
        <title>connector.</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <TransitionLayout>
        <Component {...pageProps} />
      </TransitionLayout>
    </SessionProvider>
  );
}
