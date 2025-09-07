import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Plus, 
  Trash2, 
  Clock, 
  BookOpen,
  Save,
  X,
  Edit3
} from 'lucide-react';
import { useTheme } from '../../../context/ThemeContext';
import BackHeader from '../../../layout/BackHeader';

const EditJadwalPengajar = () => {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const { day, schedule } = location.state || {};

  const [dayStatus, setDayStatus] = useState(schedule?.status || 'aktif');
  const [pelajaranList, setPelajaranList] = useState(schedule?.pelajaran || []);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  // Form state for new lesson
  const [newPelajaran, setNewPelajaran] = useState({
    mataPelajaran: '',
    waktu: '',
    deskripsi: ''
  });

  // Daftar hari dalam seminggu
  const daysOfWeek = {
    senin: 'Senin',
    selasa: 'Selasa', 
    rabu: 'Rabu',
    kamis: 'Kamis',
    jumat: 'Jumat',
    sabtu: 'Sabtu',
    minggu: 'Minggu'
  };

  const handleAddPelajaran = () => {
    if (newPelajaran.mataPelajaran && newPelajaran.waktu) {
      const newLesson = {
        id: Date.now(),
        ...newPelajaran
      };
      setPelajaranList([...pelajaranList, newLesson]);
      setNewPelajaran({
        mataPelajaran: '',
        waktu: '',
        deskripsi: ''
      });
      setShowAddForm(false);
    }
  };

  const handleDeletePelajaran = (id) => {
    setPelajaranList(pelajaranList.filter(p => p.id !== id));
  };

  const handleEditPelajaran = (pelajaran) => {
    setEditingId(pelajaran.id);
    setEditData({
      mataPelajaran: pelajaran.mataPelajaran,
      waktu: pelajaran.waktu,
      deskripsi: pelajaran.deskripsi || ''
    });
  };

  const handleSaveEdit = () => {
    if (editData.mataPelajaran && editData.waktu) {
      setPelajaranList(pelajaranList.map(p => 
        p.id === editingId 
          ? { ...p, ...editData }
          : p
      ));
      setEditingId(null);
      setEditData({});
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditData({});
  };

  const handleSave = () => {
    // Here you would normally save to backend
    console.log('Saving schedule:', {
      day,
      status: dayStatus,
      pelajaran: pelajaranList
    });
    
    // Navigate back with success message
    navigate('/dashboard/pengajar/jadwal', {
      state: { 
        message: `Jadwal ${daysOfWeek[day]} berhasil disimpan!`,
        type: 'success'
      }
    });
  };

  const handleCancel = () => {
    navigate('/dashboard/pengajar/jadwal');
  };

  return (
    <div className="min-h-screen bg-light-body dark:bg-dark-body">
      <BackHeader title={`${daysOfWeek[day]}`} />
      
      <div className="p-4 pt-10 pb-24 space-y-6">
        {/* Day Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-light-card dark:bg-dark-card rounded-xl p-4 border border-light-border dark:border-dark-border"
        >
          <h3 className="text-lg font-semibold text-light-text-main dark:text-dark-text-main mb-4">
            Status
          </h3>
          <div className="flex space-x-4">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="dayStatus"
                value="aktif"
                checked={dayStatus === 'aktif'}
                onChange={(e) => setDayStatus(e.target.value)}
                className="text-green-600 focus:ring-green-500"
              />
              <span className="text-light-text-main dark:text-dark-text-main">Aktif</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="dayStatus"
                value="libur"
                checked={dayStatus === 'libur'}
                onChange={(e) => setDayStatus(e.target.value)}
                className="text-gray-600 focus:ring-gray-500"
              />
              <span className="text-light-text-main dark:text-dark-text-main">Libur</span>
            </label>
          </div>
        </motion.div>

        {/* Lesson List */}
        {dayStatus === 'aktif' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-light-card dark:bg-dark-card rounded-xl p-4 border border-light-border dark:border-dark-border"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-light-text-main dark:text-dark-text-main">
                Pelajaran
              </h3>
              <button
                onClick={() => setShowAddForm(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah</span>
              </button>
            </div>

            {/* Existing Lessons */}
            <div className="space-y-3 mb-4">
              {pelajaranList.map((pelajaran, index) => (
                <motion.div
                  key={pelajaran.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="bg-light-body dark:bg-dark-body rounded-lg p-4 border border-light-border dark:border-dark-border"
                >
                  {editingId === pelajaran.id ? (
                    // Edit Mode
                    <div className="space-y-3">
                      <div>
                        <input
                          type="text"
                          value={editData.mataPelajaran}
                          onChange={(e) => setEditData({...editData, mataPelajaran: e.target.value})}
                          className="w-full px-3 py-2 border border-light-border dark:border-dark-border rounded-lg bg-light-card dark:bg-dark-card text-light-text-main dark:text-dark-text-main focus:ring-2 focus:ring-blue-500 focus:border-transparent font-semibold"
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          value={editData.waktu}
                          onChange={(e) => setEditData({...editData, waktu: e.target.value})}
                          className="w-full px-3 py-2 border border-light-border dark:border-dark-border rounded-lg bg-light-card dark:bg-dark-card text-light-text-main dark:text-dark-text-main focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <textarea
                          value={editData.deskripsi}
                          onChange={(e) => setEditData({...editData, deskripsi: e.target.value})}
                          placeholder="Deskripsi materi..."
                          rows={2}
                          className="w-full px-3 py-2 border border-light-border dark:border-dark-border rounded-lg bg-light-card dark:bg-dark-card text-light-text-main dark:text-dark-text-main focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                        />
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={handleSaveEdit}
                          className="flex items-center space-x-1 px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors text-sm"
                        >
                          <Save className="w-3 h-3" />
                          <span>Simpan</span>
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="px-3 py-1 border border-light-border dark:border-dark-border text-light-text-secondary dark:text-dark-text-secondary hover:bg-light-body dark:hover:bg-dark-body rounded-lg transition-colors text-sm"
                        >
                          Batal
                        </button>
                      </div>
                    </div>
                  ) : (
                    // View Mode
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-semibold text-light-text-main dark:text-dark-text-main">
                            {pelajaran.mataPelajaran}
                          </h4>
                          <div className="flex items-center space-x-1 text-sm">
                            <Clock className="w-4 h-4 text-light-text-secondary dark:text-dark-text-secondary" />
                            <span className="text-light-text-main dark:text-dark-text-main">{pelajaran.waktu}</span>
                          </div>
                        </div>
                        {pelajaran.deskripsi && (
                          <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                            {pelajaran.deskripsi}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center space-x-1 ml-2">
                        <button
                          onClick={() => handleEditPelajaran(pelajaran)}
                          className="p-2 text-light-text-secondary dark:text-dark-text-secondary hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeletePelajaran(pelajaran.id)}
                          className="p-2 text-light-text-secondary dark:text-dark-text-secondary hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Add New Lesson Form */}
            {showAddForm && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-light-body dark:bg-dark-body rounded-lg p-4 border border-light-border dark:border-dark-border"
              >
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-light-text-main dark:text-dark-text-main">
                    Tambah Pelajaran
                  </h4>
                  <button
                    onClick={() => setShowAddForm(false)}
                    className="p-1 text-light-text-secondary dark:text-dark-text-secondary hover:text-red-600 dark:hover:text-red-400"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-2">
                      Mata Pelajaran *
                    </label>
                    <input
                      type="text"
                      value={newPelajaran.mataPelajaran}
                      onChange={(e) => setNewPelajaran({...newPelajaran, mataPelajaran: e.target.value})}
                      placeholder="Bahasa Mandarin Dasar"
                      className="w-full px-3 py-2 border border-light-border dark:border-dark-border rounded-lg bg-light-card dark:bg-dark-card text-light-text-main dark:text-dark-text-main focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-2">
                      Waktu *
                    </label>
                    <input
                      type="text"
                      value={newPelajaran.waktu}
                      onChange={(e) => setNewPelajaran({...newPelajaran, waktu: e.target.value})}
                      placeholder="08:00 - 09:30"
                      className="w-full px-3 py-2 border border-light-border dark:border-dark-border rounded-lg bg-light-card dark:bg-dark-card text-light-text-main dark:text-dark-text-main focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-2">
                      Deskripsi
                    </label>
                    <textarea
                      value={newPelajaran.deskripsi}
                      onChange={(e) => setNewPelajaran({...newPelajaran, deskripsi: e.target.value})}
                      placeholder="Deskripsi materi..."
                      rows={2}
                      className="w-full px-3 py-2 border border-light-border dark:border-dark-border rounded-lg bg-light-card dark:bg-dark-card text-light-text-main dark:text-dark-text-main focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    />
                  </div>

                  <div className="flex space-x-3">
                    <button
                      onClick={handleAddPelajaran}
                      className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Tambah</span>
                    </button>
                    <button
                      onClick={() => setShowAddForm(false)}
                      className="px-4 py-2 border border-light-border dark:border-dark-border text-light-text-secondary dark:text-dark-text-secondary hover:bg-light-body dark:hover:bg-dark-body rounded-lg transition-colors"
                    >
                      Batal
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {pelajaranList.length === 0 && !showAddForm && (
              <div className="text-center py-8">
                <BookOpen className="w-12 h-12 text-light-text-secondary dark:text-dark-text-secondary mx-auto mb-3" />
                <p className="text-light-text-secondary dark:text-dark-text-secondary">
                  Belum ada pelajaran yang ditambahkan
                </p>
              </div>
            )}
          </motion.div>
        )}

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex space-x-4"
        >
          <button
            onClick={handleSave}
            className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            <Save className="w-5 h-5" />
            <span>Simpan</span>
          </button>
          <button
            onClick={handleCancel}
            className="px-6 py-3 border border-light-border dark:border-dark-border text-light-text-secondary dark:text-dark-text-secondary hover:bg-light-body dark:hover:bg-dark-body rounded-lg transition-colors"
          >
            Batal
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default EditJadwalPengajar;