import React from 'react';
import { Users, Calendar, DollarSign, AlertCircle, TrendingUp, Activity, Clock, UserCheck } from 'lucide-react';

const StatCard: React.FC<{
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
}> = ({ title, value, icon, color }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6 flex items-center">
      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${color}`}>
        {icon}
      </div>
      <div className="ml-4">
        <h3 className="text-gray-500 text-sm">{title}</h3>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
};

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600">Welcome to BonRecords Hospital Management System</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Patients" 
          value="248" 
          icon={<Users size={24} className="text-white" />} 
          color="bg-blue-600"
        />
        <StatCard 
          title="Today's Appointments" 
          value="32" 
          icon={<Calendar size={24} className="text-white" />} 
          color="bg-green-600"
        />
        <StatCard 
          title="Monthly Revenue" 
          value="$42,580" 
          icon={<DollarSign size={24} className="text-white" />} 
          color="bg-amber-600"
        />
        <StatCard 
          title="Pending Lab Results" 
          value="18" 
          icon={<AlertCircle size={24} className="text-white" />} 
          color="bg-red-600"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-gray-800">Recent Patients</h2>
            <a href="/patients" className="text-blue-600 hover:underline text-sm">View all</a>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">Emma Wilson</td>
                  <td className="px-4 py-3 text-sm text-gray-500">ID: 5</td>
                  <td className="px-4 py-3 text-sm text-gray-500">2023-05-05</td>
                  <td className="px-4 py-3 text-sm"><span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Active</span></td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">Thomas Brown</td>
                  <td className="px-4 py-3 text-sm text-gray-500">ID: 4</td>
                  <td className="px-4 py-3 text-sm text-gray-500">2023-03-18</td>
                  <td className="px-4 py-3 text-sm"><span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">Inactive</span></td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">Maria Garcia</td>
                  <td className="px-4 py-3 text-sm text-gray-500">ID: 3</td>
                  <td className="px-4 py-3 text-sm text-gray-500">2023-05-10</td>
                  <td className="px-4 py-3 text-sm"><span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Active</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-gray-800">Today's Appointments</h2>
            <a href="/patients/appointments" className="text-blue-600 hover:underline text-sm">View all</a>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <Clock size={20} className="text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">Sarah Johnson</p>
                  <p className="text-sm text-gray-500">09:30 AM - General Checkup</p>
                </div>
              </div>
              <span className="px-3 py-1 text-xs rounded-full bg-amber-100 text-amber-800">Waiting</span>
            </div>
            <div className="flex justify-between items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <Clock size={20} className="text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">Robert Williams</p>
                  <p className="text-sm text-gray-500">10:15 AM - Blood Test</p>
                </div>
              </div>
              <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-800">Completed</span>
            </div>
            <div className="flex justify-between items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <Clock size={20} className="text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">Maria Garcia</p>
                  <p className="text-sm text-gray-500">11:45 AM - Cardiology</p>
                </div>
              </div>
              <span className="px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-800">In Progress</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6 lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-gray-800">Performance Metrics</h2>
            <select className="text-sm border rounded-md px-2 py-1">
              <option>This Week</option>
              <option>This Month</option>
              <option>This Year</option>
            </select>
          </div>
          <div className="flex justify-center items-center h-64 bg-gray-50 rounded-lg">
            <div className="text-center">
              <TrendingUp size={48} className="text-blue-500 mx-auto mb-2" />
              <p className="text-gray-500 text-sm">Chart visualization would appear here</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-gray-800">Staff On Duty</h2>
            <a href="/staff" className="text-blue-600 hover:underline text-sm">View all</a>
          </div>
          <div className="space-y-4">
            <div className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                <UserCheck size={20} className="text-green-600" />
              </div>
              <div>
                <p className="font-medium">Dr. James Wilson</p>
                <p className="text-xs text-gray-500">Cardiology</p>
              </div>
            </div>
            <div className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                <UserCheck size={20} className="text-green-600" />
              </div>
              <div>
                <p className="font-medium">Dr. Lisa Chen</p>
                <p className="text-xs text-gray-500">Pediatrics</p>
              </div>
            </div>
            <div className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                <UserCheck size={20} className="text-green-600" />
              </div>
              <div>
                <p className="font-medium">Nurse Rebecca Taylor</p>
                <p className="text-xs text-gray-500">Emergency</p>
              </div>
            </div>
            <div className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                <UserCheck size={20} className="text-green-600" />
              </div>
              <div>
                <p className="font-medium">Dr. Michael Brown</p>
                <p className="text-xs text-gray-500">General Medicine</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;