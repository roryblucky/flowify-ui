import { ArrowLeftOutlined } from "@ant-design/icons";
import { Link } from "@tanstack/react-router";
import { Flex, Space, Button } from "antd";
import { WorkflowResponse } from "@/api/types";

type WorkflowHeaderProps = {
  workflow?: WorkflowResponse;
};

const WorkflowHeader: React.FC<WorkflowHeaderProps> = ({ workflow }) => {
  const saveFlow = () => {
    console.log("saveFlow");
  };

  const runFlow = () => {
    console.log("runFlow");
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
          <span className="font-semibold text-[18px]">{workflow?.name}</span>
        </div>
      </Space>
      <Space size={"large"}>
        <Button onClick={() => runFlow()}>
          <b>Run</b>
        </Button>
        <Button type="primary" onClick={() => saveFlow()}>
          <b>Save</b>
        </Button>
      </Space>
    </Flex>
  );
};

export default WorkflowHeader;
