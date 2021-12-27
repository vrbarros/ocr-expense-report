export { NextRouteComponent as default } from '@pankod/refine-nextjs-router';
import dataProvider from '@pankod/refine-airtable';

import { GetServerSideProps } from 'next';

const API_TOKEN = process.env.NEXT_PUBLIC_AIRTABLE_API_TOKEN as string;
const BASE_ID = process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID as string;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context;

  try {
    const data = await dataProvider(API_TOKEN, BASE_ID).getList({
      resource: query['resource'] as string,
    });

    return {
      props: {
        initialData: data,
      },
    };
  } catch (error) {
    return { props: {} };
  }
};
