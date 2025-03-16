import { FunctionPluginProps } from "../../types";
import { Position, Handle, NodeProps } from "@xyflow/react";

export const FunctionPlugin: React.FC<NodeProps<FunctionPluginProps>> = ({
  data,
  selected,
}) => {
  return (
    <div
      className={`
        flex items-center gap-2 rounded-xl bg-white p-2 w-40 justify-center
        ${selected ? "border-1 border-blue-500 shadow-lg" : "border border-gray-200"}
      `}
    >
      <Handle
        id="s"
        type="target"
        position={Position.Left}
        className="handle-style"
      />
      <Handle
        id="t"
        type="source"
        position={Position.Right}
        className="handle-style"
      />
      <div className="flex items-center gap-2">
        {data.icon}
        <div>{data.label}</div>
      </div>
    </div>
  );
};
