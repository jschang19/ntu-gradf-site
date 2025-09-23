import type { Program } from '~/types/program';
import InfoBlock from './InfoBlock';
import IconInformation from '~/components/icons/information';
import IconPerson from '~/components/icons/person';
import IconPhone from '~/components/icons/phone';
import IconLink from '~/components/icons/link';
import IconGroup from '~/components/icons/group';
import IconMegaphone from '~/components/icons/megaphone';

export default function InfoColumn({ program }: { program: Program }) {
  return (
    <ul className="flex flex-col md:w-80 md:max-w-80 md:min-w-80">
      <InfoBlock icon={<IconInformation />} title="所組代碼" content={program.code} />
      <InfoBlock icon={<IconPerson />} title="身份別" content={program.identity} />
      <InfoBlock icon={<IconGroup />} title="招生名額" content={program.recruiting_num.toString()} />
      <InfoBlock icon={<IconMegaphone />} title="放榜梯次" content={`第 ${program.announce_batch.toString()} 梯`} />
      <InfoBlock icon={<IconPhone />} title="聯絡電話" content={program.phone} />
      <InfoBlock icon={<IconLink />} title="系所網站" content={program.website} isLink={true} />
    </ul>
  );
}
