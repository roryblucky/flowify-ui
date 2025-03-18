import React from "react";
import { Drawer, Typography, Empty } from "antd";
import { Node } from "@xyflow/react";
import { Plugin } from "@/types/plugins";
import FunctionForm from "./forms/FunctionForm";

const { Title } = Typography;

export type FormData = {
  name?: string;
  description?: string;
  functionType?: string;
  [key: string]: unknown;
};

export type WorkflowDrawerProps = {
  open: boolean;
  onClose: () => void;
  selectedNode: Node | null;
  onFormChange?: (nodeId: string, formData: FormData) => void;
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
            node={selectedNode}
            onChange={(formData) => {
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
      mask={false}
      styles={{
        body: {
          paddingBottom: 80,
        },
      }}
      // No footer with buttons - form data is saved automatically
      footer={null}
    >
      {renderForm()}
    </Drawer>
  );
};

export default WorkflowDrawer;
