    // test-routes.js
    import authRoutes from './routes/auth.js';
    import dashboardRoutes from './routes/dashboard.js';

    console.log('Testing route imports...');

    try {
    console.log('✅ Auth routes imported successfully');
    console.log('✅ Dashboard routes imported successfully');
    
    // Cek jika routes punya method yang diperlukan
    if (typeof authRoutes === 'function') {
        console.log('✅ Auth routes is a function (Express router)');
    } else {
        console.log('❌ Auth routes is not a function');
    }
    
    if (typeof dashboardRoutes === 'function') {
        console.log('✅ Dashboard routes is a function (Express router)');
    } else {
        console.log('❌ Dashboard routes is not a function');
    }
    
    } catch (error) {
    console.error('❌ Error importing routes:', error.message);
    }