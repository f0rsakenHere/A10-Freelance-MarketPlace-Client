import { motion } from 'motion/react';
import { Briefcase, CheckCircle, TrendingUp, Target } from 'lucide-react';
import BarChart from '../../components/dashboard/charts/BarChart';
import LineChart from '../../components/dashboard/charts/LineChart';
import PieChart from '../../components/dashboard/charts/PieChart';
import DataTable from '../../components/dashboard/DataTable';
import {
  MOCK_USER_STATS,
  MOCK_JOBS_CHART_DATA,
  MOCK_APPLICATIONS_CHART_DATA,
  MOCK_CATEGORIES_CHART_DATA,
  MOCK_RECENT_ACTIVITY,
} from '../../data/mockDashboardData';

const DashboardHome = () => {
  // Overview cards data
  const statsCards = [
    {
      title: 'Total Jobs Posted',
      value: MOCK_USER_STATS.totalJobsPosted,
      icon: Briefcase,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20',
    },
    {
      title: 'Active Applications',
      value: MOCK_USER_STATS.activeApplications,
      icon: Target,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20',
    },
    {
      title: 'Completed Tasks',
      value: MOCK_USER_STATS.completedTasks,
      icon: CheckCircle,
      color: 'from-green-500 to-green-600',
      bgColor: 'from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20',
    },
    {
      title: 'Acceptance Rate',
      value: `${MOCK_USER_STATS.acceptanceRate}%`,
      icon: TrendingUp,
      color: 'from-pink-500 to-pink-600',
      bgColor: 'from-pink-50 to-pink-100 dark:from-pink-900/20 dark:to-pink-800/20',
    },
  ];

  // Table columns
  const tableColumns = [
    { key: 'date', label: 'Date' },
    { key: 'jobTitle', label: 'Job Title' },
    { 
      key: 'status', 
      label: 'Status',
      render: (value) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          value === 'Active' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
          value === 'Completed' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' :
          'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
        }`}>
          {value}
        </span>
      )
    },
    { key: 'applicants', label: 'Applicants' },
    { key: 'action', label: 'Latest Action' },
  ];

  const handleRowAction = (action, row) => {
    console.log(`Action: ${action}`, row);
    // TODO: Implement actual action handlers
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Dashboard Overview
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Welcome back! Here's what's happening with your jobs.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
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
              </div>
              <div className={`p-3 bg-gradient-to-br ${stat.color} rounded-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BarChart
          data={MOCK_JOBS_CHART_DATA}
          xKey="month"
          yKey="jobs"
          title="Jobs Posted (Last 6 Months)"
          color="#3b82f6"
        />
        <LineChart
          data={MOCK_APPLICATIONS_CHART_DATA}
          xKey="month"
          yKey="applications"
          title="Application Trends"
          color="#8b5cf6"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PieChart
          data={MOCK_CATEGORIES_CHART_DATA}
          title="Job Categories Distribution"
        />
        
        {/* Quick Stats Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            Quick Stats
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Total Views
              </span>
              <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
                1,247
              </span>
            </div>
            <div className="flex justify-between items-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Avg. Response Time
              </span>
              <span className="text-xl font-bold text-green-600 dark:text-green-400">
                2.4h
              </span>
            </div>
            <div className="flex justify-between items-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Success Rate
              </span>
              <span className="text-xl font-bold text-purple-600 dark:text-purple-400">
                94%
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Recent Activity Table */}
      <DataTable
        title="Recent Activity"
        columns={tableColumns}
        data={MOCK_RECENT_ACTIVITY}
        onRowAction={handleRowAction}
      />
    </div>
  );
};

export default DashboardHome;
