import { createFileRoute } from "@tanstack/react-router";
import { ReactFlowProvider } from "@xyflow/react";
import { Layout, Spin, Result, Button } from "antd";
import { Content } from "antd/es/layout/layout";
import { WorkflowSider } from "./-components/workflow-sider";
import { useState } from "react";
import WorkflowEditor from "./-components/worflow-canvas";
import WorkflowHeader from "./-components/workflow-header";
import { useWorkflow } from "@/api/hooks/workflow";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/workflows/$workflowId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { workflowId } = Route.useParams();
  const [collapsed, setCollapsed] = useState(false);
  const { data: workflow, isLoading, error } = useWorkflow(workflowId);

  if (isLoading) {
    return (
      <Spin spinning={true}>
        <div className="h-screen" />
      </Spin>
    );
  }

  if (error || !workflow) {
    return (
      <Result
        status="404"
        title="Workflow Not Found"
        subTitle="The workflow you are looking for may have been deleted or never existed"
        extra={
          <Link to="/workflows">
            <Button type="primary">Back to Workflow List</Button>
          </Link>
        }
      />
    );
  }

  return (
    <ReactFlowProvider>
      <Layout className="h-full">
        <WorkflowSider collapsed={collapsed} setCollapsed={setCollapsed} />
        <Layout className="h-full">
          <WorkflowHeader workflow={workflow} />
          <Content className="h-full overflow-hidden">
            <WorkflowEditor workflowId={workflowId} workflow={workflow} />
          </Content>
        </Layout>
      </Layout>
    </ReactFlowProvider>
  );
}
