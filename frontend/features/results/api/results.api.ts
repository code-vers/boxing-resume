import { boxingApiInstance } from '@/features/rankings/api/axios.instance';
import {
  ApiFight,
  ApiFightResultsResponse,
  FightResultsData,
} from '@/features/results/types';

const RESULTS_PAGE_SIZE = 100;
const PAGE_FETCH_CONCURRENCY = 4;

const getResultsPage = async (
  page: number,
  dateSort: 'ASC' | 'DESC' = 'DESC',
): Promise<ApiFightResultsResponse> => {
  const { data } = await boxingApiInstance.get<ApiFightResultsResponse>('/fights', {
    params: {
      date_sort: dateSort,
      page_num: page,
      page_size: RESULTS_PAGE_SIZE,
    },
  });

  return data;
};

const fetchPagesWithLimit = async (pages: number[]): Promise<ApiFightResultsResponse[]> => {
  const responses: ApiFightResultsResponse[] = new Array(pages.length);
  let nextIndex = 0;

  const worker = async () => {
    while (nextIndex < pages.length) {
      const index = nextIndex++;
      responses[index] = await getResultsPage(pages[index]);
    }
  };

  await Promise.all(
    Array.from(
      { length: Math.min(PAGE_FETCH_CONCURRENCY, pages.length) },
      () => worker(),
    ),
  );

  return responses;
};

const normalizeFinishedResults = (fights: ApiFight[]): ApiFight[] => {
  const uniqueFights = new Map<string, ApiFight>();

  fights.forEach((fight) => {
    if (fight.id && fight.status === 'FINISHED' && fight.results) {
      uniqueFights.set(fight.id, fight);
    }
  });

  return Array.from(uniqueFights.values()).sort(
    (first, second) =>
      new Date(second.date).getTime() - new Date(first.date).getTime(),
  );
};

export const getAllFightResultsApi = async (): Promise<FightResultsData> => {
  const firstPage = await getResultsPage(1);
  const totalPages = Math.max(firstPage.pagination?.total_pages ?? 1, 1);
  const totalAvailable =
    firstPage.pagination?.total_items ?? firstPage.data?.length ?? 0;

  if (totalPages === 1) {
    return {
      results: normalizeFinishedResults(firstPage.data ?? []),
      totalAvailable,
    };
  }

  const secondPage = await getResultsPage(2);
  const firstFightId = firstPage.data?.[0]?.id;
  const secondFightId = secondPage.data?.[0]?.id;

  // Some sandbox subscriptions ignore page_num and return page one repeatedly.
  if (firstFightId && firstFightId === secondFightId) {
    const oldestPage = await getResultsPage(1, 'ASC');

    return {
      results: normalizeFinishedResults([
        ...(firstPage.data ?? []),
        ...(oldestPage.data ?? []),
      ]),
      totalAvailable: Math.max(
        firstPage.data?.length ?? 0,
        oldestPage.data?.length ?? 0,
      ),
    };
  }

  const remainingPages =
    totalPages > 2
      ? await fetchPagesWithLimit(
          Array.from({ length: totalPages - 2 }, (_, index) => index + 3),
        )
      : [];

  const allFights = [firstPage, secondPage, ...remainingPages].flatMap(
    (page) => page.data ?? [],
  );

  return {
    results: normalizeFinishedResults(allFights),
    totalAvailable,
  };
};
