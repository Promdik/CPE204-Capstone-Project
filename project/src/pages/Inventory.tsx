import React, { useState } from 'react';
import { Search, Filter, Plus, AlertTriangle, Edit as EditIcon, RefreshCw } from 'lucide-react';

interface InventoryItem {
  id: number;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
  lastUpdated: string;
}

const sampleInventory: InventoryItem[] = [
  {
    id: 1,
    name: 'Surgical Masks',
    category: 'PPE',
    quantity: 2500,
    unit: 'pieces',
    status: 'In Stock',
    lastUpdated: '2023-05-10'
  },
  {
    id: 2,
    name: 'Disposable Gloves',
    category: 'PPE',
    quantity: 1200,
    unit: 'pairs',
    status: 'In Stock',
    lastUpdated: '2023-05-12'
  },
  {
    id: 3,
    name: 'Hand Sanitizer',
    category: 'Hygiene',
    quantity: 85,
    unit: 'bottles',
    status: 'Low Stock',
    lastUpdated: '2023-05-08'
  },
  {
    id: 4,
    name: 'Paracetamol 500mg',
    category: 'Medication',
    quantity: 350,
    unit: 'tablets',
    status: 'In Stock',
    lastUpdated: '2023-04-30'
  },
  {
    id: 5,
    name: 'Ibuprofen 200mg',
    category: 'Medication',
    quantity: 120,
    unit: 'tablets',
    status: 'Low Stock',
    lastUpdated: '2023-05-05'
  },
  {
    id: 6,
    name: 'Insulin',
    category: 'Medication',
    quantity: 45,
    unit: 'vials',
    status: 'Low Stock',
    lastUpdated: '2023-05-02'
  },
  {
    id: 7,
    name: 'Blood Pressure Monitors',
    category: 'Equipment',
    quantity: 18,
    unit: 'pieces',
    status: 'In Stock',
    lastUpdated: '2023-04-25'
  },
  {
    id: 8,
    name: 'Syringes 10ml',
    category: 'Supplies',
    quantity: 0,
    unit: 'pieces',
    status: 'Out of Stock',
    lastUpdated: '2023-05-07'
  }
];

