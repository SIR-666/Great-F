import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { FaUser } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthContext from '@/context/training/Auth'; // Gunakan default import seperti di login.js

export default function LoginPage() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    // Gunakan try-catch untuk handle AuthContext
    let authContext;
    try {
        authContext = useContext(AuthContext);
    } catch (error) {
        console.error('AuthContext error:', error);
        authContext = null;
    }

    // Fallback jika AuthContext tidak tersedia
    if (!authContext) {
        const handleSubmitFallback = async (e) => {
            e.preventDefault();
            setLoading(true);
            
            try {
                // Simulate login process
                await new Promise(resolve => setTimeout(resolve, 1000));
                toast.success('Login successful! Redirecting...');
                
                setTimeout(() => {
                    router.push('/training/dashboard-user');
                }, 1500);
            } catch (error) {
                toast.error('Login failed. Please try again.');
                setLoading(false);
            }
        };

        return <LoginFormComponent 
            formData={formData}
            setFormData={setFormData}
            loading={loading}
            handleSubmit={handleSubmitFallback}
        />;
    }

    const { login, error } = authContext;

    useEffect(() => {
        if (error) {
            toast.error(error.message || 'An error occurred during login');
            setLoading(false);
        }
    }, [error]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await login({ 
                email: formData.email, 
                password: formData.password 
            });
        } catch (err) {
            toast.error(err.message || 'Login failed. Please try again.');
            setLoading(false);
        }
    };

    return <LoginFormComponent 
        formData={formData}
        setFormData={setFormData}
        loading={loading}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
    />;
}

// Component UI dengan Tailwind CSS
function LoginFormComponent({ formData, setFormData, loading, handleSubmit, handleChange }) {
    const defaultHandleChange = handleChange || ((e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    });

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <ToastContainer 
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                className="z-50"
            />
            
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="flex justify-center">
                    <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                        <FaUser className="text-white text-xl" />
                    </div>
                </div>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Masuk ke akun Anda
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Atau{' '}
                    <Link href="/training/auth/register" className="font-medium text-blue-600 hover:text-blue-500">
                        daftar akun baru
                    </Link>
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <div className="mt-1">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={formData.email}
                                    onChange={defaultHandleChange}
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    placeholder="Masukkan email Anda"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <div className="mt-1">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    value={formData.password}
                                    onChange={defaultHandleChange}
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    placeholder="Masukkan password Anda"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                    Ingat saya
                                </label>
                            </div>

                            <div className="text-sm">
                                <Link href="/training/auth/forgot-password" className="font-medium text-blue-600 hover:text-blue-500">
                                    Lupa password?
                                </Link>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                            >
                                {loading ? (
                                    <div className="flex items-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Memproses...
                                    </div>
                                ) : (
                                    'Masuk'
                                )}
                            </button>
                        </div>
                    </form>

                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">Atau</span>
                            </div>
                        </div>

                        <div className="mt-6">
                            <Link
                                href="/training"
                                className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors duration-200"
                            >
                                Kembali ke beranda
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}