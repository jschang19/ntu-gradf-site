import CriteriaCard from './CriteriaCard';
import IconDocument from '~/components/icons/document';
import type { EvaluationCriterias } from '~/types/program';

export default function DocumentCriteriaCard({ applicationMaterials, criteria }: { applicationMaterials: string[], criteria: EvaluationCriterias['materials'] }) {
  return (
    <CriteriaCard
      name={`書面審查  ${criteria.percentage ? criteria.percentage * 100 + '%' : '未指定'}`}
      icon={<IconDocument />}
      iconBackground="bg-[#933244]"
      disabled={criteria.percentage === 0}
    >
      {
        criteria.percentage ? (
          <div className='flex flex-col gap-4'>
            <div>
              <h4 className='font-medium mb-2'>所需資料</h4>
              <ul className='list-disc list-inside text-base text-black/70'>
                {applicationMaterials.map((material) => (
                  <li key={material}>{material}</li>
                ))}
              </ul>
              {criteria.note && (
              <p className='text-base text-black/70 mt-2 bg-[#f3f3f3] rounded-md p-2'>{criteria.note}</p>
              )}
            </div>
            <div>
              <h4 className='font-medium mb-2'>審查方式</h4>
              <p className='text-base text-black/70'>{criteria.method}</p>
            </div>
          </div>
        ) : null
      }
    </CriteriaCard>
  );
}
