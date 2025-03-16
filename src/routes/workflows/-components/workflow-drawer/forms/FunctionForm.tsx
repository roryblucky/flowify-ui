import React, { useEffect } from "react";
import { Form, Input, Select } from "antd";
import { Node } from "@xyflow/react";
import { FormData } from "..";

export interface FunctionFormProps {
  node: Node;
  onChange?: (formData: FormData) => void;
}

const FunctionForm: React.FC<FunctionFormProps> = ({ node, onChange }) => {
  const [form] = Form.useForm();

  // Initialize form with node data
  useEffect(() => {
    if (node && node.data) {
      form.setFieldsValue({
        name: node.data.name || "",
        description: node.data.description || "",
        functionType: node.data.functionType || "default",
        // Add more fields as needed
      });
    }
  }, [node, form]);

  // Handle form values change
  const handleValuesChange = (_changedValues: unknown, allValues: FormData) => {
    if (onChange) {
      onChange(allValues);
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onValuesChange={handleValuesChange}
      initialValues={{
        name: "",
        description: "",
        functionType: "default",
      }}
    >
      <Form.Item
        name="name"
        label="Function Name"
        rules={[{ required: true, message: "Please enter a function name" }]}
      >
        <Input placeholder="Enter function name" />
      </Form.Item>

      <Form.Item name="description" label="Description">
        <Input.TextArea rows={4} placeholder="Enter function description" />
      </Form.Item>

      <Form.Item
        name="functionType"
        label="Function Type"
        rules={[{ required: true, message: "Please select a function type" }]}
      >
        <Select>
          <Select.Option value="default">Default Function</Select.Option>
          <Select.Option value="http">HTTP Request</Select.Option>
          <Select.Option value="transform">Data Transformation</Select.Option>
          <Select.Option value="custom">Custom Function</Select.Option>
        </Select>
      </Form.Item>

      {/* No submit buttons - form data is saved automatically */}
    </Form>
  );
};

export default FunctionForm;
