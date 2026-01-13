// Mock data for dashboard statistics and charts
// TODO: Replace with real API calls

export const MOCK_USER_STATS = {
  totalJobsPosted: 12,
  activeApplications: 8,
  completedTasks: 15,
  acceptanceRate: 75,
};

export const MOCK_ADMIN_STATS = {
  totalUsers: 1247,
  totalJobs: 523,
  activeJobs: 342,
  totalApplications: 1893,
  platformRevenue: 45230,
  growthRate: 23.5,
};

// Chart data - Jobs posted per month (last 6 months)
export const MOCK_JOBS_CHART_DATA = [
  { month: 'Aug', jobs: 5 },
  { month: 'Sep', jobs: 8 },
  { month: 'Oct', jobs: 12 },
  { month: 'Nov', jobs: 15 },
  { month: 'Dec', jobs: 10 },
  { month: 'Jan', jobs: 18 },
];

// Chart data - Application trends
export const MOCK_APPLICATIONS_CHART_DATA = [
  { month: 'Aug', applications: 12 },
  { month: 'Sep', applications: 19 },
  { month: 'Oct', applications: 25 },
  { month: 'Nov', applications: 32 },
  { month: 'Dec', applications: 28 },
  { month: 'Jan', applications: 45 },
];

// Chart data - Job categories distribution
export const MOCK_CATEGORIES_CHART_DATA = [
  { name: 'Web Development', value: 35 },
  { name: 'Mobile Apps', value: 25 },
  { name: 'Design', value: 20 },
  { name: 'Marketing', value: 12 },
  { name: 'Other', value: 8 },
];

// Recent activity table data
export const MOCK_RECENT_ACTIVITY = [
  {
    id: 1,
    date: '2026-01-13',
    jobTitle: 'Build E-commerce Website',
    status: 'Active',
    applicants: 5,
    action: 'Application received',
  },
  {
    id: 2,
    date: '2026-01-12',
    jobTitle: 'Mobile App UI Design',
    status: 'Active',
    applicants: 3,
    action: 'Job posted',
  },
  {
    id: 3,
    date: '2026-01-11',
    jobTitle: 'Logo Design for Startup',
    status: 'Completed',
    applicants: 8,
    action: 'Task completed',
  },
  {
    id: 4,
    date: '2026-01-10',
    jobTitle: 'SEO Optimization',
    status: 'Active',
    applicants: 2,
    action: 'Application received',
  },
  {
    id: 5,
    date: '2026-01-09',
    jobTitle: 'Content Writing',
    status: 'Active',
    applicants: 6,
    action: 'Job posted',
  },
];

// Admin - User registrations per month
export const MOCK_USER_REGISTRATIONS_DATA = [
  { month: 'Aug', users: 145 },
  { month: 'Sep', users: 189 },
  { month: 'Oct', users: 203 },
  { month: 'Nov', users: 178 },
  { month: 'Dec', users: 195 },
  { month: 'Jan', users: 237 },
];

// Admin - Recent users
export const MOCK_RECENT_USERS = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    role: 'user',
    joinDate: '2026-01-13',
    status: 'active',
    avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=random',
  },
  {
    id: 2,
    name: 'Sarah Smith',
    email: 'sarah@example.com',
    role: 'user',
    joinDate: '2026-01-12',
    status: 'active',
    avatar: 'https://ui-avatars.com/api/?name=Sarah+Smith&background=random',
  },
  {
    id: 3,
    name: 'Mike Johnson',
    email: 'mike@example.com',
    role: 'user',
    joinDate: '2026-01-11',
    status: 'active',
    avatar: 'https://ui-avatars.com/api/?name=Mike+Johnson&background=random',
  },
  {
    id: 4,
    name: 'Emma Wilson',
    email: 'emma@example.com',
    role: 'admin',
    joinDate: '2026-01-10',
    status: 'active',
    avatar: 'https://ui-avatars.com/api/?name=Emma+Wilson&background=random',
  },
  {
    id: 5,
    name: 'David Brown',
    email: 'david@example.com',
    role: 'user',
    joinDate: '2026-01-09',
    status: 'inactive',
    avatar: 'https://ui-avatars.com/api/?name=David+Brown&background=random',
  },
];

// Admin - Recent jobs (all users)
export const MOCK_ALL_JOBS = [
  {
    id: 1,
    title: 'Full Stack Developer Needed',
    postedBy: 'Acme Corp',
    category: 'Web Development',
    date: '2026-01-13',
    status: 'Active',
    applications: 12,
  },
  {
    id: 2,
    title: 'Graphic Designer for Logo',
    postedBy: 'StartupXYZ',
    category: 'Design',
    date: '2026-01-12',
    status: 'Active',
    applications: 8,
  },
  {
    id: 3,
    title: 'Mobile App Development',
    postedBy: 'Tech Solutions',
    category: 'Mobile Apps',
    date: '2026-01-11',
    status: 'Completed',
    applications: 15,
  },
  {
    id: 4,
    title: 'SEO Specialist Required',
    postedBy: 'Marketing Pro',
    category: 'Marketing',
    date: '2026-01-10',
    status: 'Active',
    applications: 6,
  },
  {
    id: 5,
    title: 'Video Editor for YouTube',
    postedBy: 'Content Creators',
    category: 'Other',
    date: '2026-01-09',
    status: 'Active',
    applications: 4,
  },
];

// User activity distribution for admin doughnut chart
export const MOCK_USER_ACTIVITY_DATA = [
  { name: 'Active Users', value: 68 },
  { name: 'Inactive Users', value: 22 },
  { name: 'New Users', value: 10 },
];

// Chart colors
export const CHART_COLORS = {
  primary: '#3b82f6',
  secondary: '#8b5cf6',
  success: '#10b981',
  warning: '#f59e0b',
  danger: '#ef4444',
  info: '#06b6d4',
};

export const PIE_COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#10b981', '#f59e0b', '#ef4444'];
