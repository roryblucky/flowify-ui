export type WorkflowType = 'SMS' | 'Email' | 'Data';
export type WorkflowStatus = 'draft' | 'published';

export interface WorkflowResponse {
    id: string;
    name: string;
    description: string;
    type: WorkflowType;
    status: WorkflowStatus;
    createdAt: string;
    updatedAt: string;
}

export type MockRequest = Request;
export type MockResponse = Response; 