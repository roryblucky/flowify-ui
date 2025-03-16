import React from "react";
import {
  CaretRightOutlined,
  FolderOutlined,
  SwapOutlined,
  SyncOutlined,
  ToolOutlined,
} from "@ant-design/icons";

export enum Plugin {
  START = "Start",
  IF_ELSE = "If-Else",
  LOOP = "Loop",
  FUNCTION = "Function",
}

export const PluginMetadataMap: Record<
  Plugin,
  {
    icon: React.ReactNode;
    color?: string;
    backgroundColor?: string;
  }
> = {
  [Plugin.START]: {
    icon: <CaretRightOutlined />,
  },
  [Plugin.IF_ELSE]: {
    icon: <SwapOutlined />,
  },
  [Plugin.LOOP]: {
    icon: <SyncOutlined />,
  },
  [Plugin.FUNCTION]: {
    icon: <ToolOutlined />,
  },
};

export const pluginMenuList = [
  {
    label: "Basic",
    key: "basic",
    icon: <FolderOutlined />,
    children: [
      { key: Plugin.IF_ELSE, label: Plugin.IF_ELSE, icon: <SwapOutlined /> },
      { key: Plugin.LOOP, label: Plugin.LOOP, icon: <SyncOutlined /> },
      { key: Plugin.FUNCTION, label: Plugin.FUNCTION, icon: <ToolOutlined /> },
    ],
  },
];
