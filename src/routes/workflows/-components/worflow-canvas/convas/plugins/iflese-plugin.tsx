import { IfElsePluginProps } from "@/types/plugins";
import { Position, Handle, NodeProps } from "@xyflow/react";

export const IfElsePlugin: React.FC<NodeProps<IfElsePluginProps>> = ({
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
        id="target-handle"
        type="target"
        position={Position.Left}
        className="handle-style"
      />
      <Handle
        id="source-handle"
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
