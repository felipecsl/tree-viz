import Head from "next/head";
import React, { createRef, useEffect, useRef } from "react";
import styles from "../styles/Home.module.css";
import { drawTree, makeTree } from "./treeNode";

export default function Home() {
  const root = makeTree();
  const canvas = createRef<HTMLCanvasElement>();
  useEffect(() => {
    if (canvas.current) {
      drawTree(canvas.current, root);
    }
  });
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Tree 🌴 visualization tool</h1>

        <div className={styles.grid}>
          <canvas
            id="area"
            width="800"
            height="600"
            className={styles.canvas}
            ref={canvas}
          />
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Built by <span className={styles.logo}>Felipe Lima</span>
        </a>
      </footer>
    </div>
  );
}