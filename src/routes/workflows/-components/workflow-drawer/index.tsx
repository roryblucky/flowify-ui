import React from "react";
import { Drawer, Typography, Empty } from "antd";
import { Node } from "@xyflow/react";
import { Plugin } from "@/types/plugins";
import FunctionForm from "./forms/FunctionForm";
import { PluginFormData } from "@/types/plugin-form";
const { Title } = Typography;

export type WorkflowDrawerProps = {
  open: boolean;
  onClose: () => void;
  selectedNode: Node | null;
  onFormChange?: (nodeId: string, formData: PluginFormData) => void;
};

const WorkflowDrawer: React.FC<WorkflowDrawerProps> = ({
  open,
  onClose,
  selectedNode,
  onFormChange,
}) => {
  // Render form based on node type
  const renderForm = () => {
    if (!selectedNode) {
      return <Empty description="Please select a node" />;
    }

    // Get node type
    const nodeType = selectedNode.type as Plugin;

    // Render form based on node type
    switch (nodeType) {
      case Plugin.FUNCTION:
        return (
          <FunctionForm
            selectedNode={selectedNode}
            onValuesChange={(formData) => {
              if (onFormChange) {
                onFormChange(selectedNode.id, formData);
              }
            }}
          />
        );
      // Add more node types here
      default:
        return (
          <Empty
            description={`Configuration for ${nodeType} nodes is not supported yet`}
          />
        );
    }
  };

  return (
    <Drawer
      title={
        <Title level={4}>
          {selectedNode
            ? `Configure: ${selectedNode.data?.label || "Unnamed Node"}`
            : "Node Configuration"}
        </Title>
      }
      placement="right"
      onClose={onClose}
      open={open}
      width={400}
      className="pb-20"
    >
      {renderForm()}
    </Drawer>
  );
};

export default WorkflowDrawer;
