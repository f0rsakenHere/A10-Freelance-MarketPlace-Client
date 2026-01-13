import { motion } from 'motion/react';
import { Users, Briefcase, TrendingUp, DollarSign, Activity, Award } from 'lucide-react';
import BarChart from '../../components/dashboard/charts/BarChart';
import LineChart from '../../components/dashboard/charts/LineChart';
import PieChart from '../../components/dashboard/charts/PieChart';
import DataTable from '../../components/dashboard/DataTable';
import {
  MOCK_ADMIN_STATS,
  MOCK_USER_REGISTRATIONS_DATA,
  MOCK_JOBS_CHART_DATA,
  MOCK_CATEGORIES_CHART_DATA,
  MOCK_RECENT_USERS,
  MOCK_ALL_JOBS,
  MOCK_USER_ACTIVITY_DATA,
} from '../../data/mockDashboardData';

const AdminDashboard = () => {
  // Overview cards data
  const statsCards = [
    {
      title: 'Total Users',
      value: MOCK_ADMIN_STATS.totalUsers,
      icon: Users,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20',
      change: '+12%',
    },
    {
      title: 'Total Jobs',
      value: MOCK_ADMIN_STATS.totalJobs,
      icon: Briefcase,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20',
      change: '+8%',
    },
    {
      title: 'Active Jobs',
      value: MOCK_ADMIN_STATS.activeJobs,
      icon: Activity,
      color: 'from-green-500 to-green-600',
      bgColor: 'from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20',
      change: '+15%',
    },
    {
      title: 'Total Applications',
      value: MOCK_ADMIN_STATS.totalApplications,
      icon: Award,
      color: 'from-pink-500 to-pink-600',
      bgColor: 'from-pink-50 to-pink-100 dark:from-pink-900/20 dark:to-pink-800/20',
      change: '+23%',
    },
    {
      title: 'Platform Revenue',
      value: `$${MOCK_ADMIN_STATS.platformRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: 'from-yellow-500 to-yellow-600',
      bgColor: 'from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20',
      change: '+18%',
    },
    {
      title: 'Growth Rate',
      value: `${MOCK_ADMIN_STATS.growthRate}%`,
      icon: TrendingUp,
      color: 'from-indigo-500 to-indigo-600',
      bgColor: 'from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20',
      change: '+5%',
    },
  ];

  // User table columns
  const userColumns = [
    { 
      key: 'avatar', 
      label: 'Avatar',
      render: (value, row) => (
        <img 
          src={value} 
          alt={row.name}
          className="w-10 h-10 rounded-full ring-2 ring-blue-500"
        />
      )
    },
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { 
      key: 'role', 
      label: 'Role',
      render: (value) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${
          value === 'admin' 
            ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400' 
            : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
        }`}>
          {value}
        </span>
      )
    },
    { key: 'joinDate', label: 'Join Date' },
    { 
      key: 'status', 
      label: 'Status',
      render: (value) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${
          value === 'active' 
            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
            : 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
        }`}>
          {value}
        </span>
      )
    },
  ];

  // Jobs table columns
  const jobColumns = [
    { key: 'title', label: 'Job Title' },
    { key: 'postedBy', label: 'Posted By' },
    { key: 'category', label: 'Category' },
    { key: 'date', label: 'Date' },
    { 
      key: 'status', 
      label: 'Status',
      render: (value) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          value === 'Active' 
            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
            : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
        }`}>
          {value}
        </span>
      )
    },
    { key: 'applications', label: 'Applications' },
  ];

  const handleUserAction = (action, user) => {
    console.log(`User ${action}:`, user);
    // TODO: Implement actual action handlers
  };

  const handleJobAction = (action, job) => {
    console.log(`Job ${action}:`, job);
    // TODO: Implement actual action handlers
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Admin Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Platform overview and analytics
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {statsCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`bg-gradient-to-br ${stat.bgColor} rounded-xl p-6 border border-gray-200 dark:border-gray-700`}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {stat.title}
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                  {stat.value}
                </p>
                <span className="text-sm font-medium text-green-600 dark:text-green-400 mt-1 inline-block">
                  {stat.change} this month
                </span>
              </div>
              <div className={`p-3 bg-gradient-to-br ${stat.color} rounded-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BarChart
          data={MOCK_USER_REGISTRATIONS_DATA}
          xKey="month"
          yKey="users"
          title="User Registrations (Last 6 Months)"
          color="#3b82f6"
        />
        <LineChart
          data={MOCK_JOBS_CHART_DATA}
          xKey="month"
          yKey="jobs"
          title="Job Posting Trends"
          color="#8b5cf6"
        />
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PieChart
          data={MOCK_CATEGORIES_CHART_DATA}
          title="Job Categories Distribution"
        />
        <PieChart
          data={MOCK_USER_ACTIVITY_DATA}
          title="User Activity Status"
          colors={['#10b981', '#f59e0b', '#3b82f6']}
        />
      </div>

      {/* Data Tables */}
      <DataTable
        title="Recent Users"
        columns={userColumns}
        data={MOCK_RECENT_USERS}
        onRowAction={handleUserAction}
      />

      <DataTable
        title="Recent Jobs"
        columns={jobColumns}
        data={MOCK_ALL_JOBS}
        onRowAction={handleJobAction}
      />
    </div>
  );
};

export default AdminDashboard;
