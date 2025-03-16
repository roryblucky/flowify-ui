import React, { createContext, useContext, useState, ReactNode } from "react";
import { WorkflowDialog } from "./index";
import { WorkflowRequest, WorkflowResponse } from "@/api/types";
import { useCreateWorkflow, useUpdateWorkflow } from "@/api/hooks/workflow";

type DialogMode = "create" | "edit";

interface WorkflowDialogContextType {
  openCreateDialog: () => void;
  openEditDialog: (workflow: WorkflowResponse) => void;
  closeDialog: () => void;
}

const WorkflowDialogContext = createContext<
  WorkflowDialogContextType | undefined
>(undefined);

export const useWorkflowDialog = () => {
  const context = useContext(WorkflowDialogContext);
  if (!context) {
    throw new Error(
      "useWorkflowDialog must be used within a WorkflowDialogProvider"
    );
  }
  return context;
};

interface WorkflowDialogProviderProps {
  children: ReactNode;
}

export const WorkflowDialogProvider: React.FC<WorkflowDialogProviderProps> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<DialogMode>("create");
  const [selectedWorkflow, setSelectedWorkflow] =
    useState<WorkflowResponse | null>(null);

  const createWorkflow = useCreateWorkflow();
  const updateWorkflow = useUpdateWorkflow();

  const openCreateDialog = () => {
    setMode("create");
    setSelectedWorkflow(null);
    setIsOpen(true);
  };

  const openEditDialog = (workflow: WorkflowResponse) => {
    setMode("edit");
    setSelectedWorkflow(workflow);
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);

  };

  const handleSubmit = async (data: WorkflowRequest) => {
    try {

      if (mode === "create") {
        await createWorkflow.mutateAsync(data);
      } else if (selectedWorkflow) {
        const updateData: WorkflowRequest = {
          ...data,
        };

        await updateWorkflow.mutateAsync({
          id: selectedWorkflow.id,
          data: updateData,
        });
      }
      closeDialog();
    } catch (error) {
      console.error("failed to submit workflow:", error);
    }
  };

  return (
    <WorkflowDialogContext.Provider
      value={{
        openCreateDialog,
        openEditDialog,
        closeDialog,
      }}
    >
      {children}
      <WorkflowDialog
        isOpen={isOpen}
        onClose={closeDialog}
        onSubmit={handleSubmit}
        mode={mode}
        workflow={selectedWorkflow}
      />
    </WorkflowDialogContext.Provider>
  );
};
