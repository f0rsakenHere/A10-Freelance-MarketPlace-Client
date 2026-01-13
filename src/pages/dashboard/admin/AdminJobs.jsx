import { motion } from 'motion/react';
import DataTable from '../../../components/dashboard/DataTable';
import { MOCK_ALL_JOBS } from '../../../data/mockDashboardData';

const AdminJobs = () => {
  const columns = [
    { key: 'title', label: 'Job Title' },
    { key: 'postedBy', label: 'Posted By' },
    { key: 'category', label: 'Category' },
    { key: 'date', label: 'Date' },
    {
      key: 'status',
      label: 'Status',
      render: (value) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            value === 'Active'
              ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
              : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
          }`}
        >
          {value}
        </span>
      ),
    },
    { key: 'applications', label: 'Applications' },
  ];

  const handleRowAction = (action, job) => {
    console.log(`${action} job:`, job);
    // TODO: Implement actual job management actions
    switch (action) {
      case 'view':
        // View job details
        break;
      case 'edit':
        // Edit job
        break;
      case 'delete':
        // Delete job
        if (window.confirm(`Are you sure you want to delete "${job.title}"?`)) {
          // Delete logic
        }
        break;
      default:
        break;
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Job Management
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Manage all jobs posted on the platform
        </p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700"
        >
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Total Jobs
          </p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
            523
          </p>
          <p className="text-sm text-green-600 dark:text-green-400 mt-1">
            +15% this month
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700"
        >
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Active Jobs
          </p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
            342
          </p>
          <p className="text-sm text-green-600 dark:text-green-400 mt-1">
            65% of total
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700"
        >
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Completed Jobs
          </p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
            181
          </p>
          <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">
            35% completed
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700"
        >
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Total Applications
          </p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
            1,893
          </p>
          <p className="text-sm text-purple-600 dark:text-purple-400 mt-1">
            Avg 3.6 per job
          </p>
        </motion.div>
      </div>

      {/* Jobs Table */}
      <DataTable
        title="All Jobs"
        columns={columns}
        data={MOCK_ALL_JOBS}
        onRowAction={handleRowAction}
      />
    </div>
  );
};

export default AdminJobs;
