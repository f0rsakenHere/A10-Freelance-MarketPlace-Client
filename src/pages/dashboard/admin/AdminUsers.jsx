import { motion } from 'motion/react';
import DataTable from '../../../components/dashboard/DataTable';
import { MOCK_RECENT_USERS } from '../../../data/mockDashboardData';
import { Search } from 'lucide-react';

const AdminUsers = () => {
  const columns = [
    {
      key: 'avatar',
      label: 'Avatar',
      render: (value, row) => (
        <img
          src={value}
          alt={row.name}
          className="w-10 h-10 rounded-full ring-2 ring-blue-500"
        />
      ),
    },
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    {
      key: 'role',
      label: 'Role',
      render: (value) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${
            value === 'admin'
              ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400'
              : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
          }`}
        >
          {value}
        </span>
      ),
    },
    { key: 'joinDate', label: 'Join Date' },
    {
      key: 'status',
      label: 'Status',
      render: (value) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${
            value === 'active'
              ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
              : 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
          }`}
        >
          {value}
        </span>
      ),
    },
  ];

  const handleRowAction = (action, user) => {
    console.log(`${action} user:`, user);
    // TODO: Implement actual user management actions
    switch (action) {
      case 'view':
        // View user details
        break;
      case 'edit':
        // Edit user (change role, etc.)
        break;
      case 'delete':
        // Deactivate/delete user
        break;
      default:
        break;
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          User Management
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Manage all registered users on the platform
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
            Total Users
          </p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
            1,247
          </p>
          <p className="text-sm text-green-600 dark:text-green-400 mt-1">
            +12% this month
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700"
        >
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Active Users
          </p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
            1,124
          </p>
          <p className="text-sm text-green-600 dark:text-green-400 mt-1">
            90% active rate
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700"
        >
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
            New This Month
          </p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
            123
          </p>
          <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">
            +8% from last month
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700"
        >
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Admin Users
          </p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
            5
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Platform admins
          </p>
        </motion.div>
      </div>

      {/* Users Table */}
      <DataTable
        title="All Users"
        columns={columns}
        data={MOCK_RECENT_USERS}
        onRowAction={handleRowAction}
      />
    </div>
  );
};

export default AdminUsers;
