import axios from 'axios';

export const aboutService = {
  fetchCompanyStats: async () => {
    // Mocking company-wide metrics
    return {
      activeSubscribers: 12000,
      repositoriesMapped: 450000,
      averageAccuracyScore: 99.8,
    };
  }
};
