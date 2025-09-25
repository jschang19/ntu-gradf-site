import type { Route } from './+types/[code]';
import InfoColumn from '~/components/program/InfoColumn';
import CriteriaColumn from '~/components/program/CriteriaColumn';
import { useLoaderData } from 'react-router';
import { createClient } from '~/lib/supabase/server';
import { Link } from 'react-router';
import type { Program, HistoricalData } from '~/types/program';
import { BASE_TITLE } from '~/constants';

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
      materials: (data.material_criterias as never) ?? { method: null, percentage: null, note: null },
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

  return [
    { title: `${loaderData.name}推甄簡章 - ${BASE_TITLE}` },
    { name: 'description', content: `115 學年度 ${loaderData.name} 的簡章資訊` },
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
      <div className="mt-8 w-custom mb-0.5 flex-col items-center space-y-1">
        <h2 className="text-2xl font-bold tracking-wide">{programData.name}</h2>
        {programData.group && <h3 className="text-muted-foreground">{programData.group}</h3>}
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
