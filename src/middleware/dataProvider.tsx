import { DataProvider } from '@pankod/refine';
import dataProvider from '@pankod/refine-airtable';

function newDataProvider(apiKey: string, baseId: string): DataProvider {
  const defaultDataProvider = dataProvider(apiKey, baseId);

  return {
    ...defaultDataProvider,
    // This approach is necessary to clean attachments value
    // once that is add uid field automatically by the form
    create: async ({ resource, variables }: any) => {
      if (variables.attachments) {
        variables.attachments = variables.attachments.map((item: any) => {
          const { uid, ...restVars } = item;
          return { ...restVars };
        });
      }
      return await defaultDataProvider.create({ resource, variables });
    },
  };
}

export default newDataProvider;
