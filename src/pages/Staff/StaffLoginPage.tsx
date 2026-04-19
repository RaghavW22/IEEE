import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Loader2, KeyRound, User } from 'lucide-react';
import toast from 'react-hot-toast';
import Layout from '../../components/Layout/Layout';
import GlassCard from '../../components/GlassCard/GlassCard';
import Button from '../../components/Button/Button';
import { useAppStore } from '../../store/useAppStore';
import { api } from '../../api/client';

export default function StaffLoginPage() {
  const navigate = useNavigate();
  const setActiveRole = useAppStore((s) => s.setActiveRole);
  
  const [model, setMode] = useState<'idle' | 'loading'>('idle');
  const [staffId, setStaffId] = useState('');
  const [pin, setPin] = useState('');
  
  const pinInputRef = useRef<HTMLInputElement>(null);

  const handleLogin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    // Basic validation
    if (!staffId.trim()) {
      toast.error('Please enter your Staff ID');
      return;
    }
    if (!pin.trim()) {
      toast.error('Please enter your Security PIN');
      return;
    }

    setMode('loading');

    try {
      const res = await api.loginStaff(staffId.trim(), pin);
      setActiveRole('staff');
      toast.success(`Welcome back, ${res.staff.name} (${res.staff.staff_id})!`);
      navigate('/staff');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Invalid credentials');
      setMode('idle');
    }
  };

  return (
    <Layout showBackground={true}>
      <div className="flex items-center justify-center pt-8 pb-2">
        <span className="font-playfair text-gold text-2xl font-bold">SafePath</span>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-4 py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="w-full max-w-sm"
        >
          <GlassCard className="w-full">
            <div className="flex flex-col items-center text-center mb-6">
              <div className="w-14 h-14 rounded-full bg-blue-500/20 border-2 border-blue-400 flex items-center justify-center mb-3">
                <ShieldCheck size={28} className="text-blue-400" />
              </div>
              <h1 className="font-playfair text-white text-2xl font-bold mb-1">
                Staff Portal
              </h1>
              <p className="text-white/50 text-sm">
                Enter your credentials to access the dashboard
              </p>
            </div>

            <AnimatePresence mode="wait">
              {model === 'loading' ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center py-12 gap-5"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  >
                    <Loader2 size={40} className="text-gold" />
                  </motion.div>
                  <p className="text-white/60 text-sm">Authenticating credential...</p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleLogin}
                  className="flex flex-col gap-4"
                >
                  <div className="flex flex-col gap-1.5">
                    <label className="text-white/50 text-xs ml-1 flex items-center gap-1.5">
                      <User size={12} /> Staff ID Number
                    </label>
                    <input
                      value={staffId}
                      onChange={(e) => setStaffId(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && pinInputRef.current?.focus()}
                      placeholder="e.g. SP-1024"
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-gold transition-colors"
                      autoFocus
                    />
                  </div>

                  <div className="flex flex-col gap-1.5 mb-2">
                    <label className="text-white/50 text-xs ml-1 flex items-center gap-1.5">
                      <KeyRound size={12} /> Security PIN
                    </label>
                    <input
                      ref={pinInputRef}
                      value={pin}
                      onChange={(e) => setPin(e.target.value)}
                      type="password"
                      placeholder="••••"
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white text-sm font-mono placeholder:text-white/30 tracking-widest focus:outline-none focus:border-gold transition-colors"
                    />
                  </div>

                  <Button variant="gold" fullWidth type="submit">
                    Login to Dashboard
                  </Button>

                  <button
                    type="button"
                    onClick={() => navigate('/')}
                    className="mt-2 text-white/40 text-sm hover:text-white text-center transition-colors"
                  >
                    ← Back to Home
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </GlassCard>
        </motion.div>
      </div>
    </Layout>
  );
}
