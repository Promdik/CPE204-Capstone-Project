import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Users, User, Calendar, LogOut, FileText, DollarSign, Package, FlaskRound as Flask, BarChart2, StethoscopeIcon } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Sidebar: React.FC = () => {
  const { logout } = useAuth();

  const navItems = [
    { to: '/', icon: <Home size={20} />, label: 'Dashboard' },
    { to: '/patients', icon: <Users size={20} />, label: 'Patient Records' },
    { to: '/staff', icon: <User size={20} />, label: 'Staff Management' },
    { to: '/billing', icon: <DollarSign size={20} />, label: 'Billing' },
    { to: '/inventory', icon: <Package size={20} />, label: 'Inventory' },
    { to: '/lab', icon: <Flask size={20} />, label: 'Lab Integration' },
    { to: '/analytics', icon: <BarChart2 size={20} />, label: 'Analytics' },
  ];

  const patientSubitems = [
    { to: '/patients/registration', icon: <User size={16} />, label: 'Registration' },
    { to: '/patients/medical-records', icon: <FileText size={16} />, label: 'Medical Records' },
    { to: '/patients/appointments', icon: <Calendar size={16} />, label: 'Appointments' },
    { to: '/patients/discharge', icon: <LogOut size={16} />, label: 'Discharge' },
  ];

  return (
    <div className="w-64 bg-blue-700 text-white flex flex-col h-full">
      <div className="p-5 border-b border-blue-800">
        <div className="flex items-center space-x-2">
          <StethoscopeIcon size={24} />
          <h1 className="text-xl font-bold">bonrecords</h1>
        </div>
      </div>
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.label}>
              <NavLink 
                to={item.to} 
                end={item.to === '/'}
                className={({ isActive }) => 
                  `flex items-center px-4 py-3 text-white hover:bg-blue-800 transition-colors ${
                    isActive ? 'bg-blue-800' : ''
                  }`
                }
              >
                <span className="mr-3">{item.icon}</span>
                <span>{item.label}</span>
              </NavLink>
              
              {item.label === 'Patient Records' && (
                <ul className="ml-6 mt-1 space-y-1">
                  {patientSubitems.map((subitem) => (
                    <li key={subitem.label}>
                      <NavLink 
                        to={subitem.to} 
                        className={({ isActive }) => 
                          `flex items-center px-4 py-2 text-sm text-white hover:bg-blue-800 transition-colors ${
                            isActive ? 'bg-blue-800' : ''
                          }`
                        }
                      >
                        <span className="mr-2">{subitem.icon}</span>
                        <span>{subitem.label}</span>
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t border-blue-800">
        <button 
          onClick={logout}
          className="flex items-center w-full px-4 py-2 text-white hover:bg-blue-800 rounded transition-colors"
        >
          <LogOut size={20} className="mr-3" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;