import { motion } from 'motion/react';
import { Download, Calendar } from 'lucide-react';
import BarChart from '../../../components/dashboard/charts/BarChart';
import LineChart from '../../../components/dashboard/charts/LineChart';
import PieChart from '../../../components/dashboard/charts/PieChart';
import {
  MOCK_USER_REGISTRATIONS_DATA,
  MOCK_JOBS_CHART_DATA,
  MOCK_CATEGORIES_CHART_DATA,
  MOCK_APPLICATIONS_CHART_DATA,
} from '../../../data/mockDashboardData';

const AdminReports = () => {
  const handleExport = (format) => {
    console.log(`Exporting data as ${format}`);
    // TODO: Implement actual export functionality
    alert(`Export as ${format} - Feature coming soon!`);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Reports & Analytics
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Comprehensive platform analytics and insights
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => handleExport('CSV')}
              className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors"
            >
              <Download size={18} />
              Export CSV
            </button>
            <button
              onClick={() => handleExport('PDF')}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors"
            >
              <Download size={18} />
              Export PDF
            </button>
          </div>
        </div>
      </motion.div>

      {/* Date Range Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700"
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <Calendar className="text-gray-600 dark:text-gray-400" size={20} />
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Start Date
              </label>
              <input
                type="date"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                defaultValue="2026-01-01"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                End Date
              </label>
              <input
                type="date"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                defaultValue="2026-01-13"
              />
            </div>
          </div>
          <button className="px-6 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors">
            Apply Filter
          </button>
        </div>
      </motion.div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            label: 'Total Revenue',
            value: '$45,230',
            change: '+18%',
            color: 'green',
          },
          {
            label: 'Avg. Job Value',
            value: '$245',
            change: '+5%',
            color: 'blue',
          },
          { label: 'Completion Rate', value: '94%', change: '+2%', color: 'purple' },
          {
            label: 'User Satisfaction',
            value: '4.8/5',
            change: '+0.2',
            color: 'pink',
          },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.05 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700"
          >
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
              {stat.label}
            </p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
              {stat.value}
            </p>
            <p className={`text-sm text-${stat.color}-600 dark:text-${stat.color}-400 mt-1`}>
              {stat.change} this month
            </p>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BarChart
          data={MOCK_USER_REGISTRATIONS_DATA}
          xKey="month"
          yKey="users"
          title="User Growth (Last 6 Months)"
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
        <LineChart
          data={MOCK_JOBS_CHART_DATA}
          xKey="month"
          yKey="jobs"
          title="Job Posting Volume"
          color="#10b981"
        />
        <PieChart
          data={MOCK_CATEGORIES_CHART_DATA}
          title="Revenue by Category"
        />
      </div>

      {/* Additional Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700"
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Key Performance Indicators
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { metric: 'Avg. Response Time', value: '2.4 hours', trend: 'down' },
            { metric: 'Job Completion Time', value: '5.2 days', trend: 'down' },
            { metric: 'User Retention Rate', value: '85%', trend: 'up' },
            { metric: 'New User Growth', value: '+23%', trend: 'up' },
            { metric: 'Active Job Rate', value: '65%', trend: 'up' },
            { metric: 'Platform Uptime', value: '99.9%', trend: 'stable' },
          ].map((kpi) => (
            <div
              key={kpi.metric}
              className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg"
            >
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {kpi.metric}
              </p>
              <div className="flex items-center justify-between mt-2">
                <p className="text-xl font-bold text-gray-900 dark:text-white">
                  {kpi.value}
                </p>
                <span
                  className={`text-xs font-medium ${
                    kpi.trend === 'up'
                      ? 'text-green-600'
                      : kpi.trend === 'down'
                      ? 'text-red-600'
                      : 'text-gray-600'
                  }`}
                >
                  {kpi.trend === 'up' ? '↑' : kpi.trend === 'down' ? '↓' : '—'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default AdminReports;
