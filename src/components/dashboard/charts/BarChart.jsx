import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { motion } from 'motion/react';

const BarChart = ({ data, xKey, yKey, title, color = "#3b82f6" }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
    >
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        {title}
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <RechartsBarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-gray-700" />
          <XAxis 
            dataKey={xKey} 
            stroke="#6b7280" 
            className="dark:stroke-gray-400"
            tick={{ fill: '#6b7280' }}
          />
          <YAxis 
            stroke="#6b7280" 
            className="dark:stroke-gray-400"
            tick={{ fill: '#6b7280' }}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#fff', 
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}
            cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }}
          />
          <Legend />
          <Bar 
            dataKey={yKey} 
            fill={color} 
            radius={[8, 8, 0, 0]}
            animationDuration={1000}
          />
        </RechartsBarChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

export default BarChart;
