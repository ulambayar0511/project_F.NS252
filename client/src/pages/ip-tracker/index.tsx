import dynamic from "next/dynamic";
import Head from "next/head";
import React from "react";

import { Card } from "@components";
import { Header } from "@components";
import { InputForm } from "@components";
import useAPI from "../../hooks/useAPI";

const MyMap = dynamic(() => import('../../components/Map'), { ssr: false });

const IpTracker: React.FC = () => {
  const { data, setIp } = useAPI();

  return (
    <>
      <Head>
        <title>IP Address Tracker</title>
        <meta name="description" content="IP Address Tracker" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header form={<InputForm submit={setIp} />} card={<Card {...data} />} />
        <MyMap
          coordinates={data.coordinates}
          ip={data.ip}
          address={data.location}
        />
      </main>
    </>
  );
};  

export default IpTracker;
