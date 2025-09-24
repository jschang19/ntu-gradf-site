import { type RouteConfig, index, route } from '@react-router/dev/routes';

const allRoutes = [
  index('./routes/home.tsx'),
  route('programs', './programs/list.tsx'),
  route('programs/:code', './programs/[code].tsx'),
  route('special-thanks', './special-thanks/special-thanks.tsx'),
];

export default allRoutes satisfies RouteConfig;
