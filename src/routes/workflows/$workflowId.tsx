import { createFileRoute } from "@tanstack/react-router";
import { ReactFlowProvider } from "@xyflow/react";
import { Layout, Spin, Result, Button } from "antd";
import { Content } from "antd/es/layout/layout";
import { WorkflowSider } from "./-components/workflow-sider";
import { useState, useCallback, useRef } from "react";
import WorkflowEditor from "./-components/worflow-canvas";
import WorkflowHeader from "./-components/workflow-header";
import { useWorkflow } from "@/api/hooks/workflow";
import { Link } from "@tanstack/react-router";
import { Node, Edge } from "@xyflow/react";

export const Route = createFileRoute("/workflows/$workflowId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { workflowId } = Route.useParams();
  const [collapsed, setCollapsed] = useState(false);
  const { data: workflow, isLoading, error } = useWorkflow(workflowId);

  // Use refs to store current nodes and edges to avoid re-renders
  const nodesRef = useRef<Node[]>([]);
  const edgesRef = useRef<Edge[]>([]);

  // Handle workflow changes from the editor
  const handleWorkflowChange = useCallback((nodes: Node[], edges: Edge[]) => {
    // Store in refs instead of state to avoid re-renders
    nodesRef.current = nodes;
    edgesRef.current = edges;
  }, []);

  // Handle save action from the header
  const handleSave = useCallback(() => {
    // Create updated workflow with current nodes and edges from refs
    if (workflow) {
      const updatedWorkflow = {
        ...workflow,
        nodes: nodesRef.current.length > 0 ? nodesRef.current : workflow.nodes,
        edges: edgesRef.current.length > 0 ? edgesRef.current : workflow.edges,
      };

      // Pass the updated workflow to the header component
      return updatedWorkflow;
    }
    return null;
  }, [workflow]);

  // If loading, show loading state
  if (isLoading) {
    return (
      <Spin spinning={true}>
        <div className="h-screen" />
      </Spin>
    );
  }

  // If error or workflow doesn't exist, show error page
  if (error || !workflow) {
    return (
      <Result
        status="404"
        title="Workflow not found"
        subTitle="The workflow you're looking for doesn't exist or has been deleted"
        extra={
          <Link to="/workflows">
            <Button type="primary">Back to Workflows</Button>
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
          <WorkflowHeader
            workflow={workflow}
            onSave={handleSave}
          />
          <Content className="h-full overflow-hidden">
            <WorkflowEditor
              workflowId={workflowId}
              workflow={workflow}
              onWorkflowChange={handleWorkflowChange}
            />
          </Content>
        </Layout>
      </Layout>
    </ReactFlowProvider>
  );
}
