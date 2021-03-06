import Head from "next/head";

import { getCurrencyHistory } from "../helpers/currency-data";

import { Footer } from "../components/footer";
import { IndexForm } from "../components/index-form";
import { IndexInfo } from "../components/index-info";

export default function Home({ periodData, currentCurrency }) {
  return (
    <div>
      <Head>
        <title>Dollar$ | Cotação diária do dólar</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <main className="container">
        <IndexForm currentCurrency={currentCurrency} />
        <IndexInfo periodData={periodData} currentCurrency={currentCurrency} />
      </main>
      <Footer />
    </div>
  );
}

export async function getStaticProps() {
  const periodData = await getCurrencyHistory();
  const currentCurrency = periodData[periodData.length - 1];

  return {
    revalidate: 60 * 60,
    props: {
      currentCurrency,
      periodData,
    },
  };
}
