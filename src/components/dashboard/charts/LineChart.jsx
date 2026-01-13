import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { motion } from 'motion/react';

const LineChart = ({ data, xKey, yKey, title, color = "#8b5cf6" }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
    >
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        {title}
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <RechartsLineChart data={data}>
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
          />
          <Legend />
          <Line 
            type="monotone" 
            dataKey={yKey} 
            stroke={color} 
            strokeWidth={3}
            dot={{ fill: color, r: 5 }}
            activeDot={{ r: 7 }}
            animationDuration={1000}
          />
        </RechartsLineChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

export default LineChart;
