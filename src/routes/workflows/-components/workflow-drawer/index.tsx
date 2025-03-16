import React from "react";
import { Drawer, Typography, Empty } from "antd";
import { Node } from "@xyflow/react";
import { Plugin } from "@/utils/constant";
import FunctionForm from "./forms/FunctionForm";

const { Title } = Typography;

export type WorkflowDrawerProps = {
  open: boolean;
  onClose: () => void;
  selectedNode: Node | null;
};

const WorkflowDrawer: React.FC<WorkflowDrawerProps> = ({
  open,
  onClose,
  selectedNode,
}) => {
  // 根据节点类型渲染不同的表单组件
  const renderForm = () => {
    if (!selectedNode) {
      return <Empty description="请选择一个节点" />;
    }

    // 从节点数据中获取类型
    const nodeType = selectedNode.type as Plugin;

    // 根据节点类型渲染对应的表单
    switch (nodeType) {
      case Plugin.FUNCTION:
        return <FunctionForm node={selectedNode} />;
      // 可以添加更多节点类型的表单
      default:
        return <Empty description={`暂不支持 ${nodeType} 类型节点的配置`} />;
    }
  };

  return (
    <Drawer
      title={
        <Title level={4}>
          {selectedNode
            ? `配置: ${selectedNode.data?.label || "未命名节点"}`
            : "节点配置"}
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
    >
      {renderForm()}
    </Drawer>
  );
};

export default WorkflowDrawer;
