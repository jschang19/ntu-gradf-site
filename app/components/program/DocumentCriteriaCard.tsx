import CriteriaCard from './CriteriaCard';
import IconDocument from '~/components/icons/document';
import type { EvaluationCriterias } from '~/types/program';
import WebsiteLinkButton from './WebsiteLinkButton';

export default function DocumentCriteriaCard({ applicationMaterials, criteria, url }: { applicationMaterials: string[], criteria: EvaluationCriterias['materials'], url: string | null }) {

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
              {url && (
                <div className='mt-2'>
                  <WebsiteLinkButton url={url} text="下載相關文件" />
                </div>
              )}
              {criteria.note && (
              <p className='text-base text-black/70 bg-[#f3f3f3] rounded-md p-2 mt-4'>{criteria.note}</p>
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
