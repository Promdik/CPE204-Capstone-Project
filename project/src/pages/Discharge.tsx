import React, { useState } from 'react';
import { ChevronLeft, Filter, Search, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { usePatients } from '../hooks/usePatients';

interface DischargeRecord {
  id: number;
  patientId: number;
  patientName: string;
  admissionDate: string;
  dischargeDate: string;
  reason: string;
  doctor: string;
  status: 'Pending' | 'Completed';
  notes?: string;
}

const sampleDischarges: DischargeRecord[] = [
  {
    id: 1001,
    patientId: 3,
    patientName: 'Maria Garcia',
    admissionDate: '2023-05-05',
    dischargeDate: '2023-05-10',
    reason: 'Recovered from pneumonia',
    doctor: 'Dr. Lisa Chen',
    status: 'Completed',
    notes: 'Patient responded well to antibiotics. Follow-up appointment scheduled for 2 weeks.'
  },
  {
    id: 1002,
    patientId: 4,
    patientName: 'Thomas Brown',
    admissionDate: '2023-03-10',
    dischargeDate: '2023-03-18',
    reason: 'Post-surgery recovery',
    doctor: 'Dr. Michael Brown',
    status: 'Completed',
    notes: 'Surgery successful. Patient advised to rest for 4 weeks and avoid heavy lifting.'
  },
  {
    id: 1003,
    patientId: 1,
    patientName: 'Sarah Johnson',
    admissionDate: '2023-05-12',
    dischargeDate: '2023-05-15',
    reason: 'Stabilized blood pressure',
    doctor: 'Dr. James Wilson',
    status: 'Completed',
    notes: 'Blood pressure now within normal range. Continue prescribed medication.'
  },
  {
    id: 1004,
    patientId: 2,
    patientName: 'Robert Williams',
    admissionDate: '2023-06-20',
    dischargeDate: '',
    reason: 'Heart condition stabilized',
    doctor: 'Dr. James Wilson',
    status: 'Pending',
    notes: 'Patient showing good progress. Monitoring for 24 more hours before discharge.'
  }
];

const Discharge: React.FC = () => {
  const [discharges, setDischarges] = useState<DischargeRecord[]>(sampleDischarges);
  const [searchQuery, setSearchQuery] = useState('');
  const [showDischargeModal, setShowDischargeModal] = useState(false);
  const [selectedDischarge, setSelectedDischarge] = useState<DischargeRecord | null>(null);
  
  const navigate = useNavigate();
  const { patients } = usePatients();
  
  const filteredDischarges = discharges.filter(discharge => 
    discharge.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    discharge.doctor.toLowerCase().includes(searchQuery.toLowerCase()) ||
    discharge.reason.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleViewDischarge = (discharge: DischargeRecord) => {
    setSelectedDischarge(discharge);
    setShowDischargeModal(true);
  };
  
  const handleCompleteDischarge = (id: number) => {
    setDischarges(prev => 
      prev.map(discharge => 
        discharge.id === id 
          ? { 
              ...discharge, 
              status: 'Completed', 
              dischargeDate: new Date().toISOString().split('T')[0] 
            } 
          : discharge
      )
    );
    setShowDischargeModal(false);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <button 
          onClick={() => navigate('/patients')}
          className="p-2 rounded-full hover:bg-gray-100"
        >
          <ChevronLeft size={20} />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Patient Discharge</h1>
          <p className="text-gray-600">Manage patient discharge records and processes</p>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold">Discharge Records</h2>
        </div>
        
        <div className="p-6 flex flex-wrap gap-4 border-b">
          <div className="flex-1 min-w-[250px]">
            <div className="relative">
              <input
                type="text"
                placeholder="Search discharges..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Search size={20} className="absolute left-3 top-2.5 text-gray-400" />
            </div>
          </div>
          
          <button className="px-4 py-2 border rounded-lg hover:bg-gray-50 flex items-center gap-2">
            <Filter size={18} />
            Filter
          </button>
          
          <button 
            onClick={() => navigate('/patients')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Process New Discharge
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Admission Date</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Discharge Date</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doctor</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredDischarges.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-4 text-center text-gray-500">No discharge records found</td>
                </tr>
              ) : (
                filteredDischarges.map((discharge) => (
                  <tr key={discharge.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user text-gray-500">
                            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                            <circle cx="12" cy="7" r="4" />
                          </svg>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{discharge.patientName}</div>
                          <div className="text-sm text-gray-500">ID: {discharge.patientId}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {discharge.admissionDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {discharge.dischargeDate || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {discharge.reason}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {discharge.doctor}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        discharge.status === 'Completed' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {discharge.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button 
                        onClick={() => handleViewDischarge(discharge)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Discharge Details Modal */}
      {showDischargeModal && selectedDischarge && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b flex justify-between items-center">
              <h2 className="text-lg font-semibold">Discharge Record Details</h2>
              <button 
                onClick={() => setShowDischargeModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x">
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-6">
              <div className="mb-6 flex items-center">
                <div className="flex-shrink-0 h-16 w-16 bg-gray-200 rounded-full flex items-center justify-center mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user text-gray-500">
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{selectedDischarge.patientName}</h3>
                  <p className="text-gray-500">Patient ID: {selectedDischarge.patientId}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Admission Information</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-700">Date</span>
                      <span className="font-medium">{selectedDischarge.admissionDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">Doctor</span>
                      <span className="font-medium">{selectedDischarge.doctor}</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Discharge Information</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-700">Date</span>
                      <span className="font-medium">{selectedDischarge.dischargeDate || 'Pending'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">Status</span>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        selectedDischarge.status === 'Completed' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {selectedDischarge.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-500 mb-2">Reason for Discharge</h4>
                <p className="bg-gray-50 p-4 rounded-lg">{selectedDischarge.reason}</p>
              </div>
              
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-500 mb-2">Notes</h4>
                <p className="bg-gray-50 p-4 rounded-lg">{selectedDischarge.notes || 'No notes recorded'}</p>
              </div>
              
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowDischargeModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Close
                </button>
                
                {selectedDischarge.status === 'Pending' && (
                  <button
                    onClick={() => handleCompleteDischarge(selectedDischarge.id)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2"
                  >
                    <Clock size={18} />
                    Complete Discharge
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Discharge;