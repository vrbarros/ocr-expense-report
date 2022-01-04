import React from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';

import { Refine } from '@pankod/refine';
import routerProvider from '@pankod/refine-nextjs-router';

import dataProvider from 'src/middleware/dataProvider';

import {
  ReceiptList,
  ReceiptShow,
  ReceiptCreate,
  ReceiptEdit,
} from '@components';
import { CopyOutlined } from '@ant-design/icons';

require('antd/dist/antd.less');

const API_TOKEN = process.env.NEXT_PUBLIC_AIRTABLE_API_TOKEN as string;
const BASE_ID = process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID as string;

const { Link } = routerProvider;

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <Refine
      routerProvider={routerProvider}
      dataProvider={dataProvider(API_TOKEN, BASE_ID)}
      Title={({ collapsed }) => (
        <Link to="/" href="/">
          {collapsed ? (
            <img
              src="/logo.png"
              alt="Refine"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                padding: '12px 24px',
              }}
            />
          ) : (
            <img
              src="/logo.png"
              alt="Refine"
              style={{
                width: '100%',
                padding: '12px 24px',
              }}
            />
          )}
        </Link>
      )}
      resources={[
        {
          icon: <CopyOutlined />,
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
      <Head>
        <title>OCR Expense Report</title>
        <link rel="icon" type="image/png" href="/logo.png" />
      </Head>
      <Component {...pageProps} />
    </Refine>
  );
}

export default MyApp;
