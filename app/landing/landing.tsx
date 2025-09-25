import { Popover, PopoverTrigger, PopoverContent } from '~/components/ui/popover';
import { Button } from '~/components/ui/button';
import { Command, CommandInput, CommandList, CommandEmpty } from '~/components/ui/command';
import { useState } from 'react';
import { useNavigate } from 'react-router';

import Timeline from '~/components/Timeline';
import IconH1 from '~/components/icons/h1';
import IconH2 from '~/components/icons/h2';
import IconComputer from '~/components/icons/computer';
import IconUpload from '~/components/icons/upload';
import IconPrinter from '~/components/icons/printer';
import { CollegeCommandGroup } from '~/components/CollegeCommandGroup';

import { departments } from '~/constants';

const departmentOptions = departments.map((department) => ({
  value: department.code,
  code: department.code,
  label: department.code + ' ' + department.name,
}));

export function Landing() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');

  const navigate = useNavigate();

  function onSearch(value: string | null) {
    if (!value) {
      setOpen(true);
    } else {
      navigate({
        pathname: `/programs/${value}`,
      });
    }
  }

  return (
    <main className="flex flex-col items-center justify-center pt-16 pb-4 w-full">
      <div className="px-6 pt-8 w-full">
        <h1 className="text-2xl font-bold tracking-wide text-center lg:text-4xl"><span className="text-xl lg:text-2xl">臺灣大學 115 學年</span><br />碩士班甄試招生簡章查詢</h1>
        <h2 className="text-center text-base lg:text-lg text-gray-500 mt-2 lg:mt-4">簡章、考試科目、錄取分數，為你整理</h2>
        { /* Search Program */}
        <div className="flex flex-col items-center w-full pt-6 pb-4lg:pt-14 lg:pb-8">
          <Popover open={open} onOpenChange={setOpen}>
            <div className="relative w-full max-w-xl flex items-center">
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={`w-full justify-start h-14 rounded-xl pr-14 border-[#EEDFE1] border ${value ? 'text-foreground' : 'text-muted-foreground'}`}
                >
                  <span className="truncate">
                    {value
                      ? departmentOptions.find((department) => ( department.value === value ))?.label
                      : '選擇系所'}
                  </span>
                </Button>
              </PopoverTrigger>
              <div className="h-px bg-border" />
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 -translate-y-1/2 size-10 p-0"
                onClick={() => onSearch(value)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
              </Button>
            </div>
            <PopoverContent className="max-w-[400px] p-0" align="start">
              <Command>
                <CommandInput placeholder="輸入系所代碼、名稱" className="h-10 text-base" autoFocus={false} tabIndex={-1} />
                <CommandList className="max-h-[400px]">
                  <CommandEmpty>沒有找到系所</CommandEmpty>
                  <CollegeCommandGroup
                    value={value}
                    onSelect={(selectedValue) => {
                      setValue(selectedValue === value ? '' : selectedValue);
                      setOpen(false);
                    }}
                  />
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <p className="text-center text-xs text-gray-400 mt-3">非校方網站，請依臺灣大學校方公告之資料為準</p>
        </div>
        <div className="mt-10 lg:mt-20 lg:px-32">
          <Timeline events={mockEvents} />
        </div>
      </div>
    </main>
  );
}

const mockEvents = [
  {
    id: '1',
    duration: '10/01 09:00 - 10/08 24:00',
    title: '線上報名與繳費',
    description: '繳交報名費 1000 元',
    icon: <IconComputer />,
  },
  {
    id: '2',
    title: '上傳應繳交資料',
    duration: '10/01 09:00 - 10/09 17:00',
    description: '紙本郵寄需於截止日 17:00 前送達',
    icon: <IconUpload />,
  },
  {
    id: '3',
    duration: '10/16 16:00 起',
    title: '開放准考證列印',
    description: '依系所規定攜至考場應試',
    icon: <IconPrinter />,
  },
  {
    id: '4',
    duration: '11/05 12:00 前',
    title: '第一梯放榜',
    description: '當日寄送成績單與報到文件',
    icon: <IconH1 />,
  },
  {
    id: '5',
    duration: '11/20 12:00 前',
    title: '第二梯放榜',
    description: '當日寄送成績單與報到文件',
    icon: <IconH2 />,
  },
];
