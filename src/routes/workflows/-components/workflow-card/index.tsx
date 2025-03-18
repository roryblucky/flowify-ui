import React from "react";
import { WorkflowResponse } from "@/api/types";
import { Card, MenuProps, Modal, message } from "antd";
import OperateDropdown from "@/components/operate-dropdown";
import { useWorkflowDialog } from "../workflow-dialog/WorkflowDialogProvider";
import { useNavigate } from "@tanstack/react-router";
import { useDeleteWorkflow } from "@/api/hooks/workflow";

export const WorkflowCard: React.FC<{ workflow: WorkflowResponse }> = ({
  workflow,
}) => {
  const { openEditDialog } = useWorkflowDialog();
  const navigate = useNavigate();
  // Initialize the delete workflow mutation
  const deleteWorkflow = useDeleteWorkflow();

  const handleCardClick = () => {
    navigate({
      from: "/workflows",
      to: "/workflows/$workflowId",
      params: { workflowId: workflow.id },
    });
  };
  const getStatusClass = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-50 text-green-700 ring-green-600/20";
      case "draft":
        return "bg-yellow-50 text-yellow-700 ring-yellow-600/20";
      default:
        return "bg-gray-50 text-gray-700 ring-gray-600/20";
    }
  };
  const items: MenuProps["items"] = [
    {
      label: "Edit",
      key: "edit",
    },
    {
      label: "Remove",
      key: "remove",
    },
  ];

  /**
   * Handles menu item clicks
   * - edit: Opens the edit dialog
   * - remove: Shows confirmation dialog before deletion
   */
  const handleMenuClick: MenuProps["onClick"] = (e) => {
    e.domEvent.stopPropagation();
    if (e.key === "edit") {
      openEditDialog(workflow);
    } else if (e.key === "remove") {
      // Show confirmation dialog before deleting
      Modal.confirm({
        title: "Delete Workflow",
        content: `Are you sure you want to delete '${workflow.name}'? This action cannot be undone.`,
        okText: "Delete",
        okType: "danger",
        cancelText: "Cancel",
        onOk: async () => {
          try {
            // Call the delete mutation
            await deleteWorkflow.mutateAsync(workflow.id);
            message.success(`Workflow '${workflow.name}' has been deleted`);
          } catch (error: unknown) {
            // Handle error case with proper type checking
            const errorMessage =
              error instanceof Error ? error.message : "Unknown error occurred";
            message.error(`Failed to delete workflow: ${errorMessage}`);
          }
        },
      });
    }
  };

  return (
    <Card
      title={workflow.name}
      extra={<OperateDropdown items={items} onClick={handleMenuClick} />}
      className="cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="flex flex-col space-y-2">
        <div className="mt-1">
          <p className="text-sm text-gray-500 line-clamp-2 min-h-[3rem] leading-[1.5rem]">
            {workflow.description}
          </p>
        </div>

        <div className="flex items-center justify-between pt-4">
          <div className="text-sm text-gray-500">
            Updated {workflow.updatedAt}
          </div>

          <span
            className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${getStatusClass(
              workflow.status
            )}`}
          >
            {workflow.status}
          </span>
        </div>
      </div>
    </Card>
  );
};
