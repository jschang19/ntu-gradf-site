import type { Program } from '~/types/program';
import CriteriaCard from './CriteriaCard';
import IconDocument from '~/components/icons/document';
import DocumentCriteriaCard from './DocumentCriteriaCard';
import ExamCriteriaCard from './ExamCriteriaCard';
import InterviewCriteriaCard from './InterviewCriteriaCard';

export default function CriteriaColumn({ program }: {program: Program}) {

  const formattedApplicationCriteria = program.application_criteria?.split('\n').map((line) => <span key={Math.random()}>{line}<br /></span>);

  return (
    <div className="flex-1 max-md:px-4">
      <div className="flex flex-col max-md:py-4">
        <CriteriaCard
          name="報名資格附加規定"
          icon={<IconDocument />}
          iconBackground="bg-[#464789]"
        >
          <p className="text-muted-foreground">{formattedApplicationCriteria ?? '原簡章無此項目'}</p>
        </CriteriaCard>
        <DocumentCriteriaCard
          applicationMaterials={program.application_materials}
          criteria={program.evaluation_criterias.materials}
        />
        <ExamCriteriaCard
          criteria={program.evaluation_criterias.exam}
        />
        <InterviewCriteriaCard
          criteria={program.evaluation_criterias.interview}
        />
        <CriteriaCard
          name="其他"
          icon={<IconDocument />}
          iconBackground="bg-[#464789]"
        >
          <ul className="list-disc list-inside text-base text-black/70">
            {program.evaluation_criterias.others.map((other) => (
              <li key={other}>{other}</li>
            ))}
          </ul>
        </CriteriaCard>
        <CriteriaCard
          name="歷屆錄取概況"
          icon={<IconDocument />}
          iconBackground="bg-[#464789]"
        >
          <div className="overflow-x-auto">
            {
              program.historical_data ? (
                <table className="w-full max-w-[350px]">
                  <thead>
                    <tr className="border-b hover:bg-[#f2f2f2]">
                      <th className="text-left py-2 px-3 font-medium text-sm">年度</th>
                      <th className="text-left py-2 px-3 font-medium text-sm">報名人數</th>
                      <th className="text-left py-2 px-3 font-medium text-sm">錄取數</th>
                      <th className="text-left py-2 px-3 font-medium text-sm">錄取率</th>
                      <th className="text-left py-2 px-3 font-medium text-sm">最低錄取分數</th>
                    </tr>
                  </thead>
                  <tbody>
                    {program.historical_data.map((data) => (
                      <tr key={data.year} className="border-b hover:bg-[#f2f2f2]">
                        <td className="py-2 px-3 text-sm">{data.year}</td>
                        <td className="py-2 px-3 text-sm">{data.application_num}</td>
                        <td className="py-2 px-3 text-sm">{data.admission_num}</td>
                        <td className="py-2 px-3 text-sm">{(data.recruiting_rate * 100).toFixed(1)}%</td>
                        <td className="py-2 px-3 text-sm">{data.baseline_score}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-muted-foreground py-2">尚未有歷屆錄取資料</p>
              )
            }
          </div>
        </CriteriaCard>
      </div>
    </div>
  );
}
