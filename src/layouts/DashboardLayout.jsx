import { Outlet } from 'react-router-dom';
import DashboardTopNav from '../components/dashboard/DashboardTopNav';
import DashboardSidebar from '../components/dashboard/DashboardSidebar';
import { useState } from 'react';
import { Menu } from 'lucide-react';

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Top Navigation */}
      <DashboardTopNav />

      <div className="flex">
        {/* Sidebar */}
        <DashboardSidebar 
          isOpen={isSidebarOpen} 
          onClose={() => setIsSidebarOpen(false)} 
        />

        {/* Main Content */}
        <main className="flex-1 overflow-x-hidden">
          {/* Mobile Menu Button */}
          <div className="lg:hidden sticky top-16 z-30 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="m-4 p-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <Menu size={24} className="text-gray-600 dark:text-gray-400" />
            </button>
          </div>

          {/* Page Content */}
          <div className="p-4 sm:p-6 lg:p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