const Inventory: React.FC = () => {
  const [inventory, setInventory] = useState<InventoryItem[]>(sampleInventory);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showUpdateStockModal, setShowUpdateStockModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    quantity: '',
    unit: '',
  });
  const [updateStockData, setUpdateStockData] = useState({
    quantity: '',
    operation: 'add',
  });
  
  const filteredInventory = inventory.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.status.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdateStockInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUpdateStockData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const quantity = parseInt(formData.quantity);
    let status: 'In Stock' | 'Low Stock' | 'Out of Stock';
    
    if (quantity <= 0) {
      status = 'Out of Stock';
    } else if (quantity < 100) {
      status = 'Low Stock';
    } else {
      status = 'In Stock';
    }
    
    const newItem: InventoryItem = {
      id: Math.max(...inventory.map(item => item.id), 0) + 1,
      name: formData.name,
      category: formData.category,
      quantity: quantity,
      unit: formData.unit,
      status: status,
      lastUpdated: new Date().toISOString().split('T')[0]
    };
    
    setInventory(prev => [...prev, newItem]);
    setShowAddModal(false);
    setFormData({
      name: '',
      category: '',
      quantity: '',
      unit: '',
    });
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedItem) return;
    
    const quantity = parseInt(formData.quantity);
    let status: 'In Stock' | 'Low Stock' | 'Out of Stock';
    
    if (quantity <= 0) {
      status = 'Out of Stock';
    } else if (quantity < 100) {
      status = 'Low Stock';
    } else {
      status = 'In Stock';
    }
    
    const updatedItem: InventoryItem = {
      ...selectedItem,
      name: formData.name,
      category: formData.category,
      quantity: quantity,
      unit: formData.unit,
      status: status,
      lastUpdated: new Date().toISOString().split('T')[0]
    };
    
    setInventory(prev => 
      prev.map(item => item.id === selectedItem.id ? updatedItem : item)
    );
    
    setShowEditModal(false);
    setSelectedItem(null);
    setFormData({
      name: '',
      category: '',
      quantity: '',
      unit: '',
    });
  };

  const handleUpdateStockSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedItem) return;
    
    const updateValue = parseInt(updateStockData.quantity);
    let newQuantity: number;
    
    if (updateStockData.operation === 'add') {
      newQuantity = selectedItem.quantity + updateValue;
    } else {
      newQuantity = Math.max(0, selectedItem.quantity - updateValue);
    }
    
    let status: 'In Stock' | 'Low Stock' | 'Out of Stock';
    if (newQuantity <= 0) {
      status = 'Out of Stock';
    } else if (newQuantity < 100) {
      status = 'Low Stock';
    } else {
      status = 'In Stock';
    }
    
    const updatedItem: InventoryItem = {
      ...selectedItem,
      quantity: newQuantity,
      status: status,
      lastUpdated: new Date().toISOString().split('T')[0]
    };
    
    setInventory(prev => 
      prev.map(item => item.id === selectedItem.id ? updatedItem : item)
    );
    
    setShowUpdateStockModal(false);
    setSelectedItem(null);
    setUpdateStockData({
      quantity: '',
      operation: 'add',
    });
  };
  
  const handleEdit = (item: InventoryItem) => {
    setSelectedItem(item);
    setFormData({
      name: item.name,
      category: item.category,
      quantity: item.quantity.toString(),
      unit: item.unit,
    });
    setShowEditModal(true);
  };
  
  const handleUpdateStock = (item: InventoryItem) => {
    setSelectedItem(item);
    setUpdateStockData({
      quantity: '',
      operation: 'add',
    });
    setShowUpdateStockModal(true);
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Stock':
        return 'bg-green-100 text-green-800';
      case 'Low Stock':
        return 'bg-amber-100 text-amber-800';
      case 'Out of Stock':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getLowStockCount = () => {
    return inventory.filter(item => item.status === 'Low Stock').length;
  };
  
  const getOutOfStockCount = () => {
    return inventory.filter(item => item.status === 'Out of Stock').length;
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Inventory Management</h1>
        <p className="text-gray-600">Manage hospital supplies, medications, and equipment</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-1">Total Items</h3>
          <p className="text-2xl font-bold text-gray-900">{inventory.length}</p>
          <div className="mt-2">
            <span className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-full">In Inventory</span>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-1">Low Stock Items</h3>
          <p className="text-2xl font-bold text-amber-600">{getLowStockCount()}</p>
          <div className="mt-2">
            <span className="text-xs text-amber-600 bg-amber-100 px-2 py-1 rounded-full">Need Attention</span>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-1">Out of Stock</h3>
          <p className="text-2xl font-bold text-red-600">{getOutOfStockCount()}</p>
          <div className="mt-2">
            <span className="text-xs text-red-600 bg-red-100 px-2 py-1 rounded-full">Required Immediate Action</span>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold">Inventory Items</h2>
        </div>
        
        <div className="p-6 flex flex-wrap gap-4 border-b">
          <div className="flex-1 min-w-[250px]">
            <div className="relative">
              <input
                type="text"
                placeholder="Search inventory..."
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
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Plus size={18} />
            Add Item
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Updated</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredInventory.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-gray-500">No items found</td>
                </tr>
              ) : (
                filteredInventory.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {item.status === 'Out of Stock' && (
                          <AlertTriangle size={18} className="mr-2 text-red-500" />
                        )}
                        <div>
                          <div className="text-sm font-medium text-gray-900">{item.name}</div>
                          <div className="text-sm text-gray-500">ID: {item.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{item.quantity} {item.unit}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(item.status)}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.lastUpdated}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => handleEdit(item)}
                          className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                        >
                          <EditIcon size={16} />
                          Edit
                        </button>
                        <button 
                          onClick={() => handleUpdateStock(item)}
                          className="text-green-600 hover:text-green-800 flex items-center gap-1"
                        >
                          <RefreshCw size={16} />
                          Update Stock
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Add Item Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <h2 className="text-lg font-semibold">Add Inventory Item</h2>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Item Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                    Category *
                  </label>
                  <select
                    id="category"
                    name="category"
                    required
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select Category</option>
                    <option value="Medication">Medication</option>
                    <option value="PPE">PPE</option>
                    <option value="Supplies">Supplies</option>
                    <option value="Equipment">Equipment</option>
                    <option value="Hygiene">Hygiene</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                    Quantity *
                  </label>
                  <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    required
                    min="0"
                    value={formData.quantity}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="unit" className="block text-sm font-medium text-gray-700 mb-1">
                    Unit *
                  </label>
                  <input
                    type="text"
                    id="unit"
                    name="unit"
                    required
                    placeholder="e.g., pieces, bottles, tablets"
                    value={formData.unit}
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
                  Add Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Item Modal */}
      {showEditModal && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <h2 className="text-lg font-semibold">Edit Inventory Item</h2>
            </div>
            
            <form onSubmit={handleEditSubmit} className="p-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="edit-name" className="block text-sm font-medium text-gray-700 mb-1">
                    Item Name *
                  </label>
                  <input
                    type="text"
                    id="edit-name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="edit-category" className="block text-sm font-medium text-gray-700 mb-1">
                    Category *
                  </label>
                  <select
                    id="edit-category"
                    name="category"
                    required
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select Category</option>
                    <option value="Medication">Medication</option>
                    <option value="PPE">PPE</option>
                    <option value="Supplies">Supplies</option>
                    <option value="Equipment">Equipment</option>
                    <option value="Hygiene">Hygiene</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="edit-quantity" className="block text-sm font-medium text-gray-700 mb-1">
                    Quantity *
                  </label>
                  <input
                    type="number"
                    id="edit-quantity"
                    name="quantity"
                    required
                    min="0"
                    value={formData.quantity}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="edit-unit" className="block text-sm font-medium text-gray-700 mb-1">
                    Unit *
                  </label>
                  <input
                    type="text"
                    id="edit-unit"
                    name="unit"
                    required
                    value={formData.unit}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowEditModal(false);
                    setSelectedItem(null);
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Update Stock Modal */}
      {showUpdateStockModal && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <h2 className="text-lg font-semibold">Update Stock Level</h2>
            </div>
            
            <form onSubmit={handleUpdateStockSubmit} className="p-6">
              <div className="mb-4">
                <div className="bg-gray-50 p-4 rounded-md mb-4">
                  <h3 className="font-medium text-gray-700">{selectedItem.name}</h3>
                  <p className="text-sm text-gray-600">Current quantity: {selectedItem.quantity} {selectedItem.unit}</p>
                  <p className="text-sm text-gray-600">Status: 
                    <span className={`ml-2 px-2 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(selectedItem.status)}`}>
                      {selectedItem.status}
                    </span>
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="operation" className="block text-sm font-medium text-gray-700 mb-1">
                      Operation *
                    </label>
                    <select
                      id="operation"
                      name="operation"
                      required
                      value={updateStockData.operation}
                      onChange={handleUpdateStockInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="add">Add Stock</option>
                      <option value="remove">Remove Stock</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="stock-quantity" className="block text-sm font-medium text-gray-700 mb-1">
                      Quantity to {updateStockData.operation === 'add' ? 'Add' : 'Remove'} *
                    </label>
                    <input
                      type="number"
                      id="stock-quantity"
                      name="quantity"
                      required
                      min="1"
                      value={updateStockData.quantity}
                      onChange={handleUpdateStockInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                {updateStockData.quantity && updateStockData.operation && (
                  <div className="mt-4 p-3 bg-blue-50 text-blue-700 rounded-md">
                    <p className="text-sm">
                      {updateStockData.operation === 'add' 
                        ? `Adding ${updateStockData.quantity} ${selectedItem.unit} will result in a new quantity of ${selectedItem.quantity + parseInt(updateStockData.quantity || '0')} ${selectedItem.unit}.`
                        : `Removing ${updateStockData.quantity} ${selectedItem.unit} will result in a new quantity of ${Math.max(0, selectedItem.quantity - parseInt(updateStockData.quantity || '0'))} ${selectedItem.unit}.`
                      }
                    </p>
                  </div>
                )}
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowUpdateStockModal(false);
                    setSelectedItem(null);
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Update Stock
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inventory;