import { Tooltip } from "antd";
import { MdInfoOutline } from "react-icons/md";

function Card({ title, content, foot, tooltip}) {
  return (
    <div className="flex flex-col justify-between bg-black px-5 text-white p-3 rounded-xl min-w-32 sm:min-w-10 gap-2 ">
      <div className="flex justify-between">
        <span className="text-sm text-trade-green">{title}</span>
        {tooltip && (
          <Tooltip title={tooltip}>
            <MdInfoOutline />
          </Tooltip>
        )}
      </div>
      <p className="text-md">{content}</p>
      {foot && <div className="text-sm self-end">{foot}</div>}
    </div>
  );
}

export default Card;
