    import React, { useState, useEffect } from 'react';
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
    const [countdown, setCountdown] = useState(0); // ⬅️ STATE BARU UNTUK COUNTDOWN
    const { login, loading } = useAuth();
    const navigate = useNavigate();

    // Countdown timer effect
    useEffect(() => {
        let timer;
        if (countdown > 0) {
        timer = setInterval(() => {
            setCountdown(prev => {
            if (prev <= 1) {
                clearInterval(timer);
                return 0;
            }
            return prev - 1;
            });
        }, 1000);
        }
        
        return () => {
        if (timer) clearInterval(timer);
        };
    }, [countdown]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
        ...prev,
        [name]: value
        }));
        
        // Clear error when user starts typing
        if (errors[name]) {
        setErrors(prev => ({
            ...prev,
            [name]: ''
        }));
        }
        
        // Clear general error ketika user mulai mengetik
        if (errors.general) {
        setErrors(prev => ({
            ...prev,
            general: ''
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

        // Jika masih dalam countdown, jangan proses login
        if (countdown > 0) {
        setErrors({ 
            general: `Please wait ${countdown} seconds before trying again.` 
        });
        return;
        }

        const result = await login(formData.email, formData.password);
        console.log('handleSubmit - Login result:', result);
        
        if (result.success) {
        console.log('handleSubmit - Login successful, navigating to dashboard');
        navigate('/dashboard');
        } else {
        console.log('handleSubmit - Login failed:', result.error);
        
        // Jika ada retryAfter dari backend, set countdown
        if (result.retryAfter) {
            setCountdown(result.retryAfter);
        }
        
        setErrors({ 
            general: result.error,
            isRateLimited: result.isRateLimited 
        });
        }
    };

    // Format countdown untuk display
    const formatCountdown = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
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
            {/* Countdown Display */}
            {countdown > 0 && (
                <div className="bg-orange-500/20 border border-orange-500/50 rounded-lg p-4 text-center">
                <div className="flex items-center justify-center space-x-2 text-orange-600 dark:text-orange-400">
                    <span className="text-lg">⏰</span>
                    <div>
                    <p className="font-semibold">Too many attempts</p>
                    <p className="text-sm">Try again in:</p>
                    <p className="text-xl font-bold countdown-timer">
                        {formatCountdown(countdown)}
                    </p>
                    </div>
                </div>
                </div>
            )}

            {/* Error Messages */}
            {errors.general && (
                <div className={`rounded-lg p-4 border ${
                errors.isRateLimited 
                    ? 'bg-orange-50 dark:bg-orange-900/50 border-orange-200 dark:border-orange-800' 
                    : 'bg-red-50 dark:bg-red-900/50 border-red-200 dark:border-red-800'
                }`}>
                <div className="flex items-center space-x-2">
                    <span className={`text-lg ${
                    errors.isRateLimited ? 'text-orange-500' : 'text-red-500'
                    }`}>
                    {errors.isRateLimited ? '⚠️' : '❌'}
                    </span>
                    <p className={`text-sm font-medium ${
                    errors.isRateLimited 
                        ? 'text-orange-700 dark:text-orange-300' 
                        : 'text-red-700 dark:text-red-300'
                    }`}>
                    {errors.general}
                    </p>
                </div>
                
                {/* Progress bar untuk countdown */}
                {errors.isRateLimited && countdown > 0 && (
                    <div className="mt-2 w-full bg-orange-200 dark:bg-orange-800 rounded-full h-2">
                    <div 
                        className="bg-orange-500 h-2 rounded-full transition-all duration-1000 ease-linear"
                        style={{ 
                        width: `${(countdown / 60) * 100}%` 
                        }}
                    ></div>
                    </div>
                )}
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
                } ${countdown > 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                placeholder="Enter your email or username"
                disabled={loading || countdown > 0}
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
                    } ${countdown > 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                    placeholder="Enter your password"
                    disabled={loading || countdown > 0}
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                    disabled={loading || countdown > 0}
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
                    disabled={countdown > 0}
                />
                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                    Remember me
                </span>
                </label>
                
                <button
                type="button"
                className="text-sm text-primary-600 hover:text-primary-500 dark:text-primary-400 font-medium"
                disabled={countdown > 0}
                >
                Forgot password?
                </button>
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                disabled={loading || countdown > 0}
                className={`w-full font-semibold py-3 px-4 rounded-xl transition-all duration-300 transform focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
                countdown > 0
                    ? 'bg-gray-400 text-gray-200 cursor-not-allowed transform-none'
                    : 'bg-gradient-to-r from-primary-500 to-cyan-500 hover:from-primary-600 hover:to-cyan-600 text-white hover:scale-105'
                } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
                {loading ? (
                <div className="flex items-center justify-center space-x-2">
                    <LoadingSpinner size="small" text="" />
                    <span>Signing in...</span>
                </div>
                ) : countdown > 0 ? (
                <div className="flex items-center justify-center space-x-2">
                    <span className="text-lg">⏰</span>
                    <span>Try again in {formatCountdown(countdown)}</span>
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