interface InfoBlockProps {
  icon: React.ReactNode;
  title: string;
  content: string;
  isLink?: boolean;
}

export default function InfoBlock({ icon, title, content, isLink = false }: InfoBlockProps) {
  return (
    <li className="flex flex-col border-b md:last:border-0 md:border-0">
      <div className="group relative flex min-h-[52px] cursor-pointer items-center gap-4 px-4 py-2 break-anywhere hover:bg-black/3 focus-visible:bg-black/5 focus-visible:outline-hidden md:min-h-[42px] md:py-1.5 [&>svg]:shrink-0">
        <div className="shrink-0">{icon}</div>
        <div>
          <div className="mb-0.5 text-xs text-black/60">{title}</div>
          {isLink ? <a href={content} className="text-base text-blue-600 underline select-all">{content}</a> : <div className="text-base text-black/80 select-all">{content}</div>}
        </div>
      </div>
    </li>
  );
}
