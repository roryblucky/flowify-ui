import { Node } from "@xyflow/react";

export type BaseNodeData<TForm = Record<string, unknown>> = {
  label: string; // node type
  color?: string;
  icon: React.ReactNode;
  form?: TForm;
};

export type BaseNode<T = unknown> = Node<BaseNodeData<T>>;

export type StartPluginProps = BaseNode<void>;
export type SwitchPluginProps = BaseNode<void>;
export type LoopPluginProps = BaseNode<void>;
export type FunctionPluginProps = BaseNode<void>;
