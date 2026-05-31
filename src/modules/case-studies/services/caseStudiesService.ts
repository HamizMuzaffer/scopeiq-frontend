import axios from 'axios';

export const caseStudiesService = {
  fetchCaseStudies: async () => {
    // Mocking API load
    return {
      success: true,
      data: [
        {
          id: 'obsidian-logistics',
          title: 'Obsidian Supply Chain Synchronization',
          client: 'Obsidian Logistics Inc.',
          description: 'Re-architected legacy distributed system tracking using visual scoping graphs, resolving multi-agent lock contention.',
          metric: '94% Less Downtime',
          category: 'Architecture',
          glowColor: 'primary',
        },
        {
          id: 'cyberdyne-redux',
          title: 'Cyberdyne Automated State Synchronization',
          client: 'Cyberdyne Systems',
          description: 'Wired Redux Toolkit bindings with type-safe schema hooks to orchestrate safe robotic operation sequencing in real-time.',
          metric: '14.2x Faster Response',
          category: 'State Sync',
          glowColor: 'accent',
        },
      ]
    };
  }
};
