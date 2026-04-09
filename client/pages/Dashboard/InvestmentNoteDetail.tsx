import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Plus, Edit2, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface Tenure {
  id: string;
  frequency: string;
  maturesIn: string;
  percentage: string;
}

export default function InvestmentNoteDetail() {
  const navigate = useNavigate();
  const { stockId } = useParams(); // e.g. "golden-bridge-ethical"

  // Mock data – replace with real API data later
  const noteData = {
    id: stockId,
    name: stockId?.includes('ethical')
      ? 'GoldenBridge Ethical Notes (GEN)'
      : stockId?.includes('income')
      ? 'GoldenBridge Income Notes (GIN)'
      : stockId?.includes('treasury')
      ? 'GoldenBridge Treasury Notes (GTN)'
      : 'GoldenBridge Dollar Notes (CDN)',
    description:
      'Retailers, individuals wishing to accumulate funds towards a future project',
  };

  const [tenures, setTenures] = useState<Tenure[]>([
    { id: '1', frequency: 'Semi-annually', maturesIn: '182 days', percentage: '17%' },
    { id: '2', frequency: 'Annually', maturesIn: '355 days', percentage: '20%' },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);

  const handleDeleteTenure = (id: string) => {
    setTenures((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 text-white">
      <div className="max-w-5xl mx-auto">
        {/* Breadcrumb */}
        <button
          onClick={() => navigate('/dashboard/investments')}
          className="flex items-center gap-2 text-slate-400 hover:text-white mb-6"
        >
          <ArrowLeft size={18} /> Back to Investment Products
        </button>

        {/* Header */}
        <div className="bg-white rounded-2xl px-8 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">{noteData.name}</h1>
            <p className="text-slate-400 mt-1">{noteData.description}</p>
          </div>
          <Button
            onClick={() => setShowAddModal(true)}
            className="bg-[#B8860B] hover:bg-[#9a7009] text-black font-semibold"
          >
            <Plus className="mr-2 h-4 w-4" />
            Investment Tenure Options
          </Button>
        </div>

        {/* Tenure Options List */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-4">Investment Tenure Options</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tenures.map((tenure) => (
              <Card
                key={tenure.id}
                className="bg-white border-slate-700 p-6 hover:border-[#B8860B]/30 transition-all"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-lg">{tenure.frequency}</p>
                    <p className="text-slate-400 text-sm mt-1">
                      Matures in <span className="font-medium text-white">{tenure.maturesIn}</span>
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-[#B8860B]">{tenure.percentage}</p>
                  </div>
                </div>

                <div className="flex gap-3 mt-8">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-800"
                  >
                    <Edit2 size={16} className="mr-2" />
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeleteTenure(tenure.id)}
                    className="flex-1"
                  >
                    <Trash2 size={16} className="mr-2" />
                    Delete
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Add Tenure Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-slate-900 rounded-2xl w-full max-w-md mx-4">
            <div className="p-6 border-b border-slate-700">
              <h2 className="text-xl font-semibold">Add Investment Tenure Options</h2>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <label className="text-sm text-slate-400 block mb-2">Name of investment</label>
                <input
                  type="text"
                  defaultValue={noteData.name}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white"
                  readOnly
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-slate-400 block mb-2">Minimum investment</label>
                  <input
                    type="text"
                    placeholder="₦5,000,000.00"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white"
                  />
                </div>
                <div>
                  <label className="text-sm text-slate-400 block mb-2">Tenor</label>
                  <input
                    type="text"
                    placeholder="Semi-annually"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-slate-400 block mb-2">Maturity days</label>
                  <input
                    type="text"
                    placeholder="182"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white"
                  />
                </div>
                <div>
                  <label className="text-sm text-slate-400 block mb-2">Percentage</label>
                  <input
                    type="text"
                    placeholder="17%"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-6 border-t border-slate-700">
              <Button
                variant="outline"
                onClick={() => setShowAddModal(false)}
                className="flex-1 border-slate-600"
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  // TODO: Call API to add tenure
                  setShowAddModal(false);
                }}
                className="flex-1 bg-[#B8860B] hover:bg-[#9a7009] text-black"
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}