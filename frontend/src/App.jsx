    import React, { useState } from 'react';

    function App() {
    const [darkMode, setDarkMode] = useState(false);

    return (
        <div className={`min-h-screen transition-colors ${darkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-blue-500 to-purple-600 text-white'}`}>
        <div className="container mx-auto px-4 py-16">
            <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">
                🚀 Web Programmer Challenge
            </h1>
            <p className="text-xl mb-2">PT. Javis Teknologi Albarokah</p>
            
            <div className="max-w-md mx-auto bg-white/10 backdrop-blur-md rounded-2xl p-8 mt-8">
                <h2 className="text-2xl font-bold mb-4">Login System</h2>
                
                <div className="space-y-4">
                <div>
                    <input 
                    type="text" 
                    placeholder="Email or Username"
                    className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/70"
                    />
                </div>
                
                <div>
                    <input 
                    type="password" 
                    placeholder="Password" 
                    className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/70"
                    />
                </div>
                
                <button className="w-full bg-white text-blue-600 font-bold py-3 rounded-xl hover:bg-gray-100 transition-colors">
                    Sign In
                </button>
                </div>
                
                <div className="mt-6 p-3 bg-blue-500/30 rounded-lg">
                <p className="text-sm">
                    <strong>Demo:</strong> admin / admin123
                </p>
                </div>
            </div>

            <button 
                onClick={() => setDarkMode(!darkMode)}
                className="mt-8 bg-white/20 px-6 py-3 rounded-xl backdrop-blur-md hover:bg-white/30 transition-colors"
            >
                {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
            </button>
            </div>
        </div>
        </div>
    );
    }

    export default App;