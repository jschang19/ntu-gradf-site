import type { Route } from './+types/home';
import { Landing } from '../landing/landing';
import { BASE_TITLE } from '~/constants';

export function meta(_: Route.MetaArgs) {
  return [
    { title: `${BASE_TITLE}` },
    { name: 'description', content: '彙整 115 學年度碩士甄試招生簡章資訊，供準備推甄的考生查詢' },
  ];
}

export default function Home() {
  return <Landing />;
}
