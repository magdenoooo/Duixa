interface ICardProps {
  icon: any;
  title: string;
  description: string;
  isBordered?: boolean;
}
export default function index({ icon, title, description,isBordered }: ICardProps) {
  return (
    <div className={` ${isBordered && "border border-border"} p-[30px] bg-white rounded-[15px] flex flex-col gap-[30px] items-start self-stretch`}>
      <div className="bg-gradient-to-br from-[#f1f3f8] via-white to-white p-[24px] rounded-[15px] border border-border flex justify-center items-center">
        {/* <Gear className="size-[40px]" /> */}
        {icon}
      </div>
      <div className="grid gap-[20px]">
        <h3 className="text-[24px] leading-[150%] tracking-[-0.144px] text-start"> {title} </h3>
        {/* text18 */}
        <p className="text18 text-dark-gray leading-[150%] tracking-[-0.108px] text-start">{description}</p>
      </div>
    </div>
  );
}
