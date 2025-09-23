import CriteriaCard from './CriteriaCard';
import IconDocument from '~/components/icons/document';
import type { EvaluationCriterias } from '~/types/program';

export default function DocumentCriteriaCard({ criteria }: { criteria: EvaluationCriterias['exam'] }) {
  return (
    <CriteriaCard
      name={`筆試  ${criteria.percentage ? criteria.percentage * 100 + '%' : '未指定'}`}
      icon={<IconDocument />}
      iconBackground="bg-[#933244]"
      disabled={criteria.percentage === 0}
    >
      {
      criteria.percentage ? (
        <div className='flex flex-col gap-4'>
          <div>
            <h4 className='font-medium mb-2'>參加資格</h4>
            <p className='text-base text-black/70'>{criteria.criteria}</p>
          </div>
          <div>
            <h4 className='font-medium mb-2'>筆試科目</h4>
            <p className='text-base text-black/70'>{criteria.subject}</p>
          </div>
          <div>
            <h4 className='font-medium mb-2'>筆試時間</h4>
            <p className='text-base text-black/70'>{criteria.duration?.startAt}
              {criteria.duration?.endAt && ` - ${criteria.duration?.endAt}`}
            </p>
          </div>
          <div>
            <h4 className='font-medium mb-2'>考試地點</h4>
            <p className='text-base text-black/70'>{criteria.place}</p>
          </div>
          <div>
            <h4 className='font-medium mb-2'>注意事項</h4>
            <p className='text-base text-black/70'>{criteria.notice}</p>
          </div>
        </div>
      ) : null
    }
    </CriteriaCard>
  );
}
