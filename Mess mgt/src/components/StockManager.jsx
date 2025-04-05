import React, { useState } from 'react';
import { Plus, Trash2, Save } from 'lucide-react';

const initialStock = [
  { id: 1, name: 'Rice', quantity: 100, unit: 'kg', threshold: 20 },
  { id: 2, name: 'Wheat Flour', quantity: 50, unit: 'kg', threshold: 10 },
  { id: 3, name: 'Cooking Oil', quantity: 30, unit: 'liters', threshold: 5 },
  { id: 4, name: 'Sugar', quantity: 25, unit: 'kg', threshold: 5 },
  { id: 5, name: 'Salt', quantity: 10, unit: 'kg', threshold: 2 },
  { id: 6, name: 'Tea Leaves', quantity: 5, unit: 'kg', threshold: 1 },
  { id: 7, name: 'Coffee Powder', quantity: 3, unit: 'kg', threshold: 0.5 },
];

function StockManager() {
  const [stock, setStock] = useState(initialStock);
  const [editing, setEditing] = useState(false);
  const [newItem, setNewItem] = useState({ name: '', quantity: '', unit: '', threshold: '' });

  const handleAddItem = () => {
    if (newItem.name && newItem.quantity && newItem.unit && newItem.threshold) {
      const newStockItem = {
        id: Date.now(),
        name: newItem.name,
        quantity: parseFloat(newItem.quantity),
        unit: newItem.unit,
        threshold: parseFloat(newItem.threshold)
      };
      setStock([...stock, newStockItem]);
      setNewItem({ name: '', quantity: '', unit: '', threshold: '' });
    }
  };

  const handleDeleteItem = (id) => {
    setStock(stock.filter(item => item.id !== id));
  };

  const handleQuantityChange = (id, newQuantity) => {
    setStock(stock.map(item => 
      item.id === id ? { ...item, quantity: parseFloat(newQuantity) } : item
    ));
  };

  const handleSave = () => {
    // In a real app, this would save to a database
    console.log('Saving stock:', stock);
    setEditing(false);
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Stock Management</h2>
        <button
          onClick={() => setEditing(!editing)}
          className="flex items-center space-x-2 bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600"
        >
          {editing ? (
            <>
              <Save className="h-4 w-4" />
              <span>Save Changes</span>
            </>
          ) : (
            <>
              <Plus className="h-4 w-4" />
              <span>Add Stock</span>
            </>
          )}
        </button>
      </div>

      {editing && (
        <div className="mb-6 p-4 border rounded-lg bg-gray-50">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Item</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Item Name"
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <input
              type="number"
              placeholder="Quantity"
              value={newItem.quantity}
              onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <input
              type="text"
              placeholder="Unit (kg, liters, etc.)"
              value={newItem.unit}
              onChange={(e) => setNewItem({ ...newItem, unit: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <input
              type="number"
              placeholder="Threshold"
              value={newItem.threshold}
              onChange={(e) => setNewItem({ ...newItem, threshold: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <button
            onClick={handleAddItem}
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
          >
            Add Item
          </button>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Threshold</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              {editing && <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {stock.map((item) => (
              <tr key={item.id} className={item.quantity <= item.threshold ? 'bg-red-50' : ''}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {editing ? (
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                      className="w-20 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  ) : (
                    item.quantity
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.unit}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.threshold}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    item.quantity <= item.threshold
                      ? 'bg-red-100 text-red-800'
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {item.quantity <= item.threshold ? 'Low Stock' : 'In Stock'}
                  </span>
                </td>
                {editing && (
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button
                      onClick={() => handleDeleteItem(item.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editing && (
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleSave}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
          >
            Save All Changes
          </button>
        </div>
      )}
    </div>
  );
}

export default StockManager; 