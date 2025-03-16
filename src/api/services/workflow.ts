import { API_BASE_URL, defaultHeaders, handleApiError } from '../config';
import type {
    WorkflowRequest,
    WorkflowResponse,
    WorkflowListResponse,
} from '../types';

export const workflowApi = {
    create: async (data: WorkflowRequest): Promise<WorkflowResponse> => {
        const response = await fetch(`${API_BASE_URL}/workflows`, {
            method: 'POST',
            headers: defaultHeaders,
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            return handleApiError(response);
        }

        return response.json();
    },

    getAll: async (): Promise<WorkflowListResponse> => {
        const response = await fetch(`${API_BASE_URL}/workflows`, {
            headers: defaultHeaders,
        });

        if (!response.ok) {
            return handleApiError(response);
        }

        return response.json();
    },

    getById: async (id: string): Promise<WorkflowResponse> => {
        const response = await fetch(`${API_BASE_URL}/workflows/${id}`, {
            headers: defaultHeaders,
        });

        if (!response.ok) {
            return handleApiError(response);
        }

        return response.json();
    },

    update: async (id: string, data: WorkflowRequest): Promise<WorkflowResponse> => {
        const response = await fetch(`${API_BASE_URL}/workflows/${id}`, {
            method: 'PATCH',
            headers: defaultHeaders,
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            return handleApiError(response);
        }

        return response.json();
    },

    delete: async (id: string): Promise<void> => {
        const response = await fetch(`${API_BASE_URL}/workflows/${id}`, {
            method: 'DELETE',
            headers: defaultHeaders,
        });

        if (!response.ok) {
            return handleApiError(response);
        }
    },
}; 