import React from "react";
import { Form, Input, Button, Space, Select } from "antd";
import { Node } from "@xyflow/react";

interface FunctionFormProps {
  node: Node;
}

const FunctionForm: React.FC<FunctionFormProps> = ({ node }) => {
  const [form] = Form.useForm();

  // 初始化表单数据
  React.useEffect(() => {
    if (node && node.data) {
      form.setFieldsValue({
        name: node.data.label || "",
        description: node.data.description || "",
        functionType: node.data.functionType || "default",
        // 可以添加更多字段
      });
    }
  }, [node, form]);

  const handleSubmit = (values: any) => {
    console.log("提交表单数据:", values);
    // 这里可以添加更新节点数据的逻辑
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      initialValues={{
        name: "",
        description: "",
        functionType: "default",
      }}
    >
      <Form.Item
        name="name"
        label="函数名称"
        rules={[{ required: true, message: "请输入函数名称" }]}
      >
        <Input placeholder="请输入函数名称" />
      </Form.Item>

      <Form.Item name="description" label="函数描述">
        <Input.TextArea rows={4} placeholder="请输入函数描述" />
      </Form.Item>

      <Form.Item
        name="functionType"
        label="函数类型"
        rules={[{ required: true, message: "请选择函数类型" }]}
      >
        <Select>
          <Select.Option value="default">默认函数</Select.Option>
          <Select.Option value="http">HTTP 请求</Select.Option>
          <Select.Option value="transform">数据转换</Select.Option>
          <Select.Option value="custom">自定义函数</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item>
        <Space>
          <Button type="primary" htmlType="submit">
            保存
          </Button>
          <Button htmlType="button" onClick={() => form.resetFields()}>
            重置
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default FunctionForm;
