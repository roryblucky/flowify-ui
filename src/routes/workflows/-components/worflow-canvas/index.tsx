import React from "react";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  BackgroundVariant,
  NodeTypes,
  EdgeTypes,
  ConnectionMode,
  MarkerType,
  Node,
  Edge,
} from "@xyflow/react";
import { Plugin } from "@/utils/constant";
import { FunctionPlugin } from "./convas/plugins/function-plugin";
import { WorkflowResponse } from "@/api/types";
import WorkflowDrawer from "../workflow-drawer";
import { LoopPlugin } from "./convas/plugins/loop-plugin";
import { StartPlugin } from "./convas/plugins/begin-plugin";
import { SwitchPlugin } from "./convas/plugins/switch-plugin";
import { ButtonEdge } from "./convas/edge";
import { useWorkflowState } from "./hooks/useWorkflowState";
import { useWorkflowConnections } from "./hooks/useWorkflowConnections";
import { useWorkflowDragDrop } from "./hooks/useWorkflowDragDrop";
import { useWorkflowForm } from "./hooks/useWorkflowForm";

// Node type mapping
const nodeTypes: NodeTypes = {
  [Plugin.FUNCTION]: FunctionPlugin,
  [Plugin.START]: StartPlugin,
  [Plugin.IF_ELSE]: SwitchPlugin,
  [Plugin.LOOP]: LoopPlugin,
} as const;

// Edge type mapping
const edgeTypes: EdgeTypes = {
  buttonEdge: ButtonEdge,
};

// Default edge options
const defaultEdgeOptions = {
  animated: true,
  markerEnd: {
    type: MarkerType.ArrowClosed,
  },
  type: "buttonEdge",
  style: {
    strokeWidth: 2,
  },
  zIndex: 1001,
};

export type WorkflowEditorProps = {
  workflowId: string;
  workflow?: WorkflowResponse;
  onWorkflowChange?: (nodes: Node[], edges: Edge[]) => void;
};

/**
 * WorkflowEditor Component
 * A visual editor for creating and editing workflows using React Flow
 */
const WorkflowEditor: React.FC<WorkflowEditorProps> = ({
  workflow,
  onWorkflowChange,
}) => {
  // Initialize workflow state
  const { nodes, edges, setNodes, setEdges, onNodesChange, onEdgesChange } =
    useWorkflowState({ workflow, onWorkflowChange });

  // Initialize connection handlers
  const { onConnect } = useWorkflowConnections({ setEdges });

  // Initialize drag and drop handlers
  const { onDragOver, onDrop } = useWorkflowDragDrop({ setNodes });

  // Initialize form handlers
  const {
    selectedNode,
    drawerOpen,
    onNodeClick,
    onDrawerClose,
    onNodeFormChange,
  } = useWorkflowForm({ setNodes });

  return (
    <>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDragOver={onDragOver}
        onDrop={onDrop}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
        connectionMode={ConnectionMode.Loose}
        defaultEdgeOptions={defaultEdgeOptions}
        deleteKeyCode={["Delete", "Backspace"]}
      >
        <Controls />
        <MiniMap />
        <Background variant={BackgroundVariant.Dots} className="bg-gray-100" />
      </ReactFlow>
      <WorkflowDrawer
        open={drawerOpen}
        onClose={onDrawerClose}
        selectedNode={selectedNode}
        onFormChange={onNodeFormChange}
      />
    </>
  );
};

export default WorkflowEditor;
