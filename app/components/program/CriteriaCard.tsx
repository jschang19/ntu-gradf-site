import { Card, CardHeader, CardTitle, CardContent } from '~/components/ui/card';

export default function CriteriaCard({ name, icon, iconBackground, children, disabled }: { name: string, icon: React.ReactNode, iconBackground: string, children?: React.ReactNode, disabled?: boolean }) {
  return (
    <Card className={`shadow-none rounded-md gap-4 py-4 ring-0 border-none px-0 ${disabled ? 'opacity-50' : ''}`}>
      <CardHeader className='px-0'>
        <CardTitle className='flex items-center gap-2 font-medium text-lg'>
          <span className={`size-7 rounded-sm ${iconBackground} flex items-center justify-center text-white hover:scale-110 transition-all duration-300`}>{icon}</span>
          {name}
        </CardTitle>
      </CardHeader>
      <CardContent className='pl-[2.25rem]'>
        {children}
      </CardContent>
    </Card>
  );
}
