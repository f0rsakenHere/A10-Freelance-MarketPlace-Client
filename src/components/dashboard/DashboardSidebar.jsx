import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthProvider';
import { 
  Home, 
  Briefcase, 
  CheckCircle, 
  PlusCircle, 
  User,
  Users,
  BarChart3,
  Settings,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const DashboardSidebar = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  // User menu items
  const userMenuItems = [
    { path: '/dashboard', label: 'Dashboard Home', icon: Home, exact: true },
    { path: '/dashboard/my-jobs', label: 'My Posted Jobs', icon: Briefcase },
    { path: '/dashboard/my-tasks', label: 'My Accepted Tasks', icon: CheckCircle },
    { path: '/dashboard/add-job', label: 'Add New Job', icon: PlusCircle },
    { path: '/dashboard/profile', label: 'My Profile', icon: User },
  ];

  // Admin menu items
  const adminMenuItems = [
    { path: '/dashboard/admin', label: 'Admin Overview', icon: Home, exact: true },
    { path: '/dashboard/admin/users', label: 'All Users', icon: Users },
    { path: '/dashboard/admin/jobs', label: 'All Jobs', icon: Briefcase },
    { path: '/dashboard/admin/reports', label: 'Reports & Analytics', icon: BarChart3 },
    { path: '/dashboard/profile', label: 'Settings', icon: Settings },
  ];

  const menuItems = isAdmin ? adminMenuItems : userMenuItems;

  const sidebarContent = (
    <div className="h-full flex flex-col bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
      {/* Mobile Close Button */}
      <div className="lg:hidden flex justify-end p-4">
        <button
          onClick={onClose}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <X size={24} className="text-gray-600 dark:text-gray-400" />
        </button>
      </div>

      {/* Menu Section */}
      <div className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        <p className="px-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
          {isAdmin ? 'Admin Menu' : 'User Menu'}
        </p>
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.exact}
            onClick={() => onClose()}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <item.icon size={20} className={isActive ? 'text-white' : ''} />
                <span className="font-medium">{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>

      {/* User Role Badge */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
            {user?.role || 'user'} Account
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 h-[calc(100vh-4rem)] sticky top-16">
        {sidebarContent}
      </aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            />
            {/* Sidebar */}
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: 'spring', damping: 25 }}
              className="fixed top-0 left-0 w-64 h-full z-50 lg:hidden"
            >
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default DashboardSidebar;
