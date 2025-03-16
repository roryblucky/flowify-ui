import { Node, Edge } from '@xyflow/react';
import React from 'react';

/**
 * Possible workflow types
 */
export type WorkflowType = 'Message';

/**
 * Workflow publication status
 */
export type WorkflowStatus = 'draft' | 'published';

/**
 * Form data properties that can be stored on a node
 * More specific than 'any' to maintain type safety while allowing flexibility
 */
export type NodeFormData = {
    label: string;
    icon?: React.ReactNode;
    // Additional properties with type safety
    [key: string]: string | number | boolean | React.ReactNode | undefined;
};

/**
 * Custom data properties for workflow nodes
 * @extends Node from React Flow
 */
export interface WorkflowNode extends Node {
    data: NodeFormData;
}

/**
 * Custom properties for workflow edges
 * We use the standard Edge type from React Flow
 * This type alias helps with code readability and future extensions
 */
export type WorkflowEdge = Edge;

/**
 * API response structure for workflow data
 */
export interface WorkflowResponse {
    id: string;
    name: string;
    description?: string;
    createdAt: string;
    updatedAt: string;
    status: WorkflowStatus;
    nodes: Node[];
    edges: Edge[];
}

/**
 * API request structure for creating or updating a workflow
 */
export interface WorkflowRequest {
    name: string;
    description?: string;
    nodes: Node[];
    edges: Edge[];
}

/**
 * API response structure for listing workflows
 */
export interface WorkflowListResponse {
    workflows: WorkflowResponse[];
    total: number;
} 