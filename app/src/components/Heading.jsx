import { MdInfoOutline } from "react-icons/md";

function Heading({title, info}) {
  return (
    <div className="flex gap-1 mt-6 mb-2 items-center ">
        <h3 className="text-xl font-bold">{title}</h3>
        {/* <Tooltip> */}
        <MdInfoOutline />
        {/* </Tooltip> */}
      </div>
  )
}

export default Heading