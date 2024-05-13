import { MdInfoOutline } from "react-icons/md";

function Card({ title, content, foot}) {
  return (
    <div className="flex flex-col justify-between bg-slate-800   px-5 text-white p-3 rounded-xl md:min-w-60 gap-2 ">
      <div className="flex justify-between">
        <span className="text-sm text-trade-green">{title}</span>
      </div>
      <p className="text-md">{content}</p>
      {foot && <div className="text-sm self-end text-fuchsia-400">{foot}</div>}
    </div>
  );
}

export default Card;
