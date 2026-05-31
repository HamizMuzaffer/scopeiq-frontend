/**
 * Calculations and data formatting helper utilities specific to the About module
 */

export const aboutHelper = {
  calculateYearsOperating: (startYear: number): number => {
    return new Date().getFullYear() - startYear;
  }
};
