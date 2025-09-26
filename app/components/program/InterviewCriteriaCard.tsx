import CriteriaCard from './CriteriaCard';
import IconChat from '~/components/icons/chat';
import WebsiteLinkButton from './WebsiteLinkButton';
import type { EvaluationCriterias } from '~/types/program';
import { MENTIONED_SITE_KEYWORDS } from '~/constants';

export default function InterviewCriteriaCard({ criteria, url }: { criteria: EvaluationCriterias['interview'], url: string | null }) {

  const hasMentionedWebsite = url && MENTIONED_SITE_KEYWORDS.WEBSITE.some((keyword) => criteria.notice?.includes(keyword));

  return (
    <CriteriaCard
      name={`口試  ${criteria.percentage ? criteria.percentage * 100 + '%' : '未指定'}`}
      icon={<IconChat />}
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
            <h4 className='font-medium mb-2'>口試時間</h4>
            <p className='text-base text-black/70'>{criteria.duration?.startAt}
              {criteria.duration?.endAt && ` - ${criteria.duration?.endAt}`}
            </p>
          </div>
          <div>
            <h4 className='font-medium mb-2'>口試地點</h4>
            <p className='text-base text-black/70'>{criteria.place}</p>
          </div>
          <div>
            <h4 className='font-medium mb-2'>注意事項</h4>
            <p className='text-base text-black/70'>{criteria.notice ?? '原簡章無此項目'}</p>
          </div>
          {url && hasMentionedWebsite && (
            <div>
              <WebsiteLinkButton url={url} />
            </div>)}
        </div>
      ) : null
    }
    </CriteriaCard>
  );
}
