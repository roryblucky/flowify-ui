import { useWorkflows } from "@/api/hooks/workflow";
import { WorkflowResponse } from "@/api/types";
import { WorkflowCard } from "@/routes/workflows/-components/workflow-card";
import {
  useWorkflowDialog,
  WorkflowDialogProvider,
} from "@/routes/workflows/-components/workflow-dialog/WorkflowDialogProvider";
import { PlusOutlined } from "@ant-design/icons";
import { createFileRoute } from "@tanstack/react-router";
import { Button, Col, Flex, Row, Spin, Typography } from "antd";

export const Route = createFileRoute("/workflows/")({
  component: RouteComponent,
});

const WorkflowList = () => {
  const { data: workflowList, isLoading } = useWorkflows();
  const { openCreateDialog } = useWorkflowDialog();
  return (
    <Flex vertical gap={"large"} flex={1} className="p-12">
      <Flex justify={"space-between"}>
        <Typography.Title level={3}>My Workflows</Typography.Title>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={openCreateDialog}
        >
          New Workflow
        </Button>
      </Flex>
      <Spin spinning={isLoading}>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} >
          <WorkflowDialogProvider>
            {workflowList?.workflows.map((workflow: WorkflowResponse) => (
              <Col key={workflow.id} className="gutter-row" span={6}>
                <div className="py-2">
                  <WorkflowCard workflow={workflow} />
                </div>
              </Col>
            ))}
          </WorkflowDialogProvider>
        </Row>
      </Spin>
    </Flex>
  );
};

function RouteComponent() {
  return (
    <WorkflowDialogProvider>
      <WorkflowList />
    </WorkflowDialogProvider>
  );
}
