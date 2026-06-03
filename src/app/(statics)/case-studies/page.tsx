import { CaseStudiesModule } from '@/modules/case-studies';
export const metadata = {
  title: 'Case Studies | ScopeIQ',
  description: 'Verified project scoping breakthroughs and client operational metrics built with ScopeIQ.',
};

export default function CaseStudies() {
  return <CaseStudiesModule />;
}
