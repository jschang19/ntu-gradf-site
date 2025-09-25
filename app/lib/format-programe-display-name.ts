import { IDENTITY } from '~/constants';

export default function formatProgramDisplayName(name: string | null, group: string | null, identity: string | null) {
  // if all 3 are provided, return the name and group and identity
  if (group && identity) {
    if (identity !== IDENTITY.STUDENT) {
      return `${name}${group}（${identity}）`;
    }
    return `${name}${group}`;
  }

  if (!name) {
    return '無系所資料';
  }

  // if only name is provided, return the name
  return name;
}
