import { NmapPortScanner } from "@components";
import Head from "next/head";

export default function HomeRouter() {
  return (
    <>
      <Head>
        <title>NMAP port scanner</title>
        <meta name="description" content="NMAP port scanner" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NmapPortScanner />
    </>
  );
}
