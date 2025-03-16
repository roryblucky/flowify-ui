import { MenuProps, Space } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import { Dropdown } from "antd";
import React from "react";

type OperateDropdownProps = {
  items: MenuProps["items"];
  onClick: MenuProps["onClick"];
};

const OperateDropdown: React.FC<OperateDropdownProps> = ({
  items,
  onClick,
}) => {
  return (
    <div onClick={(e) => e.stopPropagation()}>
      <Dropdown menu={{ items, onClick }}>
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            <EllipsisOutlined />
          </Space>
        </a>
      </Dropdown>
    </div>
  );
};

export default OperateDropdown;
