'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, registerSchema } from '@/utils/validators';
import { useAuthContext } from '@/context/AuthContext';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { Radio } from 'lucide-react';

const DEMO_ACCOUNTS = [
  { label: 'Teacher',   email: 'teacher@school.com',   password: 'password123', color: 'indigo' },
  { label: 'Principal', email: 'principal@school.com',  password: 'password123', color: 'violet' },
];

export default function LoginPage() {
  const { login, register: registerUser } = useAuthContext();
  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);

  const isLogin = mode === 'login';

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(isLogin ? loginSchema : registerSchema),
  });

  function switchMode(next) {
    setMode(next);
    setServerError('');
    reset();
  }

  async function onSubmit(data) {
    setServerError('');
    setLoading(true);
    try {
      if (isLogin) {
        await login(data.email, data.password);
      } else {
        await registerUser(data.name, data.email, data.password, data.role);
      }
    } catch (err) {
      setServerError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  function fillDemo(account) {
    setValue('email', account.email);
    setValue('password', account.password);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="p-3 bg-indigo-600 rounded-2xl shadow-lg mb-3">
            <Radio size={28} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">EduBroadcast</h1>
          <p className="text-sm text-gray-500 mt-1">Content Broadcasting System</p>
        </div>

        {/* Tab toggle */}
        <div className="flex rounded-xl bg-gray-100 p-1 mb-4">
          <button
            type="button"
            onClick={() => switchMode('login')}
            className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
              isLogin
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => switchMode('register')}
            className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
              !isLogin
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-5">
            {isLogin ? 'Welcome back' : 'Create your account'}
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Name — register only */}
            {!isLogin && (
              <Input
                label="Full Name"
                placeholder="Enter name"
                autoComplete="name"
                error={errors.name?.message}
                {...register('name')}
              />
            )}

            <Input
              label="Email"
              type="email"
              placeholder="Enter@email.com"
              autoComplete="email"
              error={errors.email?.message}
              {...register('email')}
            />

            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              autoComplete={isLogin ? 'current-password' : 'new-password'}
              hint={!isLogin ? 'Minimum 6 characters' : undefined}
              error={errors.password?.message}
              {...register('password')}
            />

            {/* Role selector — register only */}
            {!isLogin && (
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Role</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { value: 'teacher', label: 'Teacher', color: 'indigo' },
                    { value: 'principal', label: 'Principal', color: 'violet' },
                  ].map(({ value, label, color }) => (
                    <label
                      key={value}
                      className={`
                        flex items-center gap-2.5 p-3 rounded-xl border cursor-pointer transition-all
                        has-[:checked]:border-${color}-400 has-[:checked]:bg-${color}-50
                        border-gray-200 hover:border-gray-300
                      `}
                    >
                      <input
                        type="radio"
                        value={value}
                        className={`accent-${color}-600`}
                        {...register('role')}
                      />
                      <span className="text-sm font-medium text-gray-800">{label}</span>
                    </label>
                  ))}
                </div>
                {errors.role && (
                  <p className="text-xs text-red-600">{errors.role.message}</p>
                )}
              </div>
            )}

            {serverError && (
              <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-3 py-2.5">
                {serverError}
              </div>
            )}

            <Button type="submit" loading={loading} className="w-full" size="lg">
              {isLogin ? 'Sign In' : 'Create Account'}
            </Button>
          </form>
        </div>

        {/* Demo credentials — login mode only */}
        {isLogin && (
          <div className="mt-4 bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
              Demo accounts — click to fill
            </p>
            <div className="space-y-2">
              {DEMO_ACCOUNTS.map((acc) => (
                <button
                  key={acc.label}
                  type="button"
                  onClick={() => fillDemo(acc)}
                  className={`w-full flex items-center gap-3 p-2.5 rounded-xl border text-left transition-colors hover:bg-gray-50 ${
                    acc.color === 'violet' ? 'border-violet-100' : 'border-indigo-100'
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                      acc.color === 'violet'
                        ? 'bg-violet-100 text-violet-700'
                        : 'bg-indigo-100 text-indigo-700'
                    }`}
                  >
                    {acc.label[0]}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-800">{acc.label}</p>
                    <p className="text-xs text-gray-400">{acc.email}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
