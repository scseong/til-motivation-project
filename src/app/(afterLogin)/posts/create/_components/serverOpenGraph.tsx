'use server';
import ogs from 'open-graph-scraper';

export async function fetchOpengraphData(url: string) {
  'use server';

  try {
    const options = { url };
    const { result } = await ogs(options);

    return result;
  } catch (error) {
    console.error('Error fetching OpenGraph data', error);
    return null;
  }
}
