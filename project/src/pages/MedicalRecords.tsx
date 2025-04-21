import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, FileText, FilePlus, Clipboard, Activity, PenLine, Calendar } from 'lucide-react';
import { usePatients } from '../hooks/usePatients';

const MedicalRecords: React.FC = () => {
  const [searchParams] = useSearchParams();
  const patientId = searchParams.get('id') ? parseInt(searchParams.get('id')!) : null;
  const navigate = useNavigate();
  
  const { patients, getPatient } = usePatients();
  const [activeTab, setActiveTab] = useState('summary');
  const [patient, setPatient] = useState<any>(null);
  
  useEffect(() => {
    if (patientId) {
      const foundPatient = getPatient(patientId);
      if (foundPatient) {
        setPatient(foundPatient);
      }
    }
  }, [patientId, patients, getPatient]);
  
  const tabs = [
    { id: 'summary', label: 'Summary', icon: <FileText size={16} /> },
    { id: 'visits', label: 'Visits', icon: <Calendar size={16} /> },
    { id: 'tests', label: 'Lab Tests', icon: <Activity size={16} /> },
    { id: 'prescriptions', label: 'Prescriptions', icon: <Clipboard size={16} /> },
    { id: 'notes', label: 'Notes', icon: <PenLine size={16} /> },
  ];
  
  // Mock data for visits
  const visits = [
    { date: '2023-05-15', type: 'Regular Checkup', doctor: 'Dr. James Wilson', notes: 'Patient reported feeling well. BP 120/80, normal vital signs.' },
    { date: '2023-03-22', type: 'Emergency', doctor: 'Dr. Lisa Chen', notes: 'Patient admitted with severe abdominal pain. Diagnosed with appendicitis.' },
    { date: '2023-01-10', type: 'Follow-up', doctor: 'Dr. James Wilson', notes: 'Follow-up after surgery. Incision healing well, no complications reported.' }
  ];
  
  // Mock data for lab tests
  const labTests = [
    { date: '2023-05-15', name: 'Complete Blood Count', status: 'Completed', result: 'Normal', orderedBy: 'Dr. James Wilson' },
    { date: '2023-05-15', name: 'Urinalysis', status: 'Completed', result: 'Normal', orderedBy: 'Dr. James Wilson' },
    { date: '2023-03-22', name: 'CT Scan - Abdomen', status: 'Completed', result: 'Appendicitis', orderedBy: 'Dr. Lisa Chen' },
    { date: '2023-01-10', name: 'Post-Surgery Blood Work', status: 'Completed', result: 'Normal', orderedBy: 'Dr. James Wilson' }
  ];
  
  // Mock data for prescriptions
  const prescriptions = [
    { date: '2023-05-15', medication: 'Lisinopril 10mg', dosage: '1 tablet daily', duration: '30 days', prescribedBy: 'Dr. James Wilson' },
    { date: '2023-03-22', medication: 'Amoxicillin 500mg', dosage: '1 capsule every 8 hours', duration: '7 days', prescribedBy: 'Dr. Lisa Chen' },
    { date: '2023-03-22', medication: 'Ibuprofen 600mg', dosage: '1 tablet every 6 hours as needed for pain', duration: '5 days', prescribedBy: 'Dr. Lisa Chen' },
    { date: '2023-01-10', medication: 'Acetaminophen 500mg', dosage: '1-2 tablets every 6 hours as needed for pain', duration: '3 days', prescribedBy: 'Dr. James Wilson' }
  ];
  
  // Mock data for notes
  const notes = [
    { date: '2023-05-15', title: 'Regular Checkup Notes', content: 'Patient reports feeling well. No complaints. Maintaining healthy diet and regular exercise.', author: 'Dr. James Wilson' },
    { date: '2023-03-22', title: 'Emergency Admission', content: 'Patient presented with severe abdominal pain in right lower quadrant. CT scan confirmed appendicitis. Scheduled for emergency appendectomy.', author: 'Dr. Lisa Chen' },
    { date: '2023-03-22', title: 'Surgery Notes', content: 'Appendectomy performed without complications. Estimated blood loss: minimal. Patient tolerated procedure well.', author: 'Dr. Michael Johnson' },
    { date: '2023-01-10', title: 'Follow-up Notes', content: 'Incision healing well. No signs of infection. Patient reports minimal discomfort. Can resume normal activities.', author: 'Dr. James Wilson' }
  ];
  
  if (!patient && patientId) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Loading patient data...</p>
      </div>
    );
  }
  
  if (!patient) {
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
            <h1 className="text-2xl font-bold text-gray-800">Medical Records</h1>
            <p className="text-gray-600">View and manage patient medical records</p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <FileText size={48} className="mx-auto text-gray-400 mb-4" />
          <h2 className="text-xl font-semibold text-gray-700 mb-2">No Patient Selected</h2>
          <p className="text-gray-600 mb-6">Please select a patient from the patients list to view their medical records</p>
          <button 
            onClick={() => navigate('/patients')}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Go to Patients List
          </button>
        </div>
      </div>
    );
  }
  
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
          <h1 className="text-2xl font-bold text-gray-800">Medical Records</h1>
          <p className="text-gray-600">Viewing records for {patient.name}</p>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6 border-b">
          <div className="flex flex-wrap justify-between items-start gap-4">
            <div>
              <h2 className="text-xl font-semibold">{patient.name}</h2>
              <div className="mt-1 flex items-center text-sm text-gray-500 space-x-4">
                <span>ID: {patient.id}</span>
                <span>•</span>
                <span>{patient.age} years</span>
                <span>•</span>
                <span>{patient.gender}</span>
                {patient.bloodType && (
                  <>
                    <span>•</span>
                    <span>Blood Type: {patient.bloodType}</span>
                  </>
                )}
              </div>
            </div>
            
            <div className="flex space-x-2">
              <button className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-printer">
                  <polyline points="6 9 6 2 18 2 18 9" />
                  <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                  <rect width="12" height="8" x="6" y="14" />
                </svg>
                Print
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2">
                <FilePlus size={16} />
                Add Record
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-b">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 flex items-center gap-2 whitespace-nowrap transition-colors ${
                  activeTab === tab.id 
                    ? 'border-b-2 border-blue-600 text-blue-600 font-medium' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>
        
        <div className="p-6">
          {activeTab === 'summary' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border rounded-lg overflow-hidden">
                  <div className="bg-gray-50 px-4 py-2 border-b">
                    <h3 className="font-medium">Personal Information</h3>
                  </div>
                  <div className="p-4 space-y-3">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="text-sm text-gray-500">Full Name</div>
                      <div className="text-sm font-medium">{patient.name}</div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="text-sm text-gray-500">Patient ID</div>
                      <div className="text-sm font-medium">{patient.id}</div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="text-sm text-gray-500">Age</div>
                      <div className="text-sm font-medium">{patient.age} years</div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="text-sm text-gray-500">Gender</div>
                      <div className="text-sm font-medium">{patient.gender}</div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="text-sm text-gray-500">Blood Type</div>
                      <div className="text-sm font-medium">{patient.bloodType || 'Not recorded'}</div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="text-sm text-gray-500">Phone</div>
                      <div className="text-sm font-medium">{patient.phone}</div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="text-sm text-gray-500">Address</div>
                      <div className="text-sm font-medium">{patient.address || 'Not recorded'}</div>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-lg overflow-hidden">
                  <div className="bg-gray-50 px-4 py-2 border-b">
                    <h3 className="font-medium">Medical Information</h3>
                  </div>
                  <div className="p-4 space-y-3">
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Allergies</div>
                      <div className="text-sm">
                        {patient.allergies && patient.allergies.length > 0 
                          ? patient.allergies.map((allergy: string, index: number) => (
                              <span 
                                key={index} 
                                className="inline-block bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs mr-2 mb-2"
                              >
                                {allergy}
                              </span>
                            ))
                          : <span className="text-gray-500">No known allergies</span>
                        }
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Medical History</div>
                      <div className="text-sm">
                        {patient.medicalHistory && patient.medicalHistory.length > 0 
                          ? patient.medicalHistory.map((condition: string, index: number) => (
                              <span 
                                key={index} 
                                className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs mr-2 mb-2"
                              >
                                {condition}
                              </span>
                            ))
                          : <span className="text-gray-500">No medical history recorded</span>
                        }
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Current Medications</div>
                      <div className="text-sm">
                        {prescriptions && prescriptions.length > 0 
                          ? prescriptions.slice(0, 2).map((prescription, index) => (
                              <div key={index} className="mb-2">
                                <div className="font-medium">{prescription.medication}</div>
                                <div className="text-gray-500 text-xs">{prescription.dosage}</div>
                              </div>
                            ))
                          : <span className="text-gray-500">No active medications</span>
                        }
                        {prescriptions && prescriptions.length > 2 && (
                          <a className="text-blue-600 text-xs hover:underline cursor-pointer" onClick={() => setActiveTab('prescriptions')}>
                            View all medications
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border rounded-lg overflow-hidden">
                <div className="bg-gray-50 px-4 py-2 border-b">
                  <h3 className="font-medium">Recent Visits</h3>
                </div>
                <div className="divide-y">
                  {visits.slice(0, 3).map((visit, index) => (
                    <div key={index} className="p-4">
                      <div className="flex justify-between">
                        <div className="font-medium">{visit.type}</div>
                        <div className="text-sm text-gray-500">{visit.date}</div>
                      </div>
                      <div className="text-sm text-gray-500 mt-1">{visit.doctor}</div>
                      <div className="text-sm mt-2">{visit.notes}</div>
                    </div>
                  ))}
                  {visits.length > 3 && (
                    <div className="p-4 text-center">
                      <button 
                        onClick={() => setActiveTab('visits')}
                        className="text-blue-600 hover:underline text-sm"
                      >
                        View all visits
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'visits' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Patient Visits</h3>
                <button className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-plus">
                    <path d="M5 12h14" />
                    <path d="M12 5v14" />
                  </svg>
                  Add Visit
                </button>
              </div>
              
              <div className="bg-white border rounded-lg overflow-hidden">
                {visits.length === 0 ? (
                  <div className="p-6 text-center text-gray-500">No visits recorded</div>
                ) : (
                  <div className="divide-y">
                    {visits.map((visit, index) => (
                      <div key={index} className="p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex flex-wrap justify-between">
                          <div>
                            <div className="font-medium">{visit.type}</div>
                            <div className="text-sm text-gray-500 mt-1">{visit.doctor}</div>
                          </div>
                          <div className="text-sm text-gray-500">{visit.date}</div>
                        </div>
                        <div className="text-sm mt-3">{visit.notes}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
          
          {activeTab === 'tests' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Lab Tests & Results</h3>
                <button className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-plus">
                    <path d="M5 12h14" />
                    <path d="M12 5v14" />
                  </svg>
                  Order Test
                </button>
              </div>
              
              <div className="bg-white border rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Test Name</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Result</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ordered By</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {labTests.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-6 py-4 text-center text-gray-500">No lab tests recorded</td>
                      </tr>
                    ) : (
                      labTests.map((test, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{test.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{test.date}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              {test.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{test.result}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{test.orderedBy}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          {activeTab === 'prescriptions' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Prescriptions</h3>
                <button className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-plus">
                    <path d="M5 12h14" />
                    <path d="M12 5v14" />
                  </svg>
                  Add Prescription
                </button>
              </div>
              
              <div className="bg-white border rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Medication</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dosage</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prescribed By</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {prescriptions.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-6 py-4 text-center text-gray-500">No prescriptions recorded</td>
                      </tr>
                    ) : (
                      prescriptions.map((prescription, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{prescription.medication}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{prescription.dosage}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{prescription.duration}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{prescription.date}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{prescription.prescribedBy}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          {activeTab === 'notes' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Clinical Notes</h3>
                <button className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-plus">
                    <path d="M5 12h14" />
                    <path d="M12 5v14" />
                  </svg>
                  Add Note
                </button>
              </div>
              
              <div className="space-y-4">
                {notes.length === 0 ? (
                  <div className="bg-white border rounded-lg p-6 text-center text-gray-500">No clinical notes recorded</div>
                ) : (
                  notes.map((note, index) => (
                    <div key={index} className="bg-white border rounded-lg overflow-hidden">
                      <div className="p-4 border-b bg-gray-50 flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">{note.title}</h4>
                          <div className="text-xs text-gray-500 mt-1">By {note.author} on {note.date}</div>
                        </div>
                        <button className="text-gray-500 hover:text-gray-700">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-pencil">
                            <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                            <path d="m15 5 4 4" />
                          </svg>
                        </button>
                      </div>
                      <div className="p-4 text-sm">
                        {note.content}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MedicalRecords;