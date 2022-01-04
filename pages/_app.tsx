import React from 'react';
import { AppProps } from 'next/app';

import { Refine } from '@pankod/refine';
import routerProvider from '@pankod/refine-nextjs-router';

import '@pankod/refine/dist/styles.min.css';
import dataProvider from 'src/middleware/dataProvider';

import {
  ReceiptList,
  ReceiptShow,
  ReceiptCreate,
  ReceiptEdit,
} from '@components';

const API_TOKEN = process.env.NEXT_PUBLIC_AIRTABLE_API_TOKEN as string;
const BASE_ID = process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID as string;

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <Refine
      routerProvider={routerProvider}
      dataProvider={dataProvider(API_TOKEN, BASE_ID)}
      resources={[
        {
          name: 'receipts',
          list: ReceiptList,
          create: ReceiptCreate,
          edit: ReceiptEdit,
          show: ReceiptShow,
          canDelete: true,
        },
      ]}
      warnWhenUnsavedChanges={true}
    >
      <Component {...pageProps} />
    </Refine>
  );
}

export default MyApp;
