import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from './LoadingSpinner';


    // Password Strength Component
    const PasswordStrength = ({ password }) => {
    const getStrength = (pass) => {
        if (pass.length === 0) return 0;
        if (pass.length < 6) return 1;
        if (pass.length < 8) return 2;
        if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(pass)) return 3;
        return 4;
    };

    const strength = getStrength(password);
    const labels = ['', 'Very Weak', 'Weak', 'Good', 'Strong'];
    const colors = ['', 'bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-green-500'];

    if (password.length === 0) return null;

    return (
        <div className="mt-2">
        <div className="flex space-x-1 mb-1">
            {[1, 2, 3, 4].map((level) => (
            <div
                key={level}
                className={`h-1 flex-1 rounded-full transition-all ${
                level <= strength ? colors[strength] : 'bg-gray-300 dark:bg-gray-600'
                }`}
            />
            ))}
        </div>
        <p className={`text-xs font-medium ${
            strength === 1 ? 'text-red-500' :
            strength === 2 ? 'text-orange-500' :
            strength === 3 ? 'text-yellow-500' :
            strength === 4 ? 'text-green-500' : 'text-gray-500'
        }`}>
            Password strength: {labels[strength]}
        </p>
        </div>
    );
    };



        const LoginForm = () => {
        const [formData, setFormData] = useState({
            email: '',
            password: ''
        });
        const [showPassword, setShowPassword] = useState(false);
        const [rememberMe, setRememberMe] = useState(false);
        const [errors, setErrors] = useState({});
        const { login, loading } = useAuth();
        const navigate = useNavigate();

        const handleChange = (e) => {
            const { name, value } = e.target;
            setFormData(prev => ({
            ...prev,
            [name]: value
            }));
            
            if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
            }
        };

        const validateForm = () => {
            const newErrors = {};

            if (!formData.email.trim()) {
            newErrors.email = 'Email or username is required';
            }

            if (!formData.password) {
            newErrors.password = 'Password is required';
            } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
            }

            if (formData.email.includes('@') && !/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
            }

            setErrors(newErrors);
            return Object.keys(newErrors).length === 0;
        };

        const handleSubmit = async (e) => {
            e.preventDefault();
            console.log('handleSubmit - Form submitted');
            
            if (!validateForm()) {
            console.log('handleSubmit - Form validation failed');
            return;
            }

            const result = await login(formData.email, formData.password);
            console.log('handleSubmit - Login result:', result);
            
            if (result.success) {
            console.log('handleSubmit - Login successful, navigating to dashboard');
            // Redirect ke dashboard setelah login berhasil
            navigate('/dashboard');
            } else {
            console.log('handleSubmit - Login failed:', result.error);
            setErrors({ general: result.error });
            }
        };

    return (
        <div className="w-full max-w-md">
        <div className="glass-effect rounded-2xl p-8 cyber-glow">
            <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-cyan-500 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl text-white font-bold">JT</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Welcome Back
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
                Sign in to your account
            </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
            {errors.general && (
                <div className="bg-red-50 dark:bg-red-900/50 border border-red-200 dark:border-red-800 rounded-lg p-4">
                <p className="text-red-700 dark:text-red-300 text-sm font-medium">{errors.general}</p>
                </div>
            )}

            {/* Email Field */}
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email or Username
                </label>
                <input
                id="email"
                name="email"
                type="text"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-xl border bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all ${
                    errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                }`}
                placeholder="Enter your email or username"
                disabled={loading}
                />
                {errors.email && (
                <p className="text-red-500 text-sm mt-1 font-medium">{errors.email}</p>
                )}
            </div>

            {/* Password Field */}
            <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Password
                </label>
                <div className="relative">
                <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 pr-12 rounded-xl border bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all ${
                    errors.password ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                    }`}
                    placeholder="Enter your password"
                    disabled={loading}
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                    disabled={loading}
                >
                    {showPassword ? (
                    <span className="text-lg">👁️</span>
                    ) : (
                    <span className="text-lg">👁️‍🗨️</span>
                    )}
                </button>
                </div>
                <PasswordStrength password={formData.password} />
                {errors.password && (
                <p className="text-red-500 text-sm mt-1 font-medium">{errors.password}</p>
                )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
                <label className="flex items-center">
                <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500 border-gray-300 dark:border-gray-600"
                />
                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                    Remember me
                </span>
                </label>
                
                <button
                type="button"
                className="text-sm text-primary-600 hover:text-primary-500 dark:text-primary-400 font-medium"
                >
                Forgot password?
                </button>
            </div>

            {/* Social Login Divider */}
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-600" />
                </div>
                <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-gray-800 text-gray-500">Or continue with</span>
                </div>
            </div>

            {/* Social Login Buttons */}
            <div className="grid grid-cols-2 gap-3">
                <button
                type="button"
                className="flex items-center justify-center px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
                >
                <span className="text-lg mr-2">🔐</span>
                SSO
                </button>
                <button
                type="button"
                className="flex items-center justify-center px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
                >
                <span className="text-lg mr-2">👤</span>
                LDAP
                </button>
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-primary-500 to-cyan-500 hover:from-primary-600 hover:to-cyan-600 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
                {loading ? (
                <div className="flex items-center justify-center space-x-2">
                    <LoadingSpinner size="small" text="" />
                    <span>Signing in...</span>
                </div>
                ) : (
                'Sign In'
                )}
            </button>
            </form>

            {/* Demo Credentials */}
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg border border-blue-200 dark:border-blue-800">
            <p className="text-sm text-blue-700 dark:text-blue-300 text-center">
                <strong>Demo Credentials:</strong><br />
                Email: admin@javisteknologi.com<br />
                Username: admin<br />
                Password: admin123
            </p>
            </div>
        </div>
        </div>
    );
    };

    export default LoginForm;