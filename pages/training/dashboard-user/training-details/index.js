import React from "react";
import Layout from "@/components/LayoutDashboardUser";

const TrainingShow = () => {
    return (
        <Layout>
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-8">
                <div className="container mx-auto max-w-7xl">
                    {/* Back Button */}
                    <div className="mb-8">
                        <button 
                            onClick={() => window.history.back()}
                            className="group flex items-center px-6 py-3 bg-white text-gray-700 rounded-full shadow-md hover:shadow-lg hover:bg-gray-50 transition-all duration-300 transform hover:-translate-y-1"
                        >
                            <svg className="w-5 h-5 mr-2 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Back to Dashboard
                        </button>
                    </div>

                    <div className="grid grid-cols-12 gap-8">
                        {/* Main Content */}
                        <div className="col-span-12 lg:col-span-8">
                            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                                {/* Hero Image */}
                                <div className="relative overflow-hidden">
                                    <img 
                                        src="/images/training.png" 
                                        alt="Training Image" 
                                        className="w-full h-72 object-cover transform hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                                    <div className="absolute bottom-6 left-6 right-6">
                                        <div className="flex items-center space-x-2 mb-2">
                                            <span className="px-3 py-1 bg-blue-600 text-white text-sm rounded-full">Featured</span>
                                            <span className="px-3 py-1 bg-green-600 text-white text-sm rounded-full">Professional</span>
                                        </div>
                                        <h1 className="text-3xl font-bold text-white mb-2">
                                            Advanced Leadership Training 
                                        </h1>
                                        <p className="text-gray-200 text-lg">
                                            Master the art of leading teams to success
                                        </p>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-8">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">Duration</p>
                                                <p className="font-semibold">3 Days</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">Participants</p>
                                                <p className="font-semibold">Max 20</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                                                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">Certificate</p>
                                                <p className="font-semibold">Available</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="prose prose-lg max-w-none">
                                        <h3 className="text-xl font-bold text-gray-800 mb-4">Lorem Ipsum Dolor Sit Amet</h3>
                                        <p className="text-gray-600 mb-6 leading-relaxed">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                                        </p>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                            <div className="bg-blue-50 p-6 rounded-xl">
                                                <h4 className="font-semibold text-blue-900 mb-3">Lorem Ipsum</h4>
                                                <ul className="space-y-2 text-blue-800">
                                                    <li className="flex items-center">
                                                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                        </svg>
                                                        Lorem Ipsum dolor sit amet
                                                    </li>
                                                    <li className="flex items-center">
                                                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                        </svg>
                                                        Lorem Ipsum dolor sit amet
                                                    </li>
                                                    <li className="flex items-center">
                                                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                        </svg>
                                                        Lorem Ipsum dolor sit amet
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="bg-green-50 p-6 rounded-xl">
                                                <h4 className="font-semibold text-green-900 mb-3">Lorem Ipsum</h4>
                                                <ul className="space-y-2 text-green-800">
                                                    <li className="flex items-center">
                                                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                        </svg>
                                                        Lorem Ipsum dolor sit amet
                                                    </li>
                                                    <li className="flex items-center">
                                                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                        </svg>
                                                        Lorem Ipsum dolor sit amet
                                                    </li>
                                                    <li className="flex items-center">
                                                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                        </svg>
                                                        Lorem Ipsum dolor sit amet
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Request Form */}
                        <div className="col-span-12 lg:col-span-4">
                            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 sticky top-8">
                                <div className="text-center mb-6"> 
                                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                                        Request Training
                                    </h2>
                                    <p className="text-gray-600">
                                        Fill out the form to join this training
                                    </p>
                                </div>

                                <form className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            NIK <span className="text-red-500">*</span>
                                        </label>
                                        <input 
                                            type="text" 
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                            placeholder="Masukkan NIK Anda"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Nama Lengkap <span className="text-red-500">*</span>
                                        </label>
                                        <input 
                                            type="text" 
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                            placeholder="Masukkan nama lengkap Anda"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            DEPT./SECT. <span className="text-red-500">*</span>
                                        </label>
                                        <input 
                                            type="text" 
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                            placeholder="Masukkan departemen atau sektor Anda"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Posisi <span className="text-red-500">*</span>
                                        </label>
                                        <input 
                                            type="text" 
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                            placeholder="Masukkan posisi Anda"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Alasan Mengikuti Training <span className="text-red-500">*</span>
                                        </label>
                                        <textarea 
                                            rows="4" 
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                                            placeholder="Jelaskan alasan Anda mengikuti training ini..."
                                        />
                                    </div>

                                    <button 
                                        type="submit"
                                        className="w-full bg-green-500  text-white py-4 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
                                    >
                                        Submit Request
                                    </button>
                                </form>

                                <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                                    <div className="flex items-start">
                                        <svg className="w-12 h-12 text-yellow-600 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                        </svg>
                                        <div>
                                            <p className="text-sm font-medium text-yellow-800">Important Note</p>
                                            <p className="text-sm text-yellow-700 mt-1">
                                                lorem ipsum dolor sit amet.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default TrainingShow;