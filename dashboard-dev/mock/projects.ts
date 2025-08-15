export type Project = {
  id: string;
  name: string;
  client: string;
  status: 'active' | 'on-hold' | 'cancelled' | 'completed';
  startDate: Date | string;
  endDate: Date | string;
  budget: number;
  team: string;
};

export const projectsData: Project[] = [
  {
    id: '1',
    name: 'E-commerce Platform',
    client: 'TechCorp Solutions',
    status: 'active',
    startDate: '2024-01-15',
    endDate: '2024-06-30',
    budget: 50000,
    team: 'companyX',
  },
  {
    id: '2',
    name: 'Mobile App Development',
    client: 'InnovateTech',
    status: 'completed',
    startDate: '2023-09-01',
    endDate: '2024-02-28',
    budget: 35000,
    team: 'companyY',
  },
  {
    id: '3',
    name: 'Website Redesign',
    client: 'TechCorp Solutions',
    status: 'on-hold',
    startDate: '2024-03-01',
    endDate: '2024-05-15',
    budget: 25000,
    team: 'companyZ',
  },
  {
    id: '4',
    name: 'CRM System',
    client: 'Global Enterprises',
    status: 'active',
    startDate: '2024-02-01',
    endDate: '2024-08-31',
    budget: 75000,
    team: 'companyA',
  },
  {
    id: '5',
    name: 'Data Analytics Dashboard',
    client: 'InnovateTech',
    status: 'active',
    startDate: '2024-01-01',
    endDate: '2024-04-30',
    budget: 40000,
    team: 'companyB',
  },
];

export const uniqueClients = [
  ...new Set(projectsData.map((project) => project.client)),
];
