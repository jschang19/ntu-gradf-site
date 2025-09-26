import { Button } from '~/components/ui/button';
import IconArrowTopRightOnSquare from '~/components/icons/arrow-top-right-on-square';

export default function WebsiteLinkButton({ url, text }: { url: string, text?: string }) {
  return (
    <Button variant="outline" size="sm" asChild>
      <a 
        href={url} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="flex items-center gap-1 max-w-full"
        title={url}
      >
        <IconArrowTopRightOnSquare className="shrink-0" />
        <span className="truncate">
          {text ?? '打開系所網站'}
        </span>
      </a>
    </Button>
  );
}
