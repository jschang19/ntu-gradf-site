import type { Program } from '~/types/program';
import InfoBlock from './InfoBlock';
import IconHashtag from '~/components/icons/hashtag';
import IconPerson from '~/components/icons/person';
import IconPhone from '~/components/icons/phone';
import IconLink from '~/components/icons/link';
import IconGroup from '~/components/icons/group';
import IconMegaphone from '~/components/icons/megaphone';
import IconUserPlus from '~/components/icons/userplus';

import { ANNOUNCE_TIME } from '~/constants';

function getAnnounceTime(announceBatch: number) {
  return ANNOUNCE_TIME[announceBatch as keyof typeof ANNOUNCE_TIME] || '';
}

export default function InfoColumn({ program }: { program: Program }) {
  return (
    <ul className="flex flex-col md:w-80 md:max-w-80 md:min-w-80">
      <InfoBlock icon={<IconHashtag />} title="所組代碼" content={program.code} />
      <InfoBlock icon={<IconPerson />} title="身份別" content={program.identity} />
      <InfoBlock icon={<IconGroup />} title="招生名額" content={program.recruiting_num.toString()} />
      <InfoBlock icon={<IconMegaphone />} title="放榜時間" content={`${getAnnounceTime(program.announce_batch)}（第 ${program.announce_batch.toString()} 梯）`} />
      <InfoBlock icon={<IconUserPlus />} title="線上報到時間" content="11/25 早上 10 點至 11/27 晚上 12 點" />
      <InfoBlock icon={<IconPhone />} title="聯絡電話" content={program.phone} />
      <InfoBlock icon={<IconLink />} title="系所網站" content={program.website} isLink={true} />
    </ul>
  );
}
