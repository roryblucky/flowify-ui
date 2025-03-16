export type WorkflowType = 'Message';
export type WorkflowStatus = 'draft' | 'published';

export interface WorkflowRequest {
    name: string;
    description: string;
    type: WorkflowType;
}

export interface WorkflowResponse {
    id: string;
    name: string;
    description: string;
    type: WorkflowType;
    status: WorkflowStatus;
    createdAt: string;
    updatedAt: string;
}

export interface WorkflowListResponse {
    items: WorkflowResponse[];
    total: number;
} 