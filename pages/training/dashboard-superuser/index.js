import React from "react";
import Layout from "@/components/LayoutDashboardSuperUser";
import Image from "next/image";

const DashboardReports = () => {
  return (
    <Layout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold">Training Reports</h1>
            <p className="text-sm text-gray-500">
              Monitor and analyze training progress across all departments
            </p>
          </div>
          
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            { title: "Total Trainees", value: 245, change: "+12.5%", up: true },
            {
              title: "Completed Modules",
              value: 1453,
              change: "+8.2%",
              up: true,
            },
            { title: "Average Score", value: "78%", change: "+2.3%", up: true },
            { title: "Active Training", value: 18, change: "+15.3%", up: true },
            { title: "Pending Tests", value: 32, change: "-5.2%", up: false },
          ].map((item, idx) => (
            <div key={idx} className="bg-white border rounded-lg p-4 shadow-sm">
              <p className="text-sm text-gray-500">{item.title}</p>
              <p className="text-xl font-semibold">{item.value}</p>
              <p
                className={`text-xs ${
                  item.up ? "text-green-600" : "text-red-500"
                }`}
              >
                {item.change} From Last Month
              </p>
            </div>
          ))}
        </div>

        {/* Training Progress Chart */}
        <div className="bg-white border rounded-lg p-4 shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-medium">Training Progress Overview</h2>
            <button className="text-sm text-blue-600 hover:underline">
              View Detailed Analytics
            </button>
          </div>
          <div className="h-48 bg-gradient-to-br from-blue-100 via-white to-white rounded-lg flex items-center justify-center text-gray-400">
            {/* Replace this with a real chart */}
            Training Progress Chart (245 Active Users - 78% Completion Rate)
          </div>
        </div>

        {/* Training Performance */}
        <div className="grid lg:grid-cols-3 gap-4">
          <div className="col-span-2">
            {/* Training Performance Table */}
            <div className="bg-white border rounded-lg p-4 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-semibold text-gray-900">
                  Training Performance Overview
                </h2>
                <div className="flex items-center gap-2">
                  <select className="text-xs border rounded px-2 py-1">
                    <option>All Departments</option>
                    <option>IT Department</option>
                    <option>Production</option>
                    <option>Operations</option>
                    <option>Engineering</option>
                  </select>
                </div>
              </div>

              <div className="overflow-x-auto max-h-96 overflow-y-auto">
                <table className="min-w-full text-sm text-left">
                  <thead className="bg-gray-50 sticky top-0">
                    <tr className="border-b">
                      <th className="p-3 font-medium text-gray-700">
                        Module Name
                      </th>
                      <th className="p-3 font-medium text-gray-700">
                        Department
                      </th>
                      <th className="p-3 font-medium text-gray-700">
                        Enrolled
                      </th>
                      <th className="p-3 font-medium text-gray-700">
                        Completed
                      </th>
                      <th className="p-3 font-medium text-gray-700">
                        Avg Score
                      </th>
                      <th className="p-3 font-medium text-gray-700">
                        Pass Rate
                      </th>
                      <th className="p-3 font-medium text-gray-700">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b hover:bg-gray-50 transition-colors">
                      <td className="p-3 font-medium text-gray-900">
                        Network Fundamentals
                      </td>
                      <td className="p-3 text-gray-600">IT Department</td>
                      <td className="p-3">45</td>
                      <td className="p-3">38</td>
                      <td className="p-3">82%</td>
                      <td className="p-3 text-green-600 font-medium">84%</td>
                      <td className="p-3">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Active
                        </span>
                      </td>
                    </tr>
                    <tr className="border-b hover:bg-gray-50 transition-colors">
                      <td className="p-3 font-medium text-gray-900">
                        Quality Control
                      </td>
                      <td className="p-3 text-gray-600">Production</td>
                      <td className="p-3">62</td>
                      <td className="p-3">55</td>
                      <td className="p-3">76%</td>
                      <td className="p-3 text-yellow-500 font-medium">68%</td>
                      <td className="p-3">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          In Progress
                        </span>
                      </td>
                    </tr>
                    <tr className="border-b hover:bg-gray-50 transition-colors">
                      <td className="p-3 font-medium text-gray-900">
                        Safety Protocols
                      </td>
                      <td className="p-3 text-gray-600">Operations</td>
                      <td className="p-3">78</td>
                      <td className="p-3">72</td>
                      <td className="p-3">88%</td>
                      <td className="p-3 text-green-600 font-medium">92%</td>
                      <td className="p-3">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Completed
                        </span>
                      </td>
                    </tr>
                    <tr className="border-b hover:bg-gray-50 transition-colors">
                      <td className="p-3 font-medium text-gray-900">
                        Maintenance
                      </td>
                      <td className="p-3 text-gray-600">Engineering</td>
                      <td className="p-3">35</td>
                      <td className="p-3">28</td>
                      <td className="p-3">65%</td>
                      <td className="p-3 text-red-500 font-medium">57%</td>
                      <td className="p-3">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          Needs Review
                        </span>
                      </td>
                    </tr>
                    <tr className="border-b hover:bg-gray-50 transition-colors">
                      <td className="p-3 font-medium text-gray-900">
                        Data Analysis
                      </td>
                      <td className="p-3 text-gray-600">Analytics</td>
                      <td className="p-3">28</td>
                      <td className="p-3">25</td>
                      <td className="p-3">89%</td>
                      <td className="p-3 text-green-600 font-medium">89%</td>
                      <td className="p-3">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Active
                        </span>
                      </td>
                    </tr>
                    <tr className="border-b hover:bg-gray-50 transition-colors">
                      <td className="p-3 font-medium text-gray-900">
                        Customer Service
                      </td>
                      <td className="p-3 text-gray-600">Sales</td>
                      <td className="p-3">54</td>
                      <td className="p-3">48</td>
                      <td className="p-3">74%</td>
                      <td className="p-3 text-yellow-500 font-medium">74%</td>
                      <td className="p-3">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          In Progress
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          
          {/* Recent Training Activity */}
          <div className="bg-white border rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-gray-900">
                Recent Training Activity
              </h2>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-gray-500">Live</span>
              </div>
            </div>

            <div className="space-y-3 max-h-64 overflow-y-auto">
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border-l-4 border-green-500 hover:bg-gray-100 transition-colors">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-4 h-4 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-gray-900 text-sm truncate">
                      Sarah Johnson
                    </p>
                    <span className="text-xs text-gray-500">15m</span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">
                    Completed Network Fundamentals
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      85%
                    </span>
                    <span className="text-xs text-gray-500">IT</span>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border-l-4 border-blue-500 hover:bg-gray-100 transition-colors">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-4 h-4 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-gray-900 text-sm truncate">
                      Michael Chen
                    </p>
                    <span className="text-xs text-gray-500">32m</span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">
                    Started Quality Control
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      Progress
                    </span>
                    <span className="text-xs text-gray-500">Prod</span>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border-l-4 border-red-500 hover:bg-gray-100 transition-colors">
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-4 h-4 text-red-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-gray-900 text-sm truncate">
                      Emily Rodriguez
                    </p>
                    <span className="text-xs text-gray-500">1h</span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">
                    Failed Safety Protocols
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      45%
                    </span>
                    <span className="text-xs text-gray-500">Ops</span>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border-l-4 border-yellow-500 hover:bg-gray-100 transition-colors">
                <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-4 h-4 text-yellow-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-gray-900 text-sm truncate">
                      David Kim
                    </p>
                    <span className="text-xs text-gray-500">2h</span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">
                    Submitted Maintenance
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      Pending
                    </span>
                    <span className="text-xs text-gray-500">Eng</span>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border-l-4 border-purple-500 hover:bg-gray-100 transition-colors">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-4 h-4 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-gray-900 text-sm truncate">
                      Lisa Wang
                    </p>
                    <span className="text-xs text-gray-500">3h</span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">
                    Completed Quality Control
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                      92%
                    </span>
                    <span className="text-xs text-gray-500">QC</span>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border-l-4 border-indigo-500 hover:bg-gray-100 transition-colors">
                <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-4 h-4 text-indigo-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-gray-900 text-sm truncate">
                      John Martinez
                    </p>
                    <span className="text-xs text-gray-500">4h</span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">
                    Started Safety Protocols
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                      Starting
                    </span>
                    <span className="text-xs text-gray-500">Safe</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-gray-200">
              <button className="w-full px-3 py-2 text-xs font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors flex items-center justify-center gap-2">
                <svg
                  className="w-3 h-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
                View All Activity
              </button>
            </div>
          </div>
        </div>

        {/* Department Performance */}
        <div className="bg-white border rounded-lg p-4 shadow-sm">
          <h2 className="font-medium mb-4">Department Training Performance</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { dept: "IT Department", completed: 85, total: 45, rate: "84%" },
              { dept: "Production", completed: 55, total: 62, rate: "68%" },
              { dept: "Operations", completed: 72, total: 78, rate: "92%" },
              { dept: "Engineering", completed: 28, total: 35, rate: "57%" },
            ].map((item, idx) => (
              <div key={idx} className="border rounded-lg p-3">
                <h3 className="font-medium text-sm">{item.dept}</h3>
                <p className="text-xs text-gray-500 mb-2">
                  {item.completed}/{item.total} completed
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                  <div
                    className={`h-2 rounded-full ${
                      parseInt(item.rate) >= 80
                        ? "bg-green-500"
                        : parseInt(item.rate) >= 70
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                    style={{ width: item.rate }}
                  ></div>
                </div>
                <p className="text-xs font-medium">
                  {item.rate} completion rate
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardReports;
