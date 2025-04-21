import { useState, useEffect } from 'react';

interface Patient {
  id: number;
  name: string;
  age: number;
  gender: string;
  phone: string;
  lastVisit: string;
  status: 'Active' | 'Inactive';
  email?: string;
  address?: string;
  bloodType?: string;
  medicalHistory?: string[];
  allergies?: string[];
  emergencyContact?: {
    name: string;
    phone: string;
    relationship: string;
  };
}

// Sample data
const initialPatients: Patient[] = [
  { 
    id: 1, 
    name: 'Sarah Johnson', 
    age: 45, 
    gender: 'Female', 
    phone: '(555) 123-4567', 
    lastVisit: '2023-05-15', 
    status: 'Active',
    bloodType: 'A+',
    address: '123 Main St, Anytown, US',
    medicalHistory: ['Hypertension', 'Diabetes Type 2'],
    allergies: ['Penicillin']
  },
  { 
    id: 2, 
    name: 'Robert Williams', 
    age: 62, 
    gender: 'Male', 
    phone: '(555) 234-5678', 
    lastVisit: '2023-04-22', 
    status: 'Active',
    bloodType: 'O-',
    address: '456 Oak Ave, Somewhere, US',
    medicalHistory: ['Coronary Artery Disease'],
    allergies: ['Sulfa Drugs']
  },
  { 
    id: 3, 
    name: 'Maria Garcia', 
    age: 38, 
    gender: 'Female', 
    phone: '(555) 345-6789', 
    lastVisit: '2023-05-10', 
    status: 'Active',
    bloodType: 'B+',
    address: '789 Pine St, Nowhere, US',
    medicalHistory: ['Asthma'],
    allergies: ['Latex']
  },
  { 
    id: 4, 
    name: 'Thomas Brown', 
    age: 55, 
    gender: 'Male', 
    phone: '(555) 456-7890', 
    lastVisit: '2023-03-18', 
    status: 'Inactive',
    bloodType: 'AB+',
    address: '101 Maple Dr, Elsewhere, US',
    medicalHistory: ['Stroke', 'High Cholesterol'],
    allergies: []
  },
  { 
    id: 5, 
    name: 'Emma Wilson', 
    age: 29, 
    gender: 'Female', 
    phone: '(555) 567-8901', 
    lastVisit: '2023-05-05', 
    status: 'Active',
    bloodType: 'A-',
    address: '202 Elm St, Anyplace, US',
    medicalHistory: ['Anxiety Disorder'],
    allergies: ['Peanuts']
  }
];

export const usePatients = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Simulate API call
    const fetchPatients = async () => {
      try {
        // In a real app, this would be an API call
        // const response = await fetch('/api/patients');
        // const data = await response.json();
        
        // Simulating network delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Using sample data
        setPatients(initialPatients);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  const addPatient = (patient: Omit<Patient, 'id'>) => {
    const newPatient = {
      ...patient,
      id: patients.length > 0 ? Math.max(...patients.map(p => p.id)) + 1 : 1,
      lastVisit: new Date().toISOString().split('T')[0],
      status: 'Active' as const
    };
    
    setPatients(prev => [...prev, newPatient]);
    return newPatient;
  };

  const updatePatient = (id: number, updates: Partial<Patient>) => {
    setPatients(prev => 
      prev.map(patient => 
        patient.id === id ? { ...patient, ...updates } : patient
      )
    );
  };

  const deletePatient = (id: number) => {
    setPatients(prev => prev.filter(patient => patient.id !== id));
  };

  const getPatient = (id: number) => {
    return patients.find(patient => patient.id === id);
  };

  return { 
    patients, 
    loading, 
    error, 
    addPatient, 
    updatePatient, 
    deletePatient,
    getPatient
  };
};