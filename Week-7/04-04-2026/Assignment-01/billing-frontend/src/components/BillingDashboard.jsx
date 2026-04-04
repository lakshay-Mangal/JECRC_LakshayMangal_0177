import { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Trash2, Save, Printer, History, LayoutDashboard, Download } from 'lucide-react';

export default function BillingDashboard() {
  // Navigation State
  const [currentView, setCurrentView] = useState('billing'); // 'billing' or 'history'
  
  // Billing State
  const [catalogs, setCatalogs] = useState([]);
  const [activeTab, setActiveTab] = useState('Entrance');
  const [billItems, setBillItems] = useState([]);
  const [discount, setDiscount] = useState(0);
  const [taxRate, setTaxRate] = useState(0.05);
  const [loading, setLoading] = useState(true);

  // History State
  const [pastBills, setPastBills] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(false);

  const API_BASE_URL = 'http://localhost:5104';

  // Fetch Catalogs on Load
  useEffect(() => {
    const fetchCatalogs = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/catalogs`);
        setCatalogs(response.data);
      } catch (error) {
        console.error('Error fetching catalogs from database:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCatalogs();
  }, []);

  // Fetch Past Bills when History tab is clicked
  const fetchPastBills = async () => {
    setLoadingHistory(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/api/bills`);
      setPastBills(response.data);
    } catch (error) {
      console.error('Error fetching past bills:', error);
    } finally {
      setLoadingHistory(false);
    }
  };

  // Switch Views
  const handleViewChange = (view) => {
    setCurrentView(view);
    if (view === 'history') {
      fetchPastBills();
    }
  };

  // CSV Export Logic
  const downloadCSV = () => {
    if (pastBills.length === 0) return alert("No bills to export!");

    // CSV Headers
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Invoice Number,Date,SubTotal,Discount,Tax,Total Amount\n";

    // Add rows
    pastBills.forEach(bill => {
      const row = [
        bill.invoiceNumber,
        new Date(bill.dateCreated).toLocaleString().replace(',', ''), // Remove commas from dates for CSV safety
        bill.subTotal,
        bill.discountAmount,
        bill.taxAmount,
        bill.totalAmount
      ].join(",");
      csvContent += row + "\n";
    });

    // Trigger Download
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Billing_Report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // --- Existing Billing Logic ---
  const addItemToBill = (catalogItem) => {
    const existingItem = billItems.find((item) => item.description === catalogItem.name);
    if (existingItem && !catalogItem.isVariablePrice) {
      setBillItems(
        billItems.map((item) =>
          item.description === catalogItem.name
            ? { ...item, quantity: item.quantity + 1, total: (item.quantity + 1) * item.price }
            : item
        )
      );
    } else {
      setBillItems([
        ...billItems,
        {
          description: catalogItem.name,
          price: catalogItem.defaultPrice || 0,
          quantity: 1,
          total: catalogItem.defaultPrice || 0,
        },
      ]);
    }
  };

  const updateItem = (index, field, value) => {
    const updated = [...billItems];
    updated[index][field] = Number(value);
    updated[index].total = updated[index].quantity * updated[index].price;
    setBillItems(updated);
  };

  const removeItem = (index) => {
    setBillItems(billItems.filter((_, i) => i !== index));
  };

  const subTotal = billItems.reduce((sum, item) => sum + item.total, 0);
  const taxAmount = (subTotal - discount) * taxRate;
  const total = subTotal - discount + taxAmount;

  const handleCheckout = async () => {
    const payload = {
      subTotal, discountAmount: discount, taxAmount, totalAmount: total,
      items: billItems.map((item) => ({
        description: item.description, quantity: item.quantity,
        unitPrice: item.price, totalPrice: item.total,
      })),
    };

    try {
      const response = await axios.post(`${API_BASE_URL}/api/bills`, payload);
      alert(`Bill Created Successfully! Invoice: ${response.data.invoiceNumber}`);
      setBillItems([]);
      setDiscount(0);
    } catch (error) {
      console.error('Error creating bill', error);
    }
  };

  if (loading) return <div className="p-10 text-center">Loading System...</div>;

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Top Navigation Bar */}
      <div className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">Billing System</h1>
        <div className="flex gap-2">
          <button 
            onClick={() => handleViewChange('billing')}
            className={`px-4 py-2 rounded flex items-center gap-2 font-medium transition ${currentView === 'billing' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
          >
            <LayoutDashboard size={18} /> New Bill
          </button>
          <button 
            onClick={() => handleViewChange('history')}
            className={`px-4 py-2 rounded flex items-center gap-2 font-medium transition ${currentView === 'history' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
          >
            <History size={18} /> History
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden p-4">
        
        {/* VIEW 1: BILLING DASHBOARD */}
        {currentView === 'billing' && (
          <div className="flex h-full gap-4">
            <div className="w-1/2 bg-white rounded-lg shadow-md flex flex-col">
              <div className="flex border-b">
                {['Entrance', 'Donation', 'SellingPrice', 'Custom'].map((tab) => (
                  <button
                    key={tab}
                    className={`p-4 flex-1 text-center font-semibold ${activeTab === tab ? 'border-b-4 border-blue-500 text-blue-600' : 'text-gray-500'}`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <div className="p-4 grid grid-cols-2 gap-4 overflow-y-auto">
                {activeTab !== 'Custom' ? (
                  catalogs.filter((catalog) => catalog.catalogCategory === activeTab).map((item) => (
                    <button
                      key={item.id}
                      onClick={() => addItemToBill(item)}
                      className="p-6 border rounded-lg hover:bg-blue-50 flex flex-col items-center justify-center transition shadow-sm"
                    >
                      <span className="font-bold text-lg">{item.name}</span>
                      <span className="text-gray-600">${Number(item.defaultPrice || 0).toFixed(2)}</span>
                    </button>
                  ))
                ) : (
                  <div className="col-span-2 flex flex-col gap-2">
                    <h3 className="font-bold">Add Custom Item</h3>
                    <button
                      className="bg-gray-200 hover:bg-gray-300 p-4 rounded flex items-center justify-center transition font-medium"
                      onClick={() => addItemToBill({ name: 'Custom Item', defaultPrice: 0, catalogCategory: 'Custom', isVariablePrice: true })}
                    >
                      <Plus size={20} className="mr-2" /> Create Blank Item Row
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="w-1/2 bg-white rounded-lg shadow-md flex flex-col">
              <div className="p-4 border-b flex items-center justify-between">
                <h2 className="text-xl font-bold">Current Bill</h2>
                <span className="text-sm text-gray-500">{new Date().toLocaleString()}</span>
              </div>
              <div className="flex-1 overflow-y-auto p-4">
                {billItems.length === 0 ? (
                  <p className="text-gray-500 text-center mt-8">No items added yet.</p>
                ) : (
                  <div className="space-y-3">
                    {billItems.map((item, index) => (
                      <div key={`${item.description}-${index}`} className="border rounded-lg p-3 grid grid-cols-12 gap-2 items-center bg-gray-50">
                        <div className="col-span-4"><p className="font-semibold truncate">{item.description}</p></div>
                        <div className="col-span-2">
                          <input type="number" min="1" value={item.quantity} onChange={(e) => updateItem(index, 'quantity', e.target.value)} className="w-full border rounded px-2 py-1" />
                        </div>
                        <div className="col-span-3">
                          <input type="number" min="0" step="0.01" value={item.price} onChange={(e) => updateItem(index, 'price', e.target.value)} className="w-full border rounded px-2 py-1" />
                        </div>
                        <div className="col-span-2 text-right font-medium">${item.total.toFixed(2)}</div>
                        <div className="col-span-1 text-right">
                          <button onClick={() => removeItem(index)} className="text-red-500 hover:text-red-700"><Trash2 size={18} /></button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="border-t p-4 space-y-3 bg-gray-50 rounded-b-lg">
                <div className="grid grid-cols-2 gap-3">
                  <label className="text-sm text-gray-600">Discount</label>
                  <input type="number" min="0" step="0.01" value={discount} onChange={(e) => setDiscount(Number(e.target.value || 0))} className="border rounded px-2 py-1" />
                  <label className="text-sm text-gray-600">Tax Rate (%)</label>
                  <input type="number" min="0" max="100" step="0.1" value={taxRate * 100} onChange={(e) => setTaxRate(Number(e.target.value || 0) / 100)} className="border rounded px-2 py-1" />
                </div>
                <div className="space-y-1 text-sm pt-2">
                  <div className="flex justify-between"><span>Sub Total</span><span>${subTotal.toFixed(2)}</span></div>
                  <div className="flex justify-between"><span>Discount</span><span>-${discount.toFixed(2)}</span></div>
                  <div className="flex justify-between"><span>Tax</span><span>${taxAmount.toFixed(2)}</span></div>
                  <div className="flex justify-between text-xl font-bold border-t pt-2 text-blue-700"><span>Total</span><span>${total.toFixed(2)}</span></div>
                </div>
                <div className="flex gap-2 pt-2">
                  <button onClick={handleCheckout} disabled={billItems.length === 0} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded px-3 py-3 flex items-center justify-center gap-2 font-bold disabled:opacity-50 transition">
                    <Save size={20} /> Checkout
                  </button>
                  <button onClick={() => window.print()} className="bg-gray-200 hover:bg-gray-300 rounded px-4 py-3 flex items-center justify-center gap-2 font-semibold transition">
                    <Printer size={20} /> Print
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: HISTORY DASHBOARD */}
        {currentView === 'history' && (
          <div className="bg-white rounded-lg shadow-md h-full flex flex-col p-6">
            <div className="flex justify-between items-center mb-6 border-b pb-4">
              <h2 className="text-2xl font-bold text-gray-800">Past Bills & Invoices</h2>
              <button 
                onClick={downloadCSV}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded flex items-center gap-2 font-medium transition"
              >
                <Download size={18} /> Export as CSV
              </button>
            </div>
            
            <div className="flex-1 overflow-auto">
              {loadingHistory ? (
                <div className="text-center p-10 text-gray-500">Loading history...</div>
              ) : pastBills.length === 0 ? (
                <div className="text-center p-10 text-gray-500">No bills found in the database.</div>
              ) : (
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 border-b-2">
                      <th className="p-3 font-semibold text-gray-600">Invoice Number</th>
                      <th className="p-3 font-semibold text-gray-600">Date</th>
                      <th className="p-3 font-semibold text-gray-600">Subtotal</th>
                      <th className="p-3 font-semibold text-gray-600">Discount</th>
                      <th className="p-3 font-semibold text-gray-600">Tax</th>
                      <th className="p-3 font-semibold text-gray-600 text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pastBills.map((bill) => (
                      <tr key={bill.id} className="border-b hover:bg-gray-50 transition">
                        <td className="p-3 font-medium text-blue-600">{bill.invoiceNumber}</td>
                        <td className="p-3 text-gray-600">{new Date(bill.dateCreated).toLocaleString()}</td>
                        <td className="p-3 text-gray-600">${bill.subTotal.toFixed(2)}</td>
                        <td className="p-3 text-red-500">-${bill.discountAmount.toFixed(2)}</td>
                        <td className="p-3 text-gray-600">${bill.taxAmount.toFixed(2)}</td>
                        <td className="p-3 font-bold text-right">${bill.totalAmount.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}