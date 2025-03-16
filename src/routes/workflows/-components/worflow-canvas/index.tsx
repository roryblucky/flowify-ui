import React, { useCallback, useState, useEffect } from "react";
import { humanId } from "human-id";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  BackgroundVariant,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  NodeTypes,
  Edge,
  EdgeTypes,
  ConnectionMode,
  useReactFlow,
  Node,
  MarkerType,
} from "@xyflow/react";
import { Plugin, PluginMetadataMap } from "@/utils/constant";
import { FunctionPlugin } from "./convas/plugins/function-plugin";
import { WorkflowResponse } from "@/api/types";
import WorkflowDrawer from "../workflow-drawer";
import { LoopPlugin } from "./convas/plugins/loop-plugin";
import { StartPlugin } from "./convas/plugins/begin-plugin";
import { SwitchPlugin } from "./convas/plugins/switch-plugin";
import { ButtonEdge } from "./convas/edge";

export type WorkflowEditorProps = {
  workflowId: string;
  workflow?: WorkflowResponse;
};

// 节点类型映射
const nodeTypes: NodeTypes = {
  [Plugin.FUNCTION]: FunctionPlugin,
  [Plugin.START]: StartPlugin,
  [Plugin.IF_ELSE]: SwitchPlugin,
  [Plugin.LOOP]: LoopPlugin,
} as const;

// 边类型映射
const edgeTypes: EdgeTypes = {
  buttonEdge: ButtonEdge,
};

// 默认边配置
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

const WorkflowEditor: React.FC<WorkflowEditorProps> = ({
  workflow,
}) => {
  // 初始节点
  const initialNodes: Node[] = [
    {
      id: "-1",
      type: Plugin.START,
      position: { x: 250, y: 100 },
      data: {
        label: Plugin.START,
        icon: PluginMetadataMap[Plugin.START].icon,
      },
    },
  ];

  const initialEdges: Edge[] = [];

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const { screenToFlowPosition } = useReactFlow();

  useEffect(() => {
    if (workflow && workflow.id) {
      // TODO: loading workflow data
      console.log("loading workflow data:", workflow);
    }
  }, [workflow]);

  const onConnect = useCallback(
    (connection: Connection) => {
      setEdges((eds) => addEdge(connection, eds));
    },
    [setEdges]
  );

  const createNode = (type: Plugin, position: { x: number; y: number }) => {
    const newNode: Node = {
      id: humanId({ separator: "-", capitalize: false }),
      type,
      position,
      data: {
        label: type,
        icon: PluginMetadataMap[type].icon,
      },
    };

    return newNode;
  };

  // 处理拖拽结束
  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  // 处理放置
  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const type = event.dataTransfer.getData(
        "application/@xyflow/react"
      ) as Plugin;

      if (!type) {
        return;
      }

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode = createNode(type, position);
      setNodes((nds) => nds.concat(newNode));
    },
    [screenToFlowPosition, setNodes]
  );

  const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
    setDrawerOpen(true);
  }, []);

  const onDrawerClose = useCallback(() => {
    setDrawerOpen(false);
  }, []);

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
      />
    </>
  );
};

export default WorkflowEditor;
