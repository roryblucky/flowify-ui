
import { CloseOutlined } from "@ant-design/icons";
import {
  BaseEdge,
  EdgeLabelRenderer,
  EdgeProps,
  getBezierPath,
} from "@xyflow/react";
import { useMemo } from "react";

export const ButtonEdge: React.FC<EdgeProps> = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
  selected,
}) => {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const selectedStyle = useMemo(() => {
    return selected ? { strokeWidth: 2, stroke: "#1677ff" } : {};
  }, [selected]);

  const onEdgeClick = () => {
    console.log("edge clicked", id);
  };

  return (
    <>
      <BaseEdge
        path={edgePath}
        markerEnd={markerEnd}
        style={{ ...style, ...selectedStyle }}
      />
      <EdgeLabelRenderer>
        <div
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            fontSize: 10,
            pointerEvents: "all",
            zIndex: 1001,
          }}
          className="nodrag"
        >
          <button
            className="cursor-pointer rounded-full bg-red-400 hover:bg-red-600"
            type="button"
            onClick={onEdgeClick}
          >
            <CloseOutlined className="w-2 h-2 text-white" />
          </button>
        </div>
      </EdgeLabelRenderer>
    </>
  );
};
