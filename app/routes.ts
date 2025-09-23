import { type RouteConfig, index, route } from '@react-router/dev/routes';

const allRoutes = [
  index('./routes/home.tsx'),
  route('programs/:code', './programs/[code].tsx'),
  route('search', './search/search.tsx'),
  route('special-thanks', './special-thanks/special-thanks.tsx'),
];

export default allRoutes satisfies RouteConfig;
