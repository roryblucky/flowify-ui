import { WorkflowResponse } from './types';
import { defineMock } from 'vite-plugin-mock-dev-server'

const mockWorkflows: WorkflowResponse[] = [
    {
        id: "1",
        name: "Customer Notification SMS",
        description: "Send important account and transaction notifications to customers",
        type: "SMS",
        status: "published",
        createdAt: "2024-03-15T08:00:00Z",
        updatedAt: "2024-03-15T10:30:00Z",
    },
    {
        id: "2",
        name: "Marketing Campaign Email",
        description: "Send latest product offers and marketing campaign information",
        type: "Email",
        status: "draft",
        createdAt: "2024-03-14T15:00:00Z",
        updatedAt: "2024-03-14T16:45:00Z",
    },
    {
        id: "3",
        name: "Data Sync Process",
        description: "Synchronize customer data and transaction records between different systems",
        type: "Data",
        status: "published",
        createdAt: "2024-03-13T09:00:00Z",
        updatedAt: "2024-03-13T14:20:00Z",
    },
];
export default defineMock([
    {
        url: '/api/workflows',
        method: 'GET',
        body: {
            items: mockWorkflows,
            total: mockWorkflows.length,
        },
    },
    {
        url: '/api/workflows/:id',
        method: 'GET',
        body: (req) => {
            const id = req.params.id;
            return mockWorkflows.find(w => w.id === id);
        },
    },
    {
        url: '/api/workflows',
        method: 'POST',
        body: (req) => {
            const workflow = req.body as WorkflowResponse;
            workflow.id = (mockWorkflows.length + 1).toString();
            workflow.status = "draft"
            workflow.createdAt = new Date().toISOString();
            workflow.updatedAt = new Date().toISOString();
            mockWorkflows.push(workflow);
            return {
                workflow: workflow,
            };
        },
        status: 201,
    },
    {
        url: '/api/workflows/:id',
        method: 'PATCH',
        body: (req) => {
            const id = req.params.id;
            const workflow = req.body as WorkflowResponse;
            const index = mockWorkflows.findIndex(w => w.id === id);
            if (index !== -1) {
                mockWorkflows[index] = workflow;
                workflow.updatedAt = new Date().toISOString();
            }
            return {
                workflow: workflow,
            };
        },
        status: 200,
    },
]);

