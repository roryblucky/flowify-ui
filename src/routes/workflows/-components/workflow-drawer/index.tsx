import React, { useRef } from "react";
import { Drawer, Typography, Empty, FormInstance } from "antd";
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
  // 创建一个引用来存储当前表单实例
  const formRef = useRef<FormInstance | null>(null);

  // 处理抽屉关闭，先验证表单
  const handleClose = async () => {
    // 如果没有选中节点或没有表单实例，直接关闭
    if (!selectedNode || !formRef.current) {
      onClose();
      return;
    }

    try {
      // 验证表单
      await formRef.current.validateFields();
      // 验证通过，关闭抽屉
      onClose();
    } catch (error) {
      // 验证失败，不关闭抽屉
      console.error("表单验证失败:", error);
    }
  };

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
            formRef={formRef}
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
      onClose={handleClose}
      open={open}
      width={400}
      className="pb-20"
    >
      {renderForm()}
    </Drawer>
  );
};

export default WorkflowDrawer;
