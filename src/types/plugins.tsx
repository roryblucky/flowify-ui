import { Node } from "@xyflow/react";
import {
  CaretRightOutlined,
  FolderOutlined,
  MessageOutlined,
  SearchOutlined,
  SwapOutlined,
  ToolOutlined,
} from "@ant-design/icons";

export enum Plugin {
  START = "Start",
  CONSUMER = "Consumer",
  MESSAGE = "Message",
  IF_ELSE = "If-Else",
  FUNCTION = "Function_V2",
}

export type BaseNodeData = {
  label: string;
  color?: string;
  icon: React.ReactNode;
};

export type BaseNode = Node<BaseNodeData>;
export type StartPluginProps = BaseNode;
export type IfElsePluginProps = BaseNode;
export type MessagePluginProps = BaseNode;
export type FunctionPluginProps = BaseNode;
export type ConsumerPluginProps = BaseNode;

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
  [Plugin.CONSUMER]: {
    icon: <SearchOutlined />,
  },
  [Plugin.MESSAGE]: {
    icon: <MessageOutlined />,
  },
  [Plugin.IF_ELSE]: {
    icon: <SwapOutlined />,
  },
  [Plugin.FUNCTION]: {
    icon: <ToolOutlined />,
  },
};

export type PluginMenu = {
  label: string;
  key: string;
  icon: React.ReactNode;
  children: {
    key: Plugin;
    label: Plugin;
    icon: React.ReactNode;
  }[];
};

export type PluginMenuGroup = PluginMenu[];

export const getPluginMenuList = (): PluginMenuGroup => {
  const group: PluginMenu = {
    label: "Basic",
    key: "basic",
    icon: <FolderOutlined />,
    children: [],
  };

  Object.values(Plugin).forEach((plugin) => {
    if (plugin !== Plugin.START) {
      group.children.push({
        key: plugin,
        label: plugin,
        icon: PluginMetadataMap[plugin].icon,
      });
    }
  });

  return [group];
};

export const pluginMenuList = getPluginMenuList();
