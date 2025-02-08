import { cn } from "@/lib/utils";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto ",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
}: {
  className?: string;
  title?: string | React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "row-span-1 rounded-xl group/bento p-4 dark:bg-transparent dark:border-[#262626] border-[#e5e5e5] bg-transparent border justify-between flex flex-col space-y-4",
        className
      )}
    >
      <div className="group-hover/bento:translate-x-2 transition duration-200">
        <div className="font-sans font-bold text-neutral-600 dark:text-neutral-200 mb-2 mt-2">
          {title}
        </div>
      </div>
    </div>
  );
};
