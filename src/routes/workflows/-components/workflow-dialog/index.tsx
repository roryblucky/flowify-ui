import React, { useCallback, useEffect, useId } from "react";
import { Form, Input, Modal } from "antd";
import { WorkflowRequest, WorkflowResponse } from "@/api/types";

type WorkflowDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: WorkflowRequest) => void;
  mode: "create" | "edit";
  workflow?: WorkflowResponse | null;
};

export const WorkflowDialog: React.FC<WorkflowDialogProps> = ({
  isOpen,
  onClose,
  onSubmit,
  mode,
  workflow,
}) => {
  const formId = useId();
  const [form] = Form.useForm();
  const isEdit = mode === "edit";

  // 重置表单
  const resetForm = useCallback(() => {
    if (isEdit && workflow) {
      form.setFieldsValue({
        name: workflow.name,
        description: workflow.description,
      });
    } else {
      form.resetFields();
    }
  }, [form, isEdit, workflow]);


  useEffect(() => {
    if (workflow) {
      resetForm();
    }
  }, [workflow, resetForm]);

 
  useEffect(() => {
    if (isOpen) {
      resetForm();
    }
  }, [isOpen,resetForm]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      onSubmit(values);
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  return (
    <Modal
      open={isOpen}
      title={isEdit ? "Edit Workflow" : "New Workflow"}
      onOk={handleSubmit}
      onCancel={onClose}
      okText={isEdit ? "Update" : "Create"}
      cancelText="Cancel"
      destroyOnClose={false}
      afterClose={resetForm}
    >
      <Form
        form={form}
        layout="vertical"
        name={formId}
        preserve={false}
        initialValues={
          isEdit && workflow
            ? {
                name: workflow.name,
                description: workflow.description,
              }
            : undefined
        }
      >
        <Form.Item
          name="name"
          label="Workflow Name"
          rules={[
            { required: true, message: "Please input the Workflow Name!" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input.TextArea rows={4} />
        </Form.Item>
      </Form>
    </Modal>
  );
};
