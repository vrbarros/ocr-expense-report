import React from "react";
import { AppProps } from "next/app";

import { Refine } from "@pankod/refine";
import routerProvider from "@pankod/refine-nextjs-router";

import "@pankod/refine/dist/styles.min.css";
import dataProvider from "@pankod/refine-airtable";

const API_TOKEN = "your-airtable-api-token";
const BASE_ID = "your-airtable-base-id";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <Refine
      routerProvider={routerProvider}
      dataProvider={dataProvider(API_TOKEN, BASE_ID)}
    >
      <Component {...pageProps} />
    </Refine>
  );
}

export default MyApp;
