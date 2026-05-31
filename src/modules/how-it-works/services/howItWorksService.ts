import axios from 'axios';

export const howItWorksService = {
  simulateCalculations: async (complexity: string) => {
    // Mocking calculation API
    return {
      complexityScore: complexity === 'high' ? 84 : 32,
      estimatedMilestones: complexity === 'high' ? 8 : 3,
      successProbability: 99.8,
    };
  }
};
