/**
 * Scoping calculations and UI helpers specific to the Home module
 */

export const homeHelper = {
  formatStatValue: (value: string): string => {
    return value.toUpperCase();
  },

  calculateProjectScopingComplexity: (fieldsCount: number, integrationsCount: number): 'Low' | 'Medium' | 'High' => {
    const totalScore = fieldsCount * 1.5 + integrationsCount * 3;
    if (totalScore < 10) return 'Low';
    if (totalScore < 25) return 'Medium';
    return 'High';
  }
};
