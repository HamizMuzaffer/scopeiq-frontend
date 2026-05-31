import axios from 'axios';
import { ContactFormInput } from '../types';

// Structured Axios service inside the home module
export const homeService = {
  submitDemoRequest: async (data: ContactFormInput): Promise<{ success: boolean; message: string }> => {
    // Simulating API call
    try {
      // In production: const response = await axios.post('/api/demo', data);
      await new Promise((resolve) => setTimeout(resolve, 800));
      return {
        success: true,
        message: `System operational. Scoping demo scheduled for ${data.email}.`,
      };
    } catch (error) {
      throw new Error('API submission error');
    }
  },

  fetchSystemStatus: async () => {
    // In production: const response = await axios.get('/api/status');
    return { status: 'healthy', latencyMs: 24 };
  }
};
