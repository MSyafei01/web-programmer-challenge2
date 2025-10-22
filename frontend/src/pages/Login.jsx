    import React from 'react';
    import LoginForm from '../components/LoginForm';
    import ThemeToggle from '../components/ThemeToggle';
    import ParticlesBackground from '../components/ParticlesBackground';

    const Login = () => {
    return (
        <div className="min-h-screen gradient-bg flex items-center justify-center p-4 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary-900/20 via-transparent to-transparent"></div>
        
        {/* Animated Background Elements */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary-400/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
        
        {/* Particles Background */}
        <ParticlesBackground />
        
        {/* Theme Toggle - Fixed Position for Mobile */}
        <div className="fixed top-4 right-4 z-50">
            <ThemeToggle />
        </div>

        {/* Main Content */}
        <div className="relative z-10 w-full max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Side - Branding */}
            <div className="text-center lg:text-left order-2 lg:order-1">
                <div className="glass-effect rounded-3xl p-6 lg:p-8 backdrop-blur-md mx-auto lg:mx-0 max-w-md lg:max-w-none">
                <h1 className="text-3xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                    Web Programmer
                    <span className="block text-cyan-300 mt-2">Challenge</span>
                </h1>
                <p className="text-lg lg:text-xl text-cyan-100 mb-6">
                    PT. Javis Teknologi Albarokah
                </p>
                <div className="space-y-3 text-cyan-50 text-sm lg:text-base">
                    <div className="flex items-center space-x-3 justify-center lg:justify-start">
                    <span className="w-2 h-2 bg-cyan-400 rounded-full flex-shrink-0"></span>
                    <span>Modern Authentication System</span>
                    </div>
                    <div className="flex items-center space-x-3 justify-center lg:justify-start">
                    <span className="w-2 h-2 bg-cyan-400 rounded-full flex-shrink-0"></span>
                    <span>Secure & Scalable Architecture</span>
                    </div>
                    <div className="flex items-center space-x-3 justify-center lg:justify-start">
                    <span className="w-2 h-2 bg-cyan-400 rounded-full flex-shrink-0"></span>
                    <span>Professional IT Solutions</span>
                    </div>
                </div>
                </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="flex justify-center lg:justify-end order-1 lg:order-2">
                <LoginForm />
            </div>
            </div>
        </div>
        </div>
    );
    };

    export default Login;