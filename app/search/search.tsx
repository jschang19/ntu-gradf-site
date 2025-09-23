import { useLoaderData } from 'react-router';
import type { Route } from './+types/search';
import { Link } from 'react-router';
import { Badge } from '~/components/ui/badge';
import { Button } from '~/components/ui/button';
import type { MetaFunction } from 'react-router';

export const meta: MetaFunction = () => {

  return [
    { title: '系所查詢結果' },
    { name: 'description', content: '系所查詢結果' },
  ];
};

export const loader = async ({ request }: Route.LoaderArgs) => {
  const url = new URL(request.url);
  const department = url.searchParams.get('department');

  // Here you would typically fetch data based on the department
  // For now, using example data
  const exampleData = [
    {
      name: '圖書資訊學系碩士班',
      group: '甲組',
      code: '1070',
      recruiting_num: 6,
      evaluation_criteria: {
        materials: {
          percentage: 0.4,
        },
        exam: {
          percentage: 0.2,
        },
        interview: {
          percentage: 0.4,
        },
      },
      announce_batch: 1,
    },
    {
      name: '圖書資訊學系碩士班',
      group: '乙組',
      code: '1071',
      recruiting_num: 6,
      evaluation_criteria: {
        materials: {
          percentage: 0.4,
        },
        exam: {
          percentage: 0.2,
        },
        interview: {
          percentage: 0.4,
        },
      },
      announce_batch: 2,
    },
  ];

  return {
    department,
    programs: exampleData,
  };
};

function formatPercentageString(percentage: number | null) {
  if (percentage === null) {
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
