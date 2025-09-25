import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from 'react-router';

import type { Route } from './+types/root';
import './app.css';
import AppHeader from './components/Header';
import AppFooter from './components/Footer';

export const links: Route.LinksFunction = () => [
  { rel: 'preconnect', href: 'https://www.googletagmanager.com' },
  { rel: 'dns-prefetch', href: 'https://www.googletagmanager.com' },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-TW">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="og:site_name" content="國立臺灣大學碩士推甄簡章查詢網" />
        <meta name="og:image" content="https://gradf.prepeer.app/images/gradf.webp" />
        <meta name="og:url" content="https://gradf.prepeer.app" />
        <meta name="og:type" content="website" />
        <meta name="og:locale" content="zh-TW" />
        <Meta />
        <Links />
      </head>
      <body>
        <AppHeader />
        <div className="flex min-h-screen grow flex-col">
          {children}
        </div>
        <AppFooter />
        <script src="https://www.googletagmanager.com/gtag/js?id=G-XQLHHPR0H5" async />
        <script dangerouslySetInnerHTML={{ __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-XQLHHPR0H5');
        ` }}
        />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = 'Oops!';
  let details = 'An unexpected error occurred.';
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? '404' : 'Error';
    details =
      error.status === 404
        ? 'The requested page could not be found.'
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
