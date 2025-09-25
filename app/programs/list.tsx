import { useLoaderData } from 'react-router';
import type { LoaderArgs, LoaderData } from '../list/+types/list';
import { Link } from 'react-router';
import { Badge } from '~/components/ui/badge';
import { Button } from '~/components/ui/button';
import type { MetaFunction } from 'react-router';
import { createClient } from '~/lib/supabase/server';

export const meta: MetaFunction = () => {

  return [
    { title: '所有系所 - 115 學年度碩士甄試招生簡章查詢網（ 非官方 ）' },
    { name: 'description', content: '所有碩士系所簡章資訊 - 115 學年度碩士甄試招生簡章查詢網（ 非官方 ）' },
    { name: 'og:title', content: '所有系所 - 國立臺灣大學碩士甄試簡章查詢網' },
    { name: 'og:description', content: '彙整115學年度國立臺灣大學碩士甄試招生簡章與錄取分數資訊，供準備推甄的考生查詢' },
  ];
};

export const loader = async ({ request }: LoaderArgs): Promise<LoaderData> => {
  const url = new URL(request.url);
  const department = url.searchParams.get('department');

  const { supabase } = createClient(request);

  // Select only the required columns for the list page
  const { data: programs, error } = await supabase
    .from('programs')
    .select(`
      name:name,
      group:group,
      code,
      recruiting_num:recruiting_num,
      announce_batch:announce_batch,
      material_percentage:material_criterias->percentage,
      exam_percentage:exam_criterias->percentage,
      interview_percentage:interview_criterias->percentage`)
    .order('code', { ascending: true });

  if (error) {
    return {
      department,
      programs: [],
    };
  }

  // Transform the data to match the expected structure
  // Since we're using JSONB -> operator, the percentage values are returned directly
  const transformedPrograms = programs?.map(program => ({
    name: program.name,
    group: program.group,
    code: program.code,
    recruiting_num: program.recruiting_num,
    announce_batch: program.announce_batch,
    evaluation_criteria: {
      materials: {
        percentage: program.material_percentage ?? null,
      },
      exam: {
        percentage: program.exam_percentage ?? null,
      },
      interview: {
        percentage: program.interview_percentage ?? null,
      },
    },
  })) ?? [];

  return {
    department,
    programs: transformedPrograms,
  };
};

function formatPercentageString(percentage: number | null) {
  if (percentage === 0 || percentage === null) {
    return '--';
  }
  return (percentage * 100).toFixed(0) + '%';
}

export default function Search() {
  const { programs } = useLoaderData<typeof loader>();

  return (
    <div className="mt-8 max-w-2xl mx-auto mb-0.5 flex-col items-center size-full">
      <div className="flex flex-col">
        <h2 className="text-xl font-bold tracking-wide mb-3 px-2">系所查詢結果</h2>
        <div className="border py-2 px-4 rounded-t-md bg-[#933244] text-white/90">
          {programs.length} 個結果
        </div>
        {
        programs.length === 0 ? (
          <div className="w-full py-2 px-4 space-y-2 border-x-1 border-b-1 last:rounded-b-md">
            <p>沒有找到相關結果</p>
            <Link to="/"><Button className="bg-[#933244] text-white/90">重新查詢</Button></Link>
          </div>
        ) : (
          programs.map((program) => (
            <Link to={`/programs/${program.code}`} key={program.code} className="w-full py-2 px-4 space-y-2 border-x-1 border-b-1 last:rounded-b-md">
              <h2 className="text-base font-medium tracking-wide">{program.name} {program.group}</h2>
              <div className="flex flex-col md:flex-row gap-3 md:gap-0 justify-between">
                {/* desktop */}
                <div className="flex gap-6 max-md:hidden">
                  <div className="flex flex-col gap-1 text-sm text-muted-foreground">
                    <p>代碼</p>
                    <p>{program.code}</p>
                  </div>
                  <div className="flex flex-col gap-1 text-sm text-muted-foreground">
                    <p>招生名額</p>
                    <p>{program.recruiting_num}</p>
                  </div>
                  <div className="flex flex-col gap-1 text-sm text-muted-foreground">
                    <p>放榜</p>
                    <p>第 {program.announce_batch} 梯</p>
                  </div>
                </div>
                {/* mobile */}
                <div className="flex gap-2 md:hidden">
                  <Badge variant="secondary">{program.code}</Badge>
                  <Badge variant="secondary">{program.recruiting_num} 名</Badge>
                  <Badge variant="secondary">第 {program.announce_batch} 梯</Badge>
                </div>
                <div className="flex gap-6">
                  <div className="flex flex-col gap-1 text-sm text-muted-foreground">
                    <p>審查資料</p>
                    <p className="text-black font-bold">{formatPercentageString(program.evaluation_criteria.materials.percentage)}</p>
                  </div>
                  <div className="flex flex-col gap-1 text-sm text-muted-foreground">
                    <p>筆試</p>
                    <p className="text-black font-bold">{formatPercentageString(program.evaluation_criteria.exam.percentage)}</p>
                  </div>
                  <div className="flex flex-col gap-1 text-sm text-muted-foreground">
                    <p>口試</p>
                    <p className="text-black font-bold">{formatPercentageString(program.evaluation_criteria.interview.percentage)}</p>
                  </div>
                </div>
              </div>
            </Link>
          )))}
      </div>
    </div>
  );
}
