import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '~/components/ui/accordion';

export default function CriteriaBlock({ name, criteria, list }: { name: string, criteria?: string, list?: string[] }) {
  return (
    <Accordion type="single" collapsible defaultValue={name}>
      <AccordionItem value={name}>
        <AccordionTrigger hiddenIcon={true} className='flex items-center hover:no-underline bg-[#f2f2f2] rounded-none px-4 py-2.5 md:py-1.5 min-h-[52px] md:min-h-[42px] font-normal text-base'>{name}</AccordionTrigger>
        <AccordionContent className='text-black/70'>
          <div className='px-4 py-2.5 text-base'>{list ? <ul className='list-disc list-inside'>{list?.map((item) => <li key={item}>{item}</li>)}</ul> : criteria}</div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
