import { ArrowLeftOutlined } from "@ant-design/icons";
import { Link } from "@tanstack/react-router";
import { Flex, Space, Button, message } from "antd";
import { WorkflowResponse } from "@/api/types";
import { useUpdateWorkflow } from "@/api/hooks/workflow";

type WorkflowHeaderProps = {
  workflow?: WorkflowResponse;
  isLoading?: boolean;
  onSave?: () => WorkflowResponse | null;
};

const WorkflowHeader: React.FC<WorkflowHeaderProps> = ({
  workflow,
  isLoading,
  onSave,
}) => {
  const updateWorkflow = useUpdateWorkflow();

  // Save workflow data
  const saveFlow = async () => {
    if (!workflow) {
      message.error("No workflow data to save");
      return;
    }

    try {
      // Get the updated workflow from onSave callback if available
      const workflowToSave = onSave ? onSave() || workflow : workflow;

      // Call the API to update the workflow
      await updateWorkflow.mutateAsync({
        id: workflowToSave.id,
        data: {
          name: workflowToSave.name,
          description: workflowToSave.description,
          nodes: workflowToSave.nodes,
          edges: workflowToSave.edges,
        },
      });

      message.success("Workflow saved successfully");

    } catch (error) {
      console.error("Failed to save workflow:", error);
      message.error("Failed to save workflow");
    }
  };

  // Run workflow
  const runFlow = () => {
    message.info("Running workflow...");
    // Implement workflow execution logic here
  };

  return (
    <Flex
      align="center"
      justify={"space-between"}
      gap={"large"}
      className="py-2.5 px-5"
    >
      <Space size={"large"}>
        <Link to={`/workflows`}>
          <ArrowLeftOutlined />
        </Link>
        <div className="flex flex-col">
          <span className="font-semibold text-[18px]">
            {isLoading ? "Loading..." : workflow?.name || "Untitled Workflow"}
          </span>
        </div>
      </Space>
      <Space size={"large"}>
        <Button onClick={() => runFlow()} disabled={isLoading}>
          <b>Run</b>
        </Button>
        <Button
          type="primary"
          onClick={saveFlow}
          disabled={isLoading || updateWorkflow.isPending}
          loading={updateWorkflow.isPending}
        >
          <b>Save</b>
        </Button>
      </Space>
    </Flex>
  );
};

export default WorkflowHeader;
