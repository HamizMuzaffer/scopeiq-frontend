import { CaseStudy } from '../types';

/**
 * Filter and classification helper utilities specific to the Case Studies module
 */

export const caseStudiesHelper = {
  filterStudiesByCategory: (studies: CaseStudy[], category: string): CaseStudy[] => {
    if (category === 'All') return studies;
    return studies.filter((study) => study.category === category);
  }
};
