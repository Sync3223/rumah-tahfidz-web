import { useState, useEffect } from 'react';
import { Wallet, Target, TrendingUp, Save, AlertCircle } from 'lucide-react';
import { useFinanceData } from '../../../hooks/useFinanceData';

const FinanceMonitoring = () => {
  const { targetAmount, collectedAmount, updateFinance } = useFinanceData();
  
  const [tempTarget, setTempTarget] = useState(targetAmount);
  const [tempCollected, setTempCollected] = useState(collectedAmount);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setTempTarget(targetAmount);
    setTempCollected(collectedAmount);
  }, [targetAmount, collectedAmount]);

  const percentage = Math.round((tempCollected / tempTarget) * 100);

  const handleSave = async () => {
    setIsSaving(true);
    updateFinance({
      targetAmount: tempTarget,
      collectedAmount: tempCollected,
      lastUpdate: new Date().toISOString().split('T')[0]
    });
    setTimeout(() => {
      setIsSaving(false);
      alert("Data keuangan berhasil diperbarui!");
    }, 1000);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Pemantauan Keuangan</h1>
          <p className="text-sm text-gray-500">Kelola target pembangunan dan total donasi masuk.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center px-6 py-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:bg-gray-400 transition-all shadow-sm font-medium"
        >
          <Save size={18} className="mr-2" />
          {isSaving ? "Menyimpan..." : "Simpan Data"}
        </button>
      </div>

      {/* --- STATS SUMMARY --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3 mb-2 text-emerald-600 font-semibold uppercase text-xs tracking-wider">
            <Wallet size={16} /> Total Terkumpul
          </div>
          <h3 className="text-2xl font-bold text-gray-800">
            Rp {tempCollected.toLocaleString('id-ID')}
          </h3>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3 mb-2 text-blue-600 font-semibold uppercase text-xs tracking-wider">
            <Target size={16} /> Target Dana
          </div>
          <h3 className="text-2xl font-bold text-gray-800">
            Rp {tempTarget.toLocaleString('id-ID')}
          </h3>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3 mb-2 text-orange-600 font-semibold uppercase text-xs tracking-wider">
            <TrendingUp size={16} /> Persentase
          </div>
          <h3 className="text-2xl font-bold text-gray-800">{percentage}%</h3>
        </div>
      </div>

      {/* --- FORM EDIT --- */}
      <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">Update Nominal Terkumpul (Rp)</label>
            <input 
              type="number" 
              value={tempCollected}
              onChange={(e) => setTempCollected(Number(e.target.value))}
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none transition-all font-mono"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">Update Target Dana (Rp)</label>
            <input 
              type="number" 
              value={tempTarget}
              onChange={(e) => setTempTarget(Number(e.target.value))}
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none transition-all font-mono"
            />
          </div>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 flex gap-3">
          <AlertCircle className="text-blue-600 shrink-0" size={20} />
          <p className="text-xs text-blue-800 leading-relaxed">
            Perubahan nominal di sini akan langsung memperbarui progress bar di halaman <strong>StatsSection</strong> dan <strong>BuildingProgress</strong>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FinanceMonitoring;