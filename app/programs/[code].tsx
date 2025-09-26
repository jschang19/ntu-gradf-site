import type { Route } from './+types/[code]';
import InfoColumn from '~/components/program/InfoColumn';
import CriteriaColumn from '~/components/program/CriteriaColumn';
import { useLoaderData } from 'react-router';
import { createClient } from '~/lib/supabase/server';
import { Link } from 'react-router';
import type { Program, HistoricalData } from '~/types/program';
import { BASE_TITLE } from '~/constants';
import formatProgramDisplayName from '~/lib/format-programe-display-name';
import generateEducationalProgramJsonLd from '~/lib/generate-json';

export const loader = async ({ request, params }: Route.LoaderArgs): Promise<Program> => {
  const { supabase } = createClient(request);
  const { data } = await supabase.from('programs').select('*').eq('code', params.code).maybeSingle();

  // If no data found, throw a 404 response
  if (!data || !data.name) {
    throw new Response(null, { status: 404, statusText: 'Not Found' });
  }

  return {
    name: data.name,
    group: data.group ?? null,
    code: data.code ?? '',
    identity: data.identity ?? '',
    recruiting_num: data.recruiting_num ?? 0,
    application_criteria: data.application_criteria ?? null,
    application_materials: data.application_materials ?? [],
    evaluation_criterias: {
      materials: (data.material_criterias as never) ?? { method: null, percentage: null, note: null, documentUrl: null },
      exam: (data.exam_criterias as never) ?? {
        criteria: null, method: null, subject: null, notice: null, percentage: null, duration: { startAt: '', endAt: null }, place: null,
      },
      interview: (data.interview_criterias as never) ?? {
        criteria: null, method: null, percentage: null, notice: null, duration: { startAt: '', endAt: null }, place: null,
      },
      others: (data.others as string[]) ?? [],
    },
    announce_batch: data.announce_batch ?? 1,
    phone: data.phone ?? '',
    website: data.website ?? '',
    historical_data: (data.historical_data as unknown as HistoricalData[]) ?? null,
  };
};

export const meta = ({ loaderData }: Route.MetaArgs) => {

  if (!loaderData) {
    return [
      { title: `無系所資料 - ${BASE_TITLE}` },
      { name: 'description', content: `無系所資料 - ${BASE_TITLE}` },
      { name: 'robots', content: 'noindex' },
    ];
  }

  const displayTitle = formatProgramDisplayName(loaderData.name, loaderData.group, loaderData.identity);

  return [
    { title: `${displayTitle}甄試簡章- ${BASE_TITLE}` },
    { name: 'description', content: `提供115年國立臺灣大學${displayTitle}甄試招生簡章資料、招生名額...等，並提供114年與113年篩選分數作推甄參考` },
    { name: 'og:title', content: `國立臺灣大學${displayTitle}甄試簡章` },
    { name: 'og:description', content: `彙整115學年度國立臺灣大學${displayTitle}甄試招生簡章與錄取分數資訊，供準備推甄的考生查詢` },
  ];
};

export function ErrorBoundary() {
  const notFoundTitle = '無系所資料';

  return (
    <>
      <title>{`${notFoundTitle} - ${BASE_TITLE}`}</title>
      <meta name="description" content={`${notFoundTitle} - ${BASE_TITLE}`} />
      <meta name="robots" content="noindex, nofollow" />

      <main className="pt-16 p-4 container mx-auto h-[calc(100dvh-16px)] flex flex-col items-center justify-center gap-4">
        <h1 className="text-xl font-bold tracking-wide">沒有此系所的資料</h1>
        <p className="text-sm text-muted-foreground">請確認系所代碼是否正確，或重新查詢</p>
        <Link to="/" className="text-sm text-muted-foreground hover:text-primary">回到首頁</Link>
      </main>
    </>
  );
}

export default function ProgramDetail() {
  const programData = useLoaderData<typeof loader>();

  return (
    <div>
      <script type="application/ld+json"
        dangerouslySetInnerHTML={
          { __html: JSON.stringify(generateEducationalProgramJsonLd(programData)) }}
      />
      <div className="mt-8 w-custom mb-0.5 flex-col items-center space-y-1">
        <h1 className="text-2xl font-bold tracking-wide">
          國立臺灣大學<br className="block lg:hidden" />
          {
            formatProgramDisplayName(programData.name, programData.group, programData.identity)
          }
          <br /><small>115 年甄試簡章</small>
        </h1>
      </div>
      <main className="mt-4 mb-12 grow md:px-6">
        <div className="flex flex-col border-y bg-white text-black md:flex-row md:border md:p-4 md:pl-2 md:shadow-sm md:rounded-sm gap-2">
          <InfoColumn program={programData} />
          <CriteriaColumn program={programData} />
        </div>
      </main>
    </div>
  );
}
