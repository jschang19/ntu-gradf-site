import { CommandGroup, CommandItem } from '~/components/ui/command';
import { Check } from 'lucide-react';
import { cn } from '~/lib/utils';
import { useMemo } from 'react';
import { departments } from '~/constants';

interface CollegeCommandGroupProps {
  value: string;
  onSelect: (value: string) => void;
}

const collegeMap = {
  '1': '文學院',
  '2': '理學院',
  '3': '社會科學院',
  '4': '醫學院',
  '5': '工學院',
  '6': '生物資源暨農學院',
  '7': '管理學院',
  '8': '公共衛生學院',
  '9': '電機資訊學院',
  'A': '法律學院',
  'B': '生命科學院',
  'C': '國際政經學院',
  'E': '進修推廣學院',
  'H': '共同教育中心',
  'I': '國際學院',
  'K': '重點科技研究學院',
};

export function CollegeCommandGroup({ value, onSelect }: CollegeCommandGroupProps) {
  // Memoize expensive computations
  const sortedColleges = useMemo(() => {
    // Group departments by college
    const departmentsByCollege = departments.reduce((acc, department) => {
      const college = department.college;
      if (!acc[college]) {
        acc[college] = [];
      }
      acc[college].push(department);
      return acc;
    }, {} as Record<string, typeof departments>);

    // Sort colleges by the order in collegeMap
    return Object.keys(departmentsByCollege)
      .sort((a, b) => {
        const aKey = Object.keys(collegeMap).find(key => collegeMap[key as keyof typeof collegeMap] === a);
        const bKey = Object.keys(collegeMap).find(key => collegeMap[key as keyof typeof collegeMap] === b);

        if (!aKey) return 1;
        if (!bKey) return -1;

        return aKey.localeCompare(bKey);
      })
      .map(college => ({
        name: college,
        departments: departmentsByCollege[college],
      }));
  }, []); // Empty dependency array since departments is static

  return (
    <>
      {sortedColleges.map((college) => (
        <CommandGroup key={college.name} heading={college.name}>
          {college.departments.map((department) => (
            <CommandItem
              key={department.code}
              value={`${department.code} ${department.name}`}
              onSelect={() => onSelect(department.code)}
              className="cursor-pointer justify-between items-center"
            >
              <div className="flex flex-col">
                <span className="font-medium">{department.name}</span>
                <span className="text-sm text-muted-foreground">{department.code}</span>
              </div>
              <Check
                className={cn(
                  'ml-2 h-4 w-4',
                  value === department.code ? 'opacity-100' : 'opacity-0',
                )}
              />
            </CommandItem>
          ))}
        </CommandGroup>
      ))}
    </>
  );
}
