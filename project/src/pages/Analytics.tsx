import React, { useState } from 'react';
import { BarChart2, TrendingUp, Users, DollarSign, Calendar, Activity } from 'lucide-react';

const Analytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState('month');
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Analytics</h1>
        <p className="text-gray-600">Hospital performance metrics and data analytics</p>
      </div>
      
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <BarChart2 size={20} className="text-blue-600" />
          <h2 className="text-lg font-semibold">Performance Dashboard</h2>
        </div>
        
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="quarter">This Quarter</option>
          <option value="year">This Year</option>
        </select>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">Total Patients</p>
              <p className="text-2xl font-bold mt-1">248</p>
            </div>
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users size={24} className="text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-xs">
            <span className="flex items-center text-green-600">
              <TrendingUp size={14} className="mr-1" />
              +8%
            </span>
            <span className="text-gray-500 ml-2">vs previous {timeRange}</span>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">Total Revenue</p>
              <p className="text-2xl font-bold mt-1">$42,580</p>
            </div>
            <div className="p-2 bg-green-100 rounded-lg">
              <DollarSign size={24} className="text-green-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-xs">
            <span className="flex items-center text-green-600">
              <TrendingUp size={14} className="mr-1" />
              +12%
            </span>
            <span className="text-gray-500 ml-2">vs previous {timeRange}</span>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">Appointments</p>
              <p className="text-2xl font-bold mt-1">142</p>
            </div>
            <div className="p-2 bg-amber-100 rounded-lg">
              <Calendar size={24} className="text-amber-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-xs">
            <span className="flex items-center text-green-600">
              <TrendingUp size={14} className="mr-1" />
              +5%
            </span>
            <span className="text-gray-500 ml-2">vs previous {timeRange}</span>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">Lab Tests</p>
              <p className="text-2xl font-bold mt-1">85</p>
            </div>
            <div className="p-2 bg-purple-100 rounded-lg">
              <Activity size={24} className="text-purple-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-xs">
            <span className="flex items-center text-red-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trending-down mr-1">
                <polyline points="22 17 13.5 8.5 8.5 13.5 2 7" />
                <polyline points="16 17 22 17 22 11" />
              </svg>
              -3%
            </span>
            <span className="text-gray-500 ml-2">vs previous {timeRange}</span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-base font-medium">Patient Statistics</h3>
          </div>
          
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <div className="text-center">
              <BarChart2 size={48} className="mx-auto text-gray-300 mb-3" />
              <p className="text-gray-500">Patient statistics visualization would appear here</p>
              <p className="text-xs text-gray-400 mt-1">Showing data for: {timeRange === 'week' ? 'This Week' : timeRange === 'month' ? 'This Month' : timeRange === 'quarter' ? 'This Quarter' : 'This Year'}</p>
            </div>
          </div>
          
          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="text-xs text-gray-500">New Patients</p>
              <p className="text-lg font-semibold">32</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <p className="text-xs text-gray-500">Returning Patients</p>
              <p className="text-lg font-semibold">216</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-base font-medium">Revenue Breakdown</h3>
          </div>
          
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <div className="text-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-pie-chart mx-auto text-gray-300 mb-3">
                <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
                <path d="M22 12A10 10 0 0 0 12 2v10z" />
              </svg>
              <p className="text-gray-500">Revenue breakdown visualization would appear here</p>
              <p className="text-xs text-gray-400 mt-1">Showing data for: {timeRange === 'week' ? 'This Week' : timeRange === 'month' ? 'This Month' : timeRange === 'quarter' ? 'This Quarter' : 'This Year'}</p>
            </div>
          </div>
          
          <div className="mt-6 space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                <span className="text-sm">Consultations</span>
              </div>
              <span className="font-medium">$18,350</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <span className="text-sm">Lab Tests</span>
              </div>
              <span className="font-medium">$12,480</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
                <span className="text-sm">Procedures</span>
              </div>
              <span className="font-medium">$8,650</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                <span className="text-sm">Other</span>
              </div>
              <span className="font-medium">$3,100</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-base font-medium">Department Performance</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patients</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg. Wait Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Satisfaction</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Cardiology</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">56</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$14,850</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">25 mins</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '90%' }}></div>
                    </div>
                    <span className="ml-2 text-sm text-gray-800">90%</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Pediatrics</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">48</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$10,220</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">18 mins</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '95%' }}></div>
                    </div>
                    <span className="ml-2 text-sm text-gray-800">95%</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Orthopedics</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">37</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$8,750</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">35 mins</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-amber-500 h-2.5 rounded-full" style={{ width: '78%' }}></div>
                    </div>
                    <span className="ml-2 text-sm text-gray-800">78%</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Neurology</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">29</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$6,480</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">42 mins</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-amber-500 h-2.5 rounded-full" style={{ width: '82%' }}></div>
                    </div>
                    <span className="ml-2 text-sm text-gray-800">82%</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">General Medicine</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">78</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$9,680</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">28 mins</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '88%' }}></div>
                    </div>
                    <span className="ml-2 text-sm text-gray-800">88%</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Analytics;