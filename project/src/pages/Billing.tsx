import React, { useState } from 'react';
import { X, Plus, Trash2, Eye, Download, CreditCard } from "lucide-react"; // Using lucide-react icons

interface Invoice {
  id: number;
  patientId: number;
  patientName: string;
  date: string;
  dueDate: string;
  amount: number;
  status: 'Paid' | 'Pending' | 'Overdue';
  items: {
    description: string;
    quantity: number;
    unitPrice: number;
    total: number;
  }[];
  paymentMethod?: string;
  paymentDate?: string;
  billingAddress?: string;
  taxAmount?: number;
}

interface Patient {
  id: number;
  name: string;
  // Add other patient properties as needed
}

interface InvoiceComponentProps {
  patients: Patient[];
  invoices: Invoice[];
  setInvoices: React.Dispatch<React.SetStateAction<Invoice[]>>;
}

const InvoiceComponent: React.FC<InvoiceComponentProps> = ({ 
  patients = [], // Default empty array to prevent undefined
  invoices = [], // Default empty array to prevent undefined
  setInvoices 
}) => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newInvoice, setNewInvoice] = useState({
    patientId: '',
    items: [{ description: '', quantity: 1, unitPrice: 0, total: 0 }],
    dueDate: '',
    billingAddress: '',
  });

  const handleAddItem = () => {
    setNewInvoice(prev => ({
      ...prev,
      items: [...prev.items, { description: '', quantity: 1, unitPrice: 0, total: 0 }]
    }));
  };

  const handleRemoveItem = (index: number) => {
    setNewInvoice(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index)
    }));
  };

  const handleItemChange = (index: number, field: string, value: string | number) => {
    setNewInvoice(prev => ({
      ...prev,
      items: prev.items.map((item, i) => {
        if (i === index) {
          const updatedItem = { ...item, [field]: value };
          if (field === 'quantity' || field === 'unitPrice') {
            updatedItem.total = updatedItem.quantity * updatedItem.unitPrice;
          }
          return updatedItem;
        }
        return item;
      })
    }));
  };

  const handleCreateInvoice = () => {
    // Using a safe array for Math.max to avoid empty array issues
    const safeInvoices = invoices || [];
    const nextId = safeInvoices.length > 0 
      ? Math.max(...safeInvoices.map(i => i.id)) + 1 
      : 1;
    
    const total = newInvoice.items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
    const tax = total * 0.1; // 10% tax

    const selectedPatient = patients.find(p => p.id.toString() === newInvoice.patientId);

    const invoice: Invoice = {
      id: nextId,
      patientId: parseInt(newInvoice.patientId) || 0,
      patientName: selectedPatient?.name || '',
      date: new Date().toISOString().split('T')[0],
      dueDate: newInvoice.dueDate,
      amount: total + tax,
      status: 'Pending',
      items: newInvoice.items,
      taxAmount: tax,
      billingAddress: newInvoice.billingAddress
    };

    setInvoices(prev => [...(prev || []), invoice]);
    setShowCreateModal(false);
    setNewInvoice({
      patientId: '',
      items: [{ description: '', quantity: 1, unitPrice: 0, total: 0 }],
      dueDate: '',
      billingAddress: '',
    });
  };

  const handleProcessPayment = (invoice: Invoice) => {
    setInvoices(prev => 
      (prev || []).map(inv => 
        inv.id === invoice.id 
          ? { 
              ...inv, 
              status: 'Paid',
              paymentDate: new Date().toISOString().split('T')[0],
              paymentMethod: 'Credit Card'
            } 
          : inv
      )
    );
  };

  // Added missing function
  const handleViewDetails = (invoice: Invoice) => {
    // Implement view details functionality here
    console.log("Viewing details for invoice:", invoice);
    // You could implement a modal to show details or navigate to a details page
  };

  // Safety check for null/undefined arrays
  const safePatients = patients || [];
  const safeInvoices = invoices || [];

  return (
    <div className="w-full">
      {/* Add button to create new invoice */}
      <div className="mb-4">
        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus size={18} />
          Create Invoice
        </button>
      </div>

      {/* Invoice List */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b text-left">ID</th>
              <th className="py-2 px-4 border-b text-left">Patient</th>
              <th className="py-2 px-4 border-b text-left">Date</th>
              <th className="py-2 px-4 border-b text-left">Due</th>
              <th className="py-2 px-4 border-b text-right">Amount</th>
              <th className="py-2 px-4 border-b text-left">Status</th>
              <th className="py-2 px-4 border-b text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {safeInvoices.length > 0 ? (
              safeInvoices.map(invoice => (
                <tr key={invoice.id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">#{invoice.id}</td>
                  <td className="py-2 px-4 border-b">{invoice.patientName}</td>
                  <td className="py-2 px-4 border-b">{invoice.date}</td>
                  <td className="py-2 px-4 border-b">{invoice.dueDate}</td>
                  <td className="py-2 px-4 border-b text-right">${invoice.amount.toFixed(2)}</td>
                  <td className="py-2 px-4 border-b">
                    <span className={`inline-block px-2 py-1 rounded text-xs ${
                      invoice.status === 'Paid' ? 'bg-green-100 text-green-800' :
                      invoice.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {invoice.status}
                    </span>
                  </td>
                  <td className="py-2 px-4 border-b">
                    <div className="flex justify-center space-x-2">
                      <button 
                        onClick={() => handleViewDetails(invoice)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Eye size={18} />
                      </button>
                      <button className="text-gray-600 hover:text-gray-800">
                        <Download size={18} />
                      </button>
                      {invoice.status !== 'Paid' && (
                        <button 
                          onClick={() => handleProcessPayment(invoice)}
                          className="text-green-600 hover:text-green-800"
                        >
                          <CreditCard size={18} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="py-4 px-4 text-center text-gray-500">
                  No invoices found. Create your first invoice using the button above.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Create Invoice Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b flex justify-between items-center">
              <h2 className="text-lg font-semibold">Create New Invoice</h2>
              <button 
                onClick={() => setShowCreateModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Patient
                  </label>
                  <select
                    value={newInvoice.patientId}
                    onChange={(e) => setNewInvoice(prev => ({ ...prev, patientId: e.target.value }))}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="">Select Patient</option>
                    {safePatients.map(patient => (
                      <option key={patient.id} value={patient.id}>
                        {patient.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Due Date
                  </label>
                  <input
                    type="date"
                    value={newInvoice.dueDate}
                    onChange={(e) => setNewInvoice(prev => ({ ...prev, dueDate: e.target.value }))}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Billing Address
                  </label>
                  <textarea
                    value={newInvoice.billingAddress}
                    onChange={(e) => setNewInvoice(prev => ({ ...prev, billingAddress: e.target.value }))}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    rows={3}
                  />
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-medium">Items</h3>
                    <button
                      type="button"
                      onClick={handleAddItem}
                      className="text-blue-600 hover:text-blue-700 text-sm flex items-center gap-1"
                    >
                      <Plus size={16} />
                      Add Item
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    {newInvoice.items.map((item, index) => (
                      <div key={index} className="flex gap-4 items-start">
                        <div className="flex-1">
                          <input
                            type="text"
                            placeholder="Description"
                            value={item.description}
                            onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md"
                          />
                        </div>
                        <div className="w-24">
                          <input
                            type="number"
                            placeholder="Qty"
                            value={item.quantity}
                            onChange={(e) => handleItemChange(index, 'quantity', parseInt(e.target.value) || 0)}
                            className="w-full p-2 border border-gray-300 rounded-md"
                          />
                        </div>
                        <div className="w-32">
                          <input
                            type="number"
                            placeholder="Price"
                            value={item.unitPrice}
                            onChange={(e) => handleItemChange(index, 'unitPrice', parseFloat(e.target.value) || 0)}
                            className="w-full p-2 border border-gray-300 rounded-md"
                          />
                        </div>
                        <div className="w-32 p-2 text-right">
                          ${((item.quantity || 0) * (item.unitPrice || 0)).toFixed(2)}
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveItem(index)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="mt-8 flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleCreateInvoice}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Create Invoice
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvoiceComponent;