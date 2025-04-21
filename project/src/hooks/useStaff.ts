import { useState, useEffect } from 'react';

interface StaffMember {
  id: number;
  name: string;
  position: string;
  department: string;
  email: string;
  phone: string;
  joinDate: string;
  status: 'Active' | 'Inactive' | 'On Leave';
}

// Sample data
const initialStaff: StaffMember[] = [
  {
    id: 1,
    name: 'Dr. James Wilson',
    position: 'Doctor',
    department: 'Cardiology',
    email: 'james.wilson@bonrecords.com',
    phone: '(555) 111-2222',
    joinDate: '2020-05-15',
    status: 'Active'
  },
  {
    id: 2,
    name: 'Dr. Lisa Chen',
    position: 'Doctor',
    department: 'Pediatrics',
    email: 'lisa.chen@bonrecords.com',
    phone: '(555) 222-3333',
    joinDate: '2019-11-03',
    status: 'Active'
  },
  {
    id: 3,
    name: 'Rebecca Taylor',
    position: 'Nurse',
    department: 'Emergency',
    email: 'rebecca.taylor@bonrecords.com',
    phone: '(555) 333-4444',
    joinDate: '2021-02-28',
    status: 'Active'
  },
  {
    id: 4,
    name: 'Dr. Michael Brown',
    position: 'Doctor',
    department: 'General Medicine',
    email: 'michael.brown@bonrecords.com',
    phone: '(555) 444-5555',
    joinDate: '2018-08-10',
    status: 'Active'
  },
  {
    id: 5,
    name: 'Jessica Adams',
    position: 'Lab Technician',
    department: 'Laboratory',
    email: 'jessica.adams@bonrecords.com',
    phone: '(555) 555-6666',
    joinDate: '2022-01-15',
    status: 'Active'
  },
  {
    id: 6,
    name: 'David Martinez',
    position: 'Pharmacist',
    department: 'Pharmacy',
    email: 'david.martinez@bonrecords.com',
    phone: '(555) 666-7777',
    joinDate: '2020-11-20',
    status: 'Active'
  },
  {
    id: 7,
    name: 'Sarah Johnson',
    position: 'Receptionist',
    department: 'Administration',
    email: 'sarah.johnson@bonrecords.com',
    phone: '(555) 777-8888',
    joinDate: '2021-09-05',
    status: 'On Leave'
  }
];

export const useStaff = () => {
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Simulate API call
    const fetchStaff = async () => {
      try {
        // In a real app, this would be an API call
        // const response = await fetch('/api/staff');
        // const data = await response.json();
        
        // Simulating network delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Using sample data
        setStaff(initialStaff);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
        setLoading(false);
      }
    };

    fetchStaff();
  }, []);

  const addStaff = (staffMember: Omit<StaffMember, 'id'> & { id: number }) => {
    const newStaffMember = {
      ...staffMember,
      id: staff.length > 0 ? Math.max(...staff.map(s => s.id)) + 1 : 1,
    };
    
    setStaff(prev => [...prev, newStaffMember]);
    return newStaffMember;
  };

  const updateStaff = (id: number, updates: Partial<StaffMember>) => {
    setStaff(prev => 
      prev.map(staffMember => 
        staffMember.id === id ? { ...staffMember, ...updates } : staffMember
      )
    );
  };

  const deleteStaff = (id: number) => {
    setStaff(prev => prev.filter(staffMember => staffMember.id !== id));
  };

  const getStaffMember = (id: number) => {
    return staff.find(staffMember => staffMember.id === id);
  };

  return { 
    staff, 
    loading, 
    error, 
    addStaff, 
    updateStaff, 
    deleteStaff,
    getStaffMember
  };
};