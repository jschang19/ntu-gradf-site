import { Link } from 'react-router';
import { IconMenu } from './icons/menu';
import { Popover, PopoverTrigger, PopoverContent } from './ui/popover';
import { Button } from '~/components/ui/button';
import { useLocation } from 'react-router';
import { useState } from 'react';

export default function Header() {
  const location = useLocation();
  const pathname = location.pathname;
  const [open, setOpen] = useState(false);

  const links = [
    {
      label: '首頁',
      to: '/',
    },
    {
      label: '官方簡章下載',
      external: true,
      to: 'https://exam.aca.ntu.edu.tw/graf/brochure/',
      href: 'https://exam.aca.ntu.edu.tw/graf/brochure/',
    },
    {
      label: '線上報名系統',
      external: true,
      to: 'https://exam.aca.ntu.edu.tw/graf/',
      href: 'https://exam.aca.ntu.edu.tw/graf/',
    },
  ];
  return (
    <header className="w-full h-14 bg-white/95 sticky top-0 z-50 backdrop-blur-sm flex-shrink-0 border-b">
      <div className="grid grid-cols-[1fr_auto_1fr] h-full items-center px-4 md:px-8 mx-auto">
        <div className="grid grid-cols-subgrid col-span-2">
          <div className="col-start-2 mx-auto">
            <Link to="/" className="font-medium text-lg">
              NTU 碩士甄試招生簡章
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-2 ml-auto">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="sm" className="p-2">
                <IconMenu />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-48" align="end">
              <div className="flex flex-col space-y-2">
                {links.map((link) => (
                  link.external ? (
                    <a href={link.href} target="_blank" rel="noopener noreferrer" className={`px-2 py-1 text-sm hover:bg-accent rounded ${pathname === link.to ? 'font-bold' : ''}`} key={link.label} onClick={() => setOpen(false)}>
                      {link.label}
                    </a>
                  ) : (
                    <Link to={link.to} className={`px-2 py-1 text-sm hover:bg-accent rounded ${pathname === link.to ? 'font-bold' : ''}`} key={link.label} onClick={() => setOpen(false)}>
                      {link.label}
                    </Link>
                  )
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </header>
  );
}
