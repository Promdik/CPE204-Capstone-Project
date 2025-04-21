import React, { useState } from 'react';
import { ChevronLeft, Search, Filter, Plus, Calendar, Clock, User, ArrowLeft, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { usePatients } from '../hooks/usePatients';

interface Appointment {
  id: number;
  patientId: number;
  patientName: string;
  date: string;
  time: string;
  doctor: string;
  department: string;
  type: string;
  status: 'Scheduled' | 'Completed' | 'Cancelled' | 'No Show' | 'In Progress';
  notes?: string;
}

const sampleAppointments: Appointment[] = [
  {
    id: 1001,
    patientId: 1,
    patientName: 'Sarah Johnson',
    date: '2023-07-10',
    time: '09:30 AM',
    doctor: 'Dr. James Wilson',
    department: 'Cardiology',
    type: 'Regular Checkup',
    status: 'Scheduled',
    notes: 'Patient is coming in for a routine cardiac examination.'
  },
  {
    id: 1002,
    patientId: 2,
    patientName: 'Robert Williams',
    date: '2023-07-10',
    time: '10:15 AM',
    doctor: 'Dr. Lisa Chen',
    department: 'General Medicine',
    type: 'Follow-up',
    status: 'Scheduled',
    notes: 'Follow-up after recent hospitalization.'
  },
  {
    id: 1003,
    patientId: 3,
    patientName: 'Maria Garcia',
    date: '2023-07-10',
    time: '11:45 AM',
    doctor: 'Dr. James Wilson',
    department: 'Cardiology',
    type: 'Consultation',
    status: 'Scheduled',
    notes: 'New patient referral for heart palpitations.'
  },
  {
    id: 1004,
    patientId: 4,
    patientName: 'Thomas Brown',
    date: '2023-07-09',
    time: '02:30 PM',
    doctor: 'Dr. Michael Brown',
    department: 'Neurology',
    type: 'Consultation',
    status: 'Completed',
    notes: 'Patient referred for recurring headaches.'
  },
  {
    id: 1005,
    patientId: 5,
    patientName: 'Emma Wilson',
    date: '2023-07-11',
    time: '03:15 PM',
    doctor: 'Dr. Lisa Chen',
    department: 'General Medicine',
    type: 'Regular Checkup',
    status: 'Scheduled',
    notes: 'Annual physical examination.'
  }
];

// Get the current date in YYYY-MM-DD format
const getCurrentDate = () => {
  const today = new Date();
  return today.toISOString().split('T')[0];
};

const Appointments: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>(sampleAppointments);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState<string>(getCurrentDate());
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    patientId: '',
    date: getCurrentDate(),
    time: '',
    doctor: '',
    department: '',
    type: '',
    notes: ''
  });
  
  const navigate = useNavigate();
  const { patients } = usePatients();
  
  const filteredAppointments = appointments.filter(appointment => 
    (searchQuery === '' || 
     appointment.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
     appointment.doctor.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (selectedDate === '' || appointment.date === selectedDate)
  );
  
  // Group appointments by time
  const appointmentsByTime: Record<string, Appointment[]> = {};
  filteredAppointments.forEach(appointment => {
    if (!appointmentsByTime[appointment.time]) {
      appointmentsByTime[appointment.time] = [];
    }
    appointmentsByTime[appointment.time].push(appointment);
  });
  
  // Sort times
  const sortedTimes = Object.keys(appointmentsByTime).sort((a, b) => {
    const timeA = new Date(`1970-01-01 ${a}`);
    const timeB = new Date(`1970-01-01 ${b}`);
    return timeA.getTime() - timeB.getTime();
  });
  
  const handlePrevDay = () => {
    const date = new Date(selectedDate);
    date.setDate(date.getDate() - 1);
    setSelectedDate(date.toISOString().split('T')[0]);
  };
  
  const handleNextDay = () => {
    const date = new Date(selectedDate);
    date.setDate(date.getDate() + 1);
    setSelectedDate(date.toISOString().split('T')[0]);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const selectedPatient = patients.find(p => p.id.toString() === formData.patientId);
    
    if (!selectedPatient) return;
    
    const newAppointment: Appointment = {
      id: Math.max(...appointments.map(a => a.id), 0) + 1,
      patientId: selectedPatient.id,
      patientName: selectedPatient.name,
      date: formData.date,
      time: formData.time,
      doctor: formData.doctor,
      department: formData.department,
      type: formData.type,
      status: 'Scheduled',
      notes: formData.notes
    };
    
    setAppointments(prev => [...prev, newAppointment]);
    setShowAddModal(false);
    setFormData({
      patientId: '',
      date: getCurrentDate(),
      time: '',
      doctor: '',
      department: '',
      type: '',
      notes: ''
    });
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'In Progress':
        return 'bg-purple-100 text-purple-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      case 'No Show':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
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
          <h1 className="text-2xl font-bold text-gray-800">Appointments</h1>
          <p className="text-gray-600">Manage patient appointments and schedule</p>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6 border-b flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center space-x-4">
            <button 
              onClick={handlePrevDay}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <ArrowLeft size={20} />
            </button>
            <div className="flex items-center space-x-2">
              <Calendar size={20} className="text-blue-600" />
              <span className="font-medium">{formatDate(selectedDate)}</span>
            </div>
            <button 
              onClick={handleNextDay}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <ArrowRight size={20} />
            </button>
          </div>
          
          <div className="flex flex-wrap gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search appointments..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
              />
              <Search size={20} className="absolute left-3 top-2.5 text-gray-400" />
            </div>
            
            <button 
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <Plus size={18} />
              Add Appointment
            </button>
          </div>
        </div>
        
        <div className="divide-y">
          {sortedTimes.length === 0 ? (
            <div className="p-12 text-center">
              <Calendar size={48} className="mx-auto text-gray-300 mb-3" />
              <h3 className="text-xl font-medium text-gray-600">No appointments for this day</h3>
              <p className="text-gray-500 mt-1">Select a different date or add a new appointment</p>
            </div>
          ) : (
            sortedTimes.map(time => (
              <div key={time} className="px-6 py-4">
                <div className="flex items-center mb-4">
                  <Clock size={18} className="text-gray-400 mr-2" />
                  <h3 className="font-medium">{time}</h3>
                </div>
                
                <div className="space-y-4">
                  {appointmentsByTime[time].map(appointment => (
                    <div 
                      key={appointment.id} 
                      className="border rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer flex flex-wrap justify-between gap-4"
                    >
                      <div className="flex items-start space-x-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <User size={20} className="text-blue-700" />
                        </div>
                        <div>
                          <div className="font-medium">{appointment.patientName}</div>
                          <div className="text-sm text-gray-500">Patient ID: {appointment.patientId}</div>
                          <div className="mt-2">
                            <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(appointment.status)}`}>
                              {appointment.status}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-sm space-y-1">
                        <div><span className="text-gray-500">Type:</span> {appointment.type}</div>
                        <div><span className="text-gray-500">Doctor:</span> {appointment.doctor}</div>
                        <div><span className="text-gray-500">Department:</span> {appointment.department}</div>
                      </div>
                      
                      <div className="text-sm text-gray-500 flex-1 min-w-[200px]">
                        <div className="font-medium text-gray-700 mb-1">Notes:</div>
                        <p>{appointment.notes || 'No notes'}</p>
                      </div>
                      
                      <div className="flex space-x-2">
                        <button className="px-3 py-1 border rounded-md text-gray-700 hover:bg-gray-100 text-sm">
                          Edit
                        </button>
                        <button className="px-3 py-1 border rounded-md text-blue-700 hover:bg-blue-50 text-sm">
                          Check In
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      
      {/* Add Appointment Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <h2 className="text-lg font-semibold">Schedule New Appointment</h2>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="patientId" className="block text-sm font-medium text-gray-700 mb-1">
                    Patient *
                  </label>
                  <select
                    id="patientId"
                    name="patientId"
                    required
                    value={formData.patientId}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select Patient</option>
                    {patients.map(patient => (
                      <option key={patient.id} value={patient.id}>
                        {patient.name} (ID: {patient.id})
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                      Date *
                    </label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      required
                      value={formData.date}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
                      Time *
                    </label>
                    <input
                      type="time"
                      id="time"
                      name="time"
                      required
                      value={formData.time}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="doctor" className="block text-sm font-medium text-gray-700 mb-1">
                    Doctor *
                  </label>
                  <select
                    id="doctor"
                    name="doctor"
                    required
                    value={formData.doctor}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select Doctor</option>
                    <option value="Dr. James Wilson">Dr. James Wilson (Cardiology)</option>
                    <option value="Dr. Lisa Chen">Dr. Lisa Chen (General Medicine)</option>
                    <option value="Dr. Michael Brown">Dr. Michael Brown (Neurology)</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">
                    Department *
                  </label>
                  <select
                    id="department"
                    name="department"
                    required
                    value={formData.department}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select Department</option>
                    <option value="Cardiology">Cardiology</option>
                    <option value="General Medicine">General Medicine</option>
                    <option value="Neurology">Neurology</option>
                    <option value="Pediatrics">Pediatrics</option>
                    <option value="Orthopedics">Orthopedics</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                    Appointment Type *
                  </label>
                  <select
                    id="type"
                    name="type"
                    required
                    value={formData.type}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select Type</option>
                    <option value="Regular Checkup">Regular Checkup</option>
                    <option value="Follow-up">Follow-up</option>
                    <option value="Consultation">Consultation</option>
                    <option value="Procedure">Procedure</option>
                    <option value="Emergency">Emergency</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                    Notes
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    rows={3}
                    value={formData.notes}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Schedule Appointment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Appointments;