import type { Route } from './+types/home';
import { Landing } from '../landing/landing';
import { BASE_TITLE } from '~/constants';

export function meta(_: Route.MetaArgs) {
  return [
    { title: `${BASE_TITLE}` },
    { name: 'description', content: '彙整 115 學年度碩士甄試招生簡章資訊，供準備推甄的考生查詢' },
    { name: 'og:title', content: '國立臺灣大學碩士甄試簡章查詢網' },
    { name: 'og:description', content: '彙整115學年度國立臺灣大學碩士甄試招生簡章與錄取分數資訊，供準備推甄的考生查詢' },
  ];
}

export default function Home() {
  return <Landing />;
}
