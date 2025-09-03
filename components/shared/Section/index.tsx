interface SectionProps {
  children: React.ReactNode;
  title?: string;
  subTitle?: string;
  isWhite: boolean;
  hasTitle?: boolean;
}
export default function index({ children, subTitle, title, isWhite, hasTitle }: SectionProps) {
  return (
    <div className={`${isWhite ? "bg-white" : ""} py-[100px] grid gap-[50px]`}>
      {hasTitle && (
        <div className="flex flex-col items-center text-center gap-[20px] ">
          <h2 className="text48 text-center leading-[130%] tracking-[-1.44px]">
            {title}
          </h2>
          <h3 className="text20 text-center leading-[147%] tracking-[-0.6px] text-dark-gray px-4 xl:max-w-[30%]">{subTitle}</h3>
        </div>
      )}

      <div className="container">{children}</div>
    </div>
  );
}
