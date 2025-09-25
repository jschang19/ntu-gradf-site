import type { Program } from '~/types/program';
import CriteriaCard from './CriteriaCard';
import DocumentCriteriaCard from './DocumentCriteriaCard';
import ExamCriteriaCard from './ExamCriteriaCard';
import InterviewCriteriaCard from './InterviewCriteriaCard';
import HistoricalDataTable from './HistoricalDataTable';
import IconInformation from '~/components/icons/information';
import IconGate from '~/components/icons/gate';
import IconPiechart from '~/components/icons/piechart';
import IconLink from '~/components/icons/link';

import { Link } from 'react-router';

export default function CriteriaColumn({ program }: {program: Program}) {

  const formattedApplicationCriteria = program.application_criteria?.split('\n').map((line) => <span key={Math.random()}>{line}<br /></span>);

  return (
    <div className="flex-1 max-md:px-4">
      <div className="flex flex-col max-md:py-4">
        <CriteriaCard
          name="報名資格附加規定"
          icon={<IconGate />}
          iconBackground="bg-[#464789]"
        >
          <p className="text-black/70">{formattedApplicationCriteria ?? '原簡章無此項目'}</p>
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
          icon={<IconInformation />}
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
          icon={<IconPiechart />}
          iconBackground="bg-[#464789]"
          className="px-0 max-w-2xl"
        >
          <div className="overflow-x-auto">
            <HistoricalDataTable historicalData={program.historical_data} />
          </div>
        </CriteriaCard>
        <CriteriaCard
          name="相關連結"
          icon={<IconLink />}
          iconBackground="bg-[#464789]"
        >
          <Link to="/programs" className="text-blue-600 underline select-all">查看所有系所</Link>
        </CriteriaCard>
      </div>
    </div>
  );
}
