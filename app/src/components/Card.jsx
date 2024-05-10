import { Tooltip } from "antd";
import { MdInfoOutline } from "react-icons/md";

function Card({ title, content, foot, tooltip }) {
  return (
    <div className="flex flex-col justify-between bg-black text-white p-3 rounded-xl min-w-32 sm:min-w-10 min-h-32">
      <div className="flex justify-between">
        <span className="text-sm">{title}</span>
        {tooltip && (
          <Tooltip title={tooltip}>
            <MdInfoOutline />
          </Tooltip>
        )}
      </div>
      <p className="text-2xl">{content}</p>
      <p className="text-md">{foot}</p>
    </div>
  );
}

export default Card;
