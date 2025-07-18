import React, { useState } from "react";
import Layout from "@/components/LayoutDashboardUser";

export default function ModuleShow() {
  const [progress, setProgress] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const moduleData = {
    title: "MODULE TITLE",
    description:
      "Lorem Ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    video: {
      title: "Video Title",
      url: "/videos/network-fundamentals.mp4",
      duration: "45 minutes",
    },
    presentation: {
      title: "Lorem Ipsum - Dolor Sit Amet",
      url: "/presentations/module-training.pptx",
      pages: 32,
    },
  };

  const handleMarkComplete = () => {
    setProgress(100);
    setIsCompleted(true);
  };

  const handleDownload = (url, filename) => {
    // Simulate download
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
  };

  // Custom SVG Icons
  const PlayIcon = () => (
    <svg
      className="h-5 w-5 text-blue-600"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h1m4 0h1"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );

  const FileTextIcon = () => (
    <svg
      className="h-5 w-5 text-green-600"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      />
    </svg>
  );

  const DownloadIcon = () => (
    <svg
      className="h-4 w-4 mr-2"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      />
    </svg>
  );

  const CheckCircleIcon = () => (
    <svg
      className={`h-5 w-5 ${isCompleted ? "text-green-600" : "text-gray-400"}`}
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
  );

  return (
    <Layout title={`${moduleData.title} - Training Module`}>
    <div className="px-4 py-8">
      <div className="container mx-auto max-w-7xl">
        {/* Back Button */}
        <div className="mb-6">
          <button
            onClick={() => window.history.back()}
            className="group flex items-center px-6 py-3 bg-white text-gray-700 rounded-full shadow-md hover:shadow-lg hover:bg-gray-50 transition-all duration-300 transform hover:-translate-y-1"
          >
            <svg
              className="w-5 h-5 mr-2 group-hover:text-blue-600 transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Kembali
          </button>
        </div>

        {/* Main Grid Layout - Title, Description, Video di kiri | Sidebar di kanan */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Title, Description, dan Video */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title and Description */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {moduleData.title}
              </h1>
              <p className="text-lg text-gray-600">
                {moduleData.description}
              </p>
            </div>

            {/* Video Section */}
            <div className="bg-white rounded-lg border shadow-sm">
              <div className="p-6 pb-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <PlayIcon />
                  Video Pembelajaran
                </h3>
              </div>
              <div className="p-6 pt-0">
                <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                  <video
                    controls
                    className="w-full h-full rounded-lg"
                    poster="/images/video-thumbnail.jpg"
                  >
                    <source src={moduleData.video.url} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
                <div className="flex justify-between items-center text-sm text-gray-600">
                  <span className="font-medium">{moduleData.video.title}</span>
                  <span>{moduleData.video.duration}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar PPT dan Progress */}
          <div className="space-y-6">
            {/* Presentation Download */}
            <div className="bg-white rounded-lg border shadow-sm">
              <div className="p-6 pb-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <FileTextIcon />
                  Materi Presentasi
                </h3>
              </div>
              <div className="p-6 pt-0">
                <div className="mb-4">
                  <h4 className="font-medium text-gray-900 mb-1">
                    {moduleData.presentation.title}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {moduleData.presentation.pages} slides
                  </p>
                </div>
                <button
                  onClick={() =>
                    handleDownload(
                      moduleData.presentation.url,
                      "module-training.pptx"
                    )
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 flex items-center justify-center transition-colors duration-200"
                >
                  <DownloadIcon />
                  Download PPT
                </button>
              </div>
            </div>

            {/* Progress Section */}
            <div className="bg-white rounded-lg border shadow-sm">
              <div className="p-6 pb-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <CheckCircleIcon />
                  Progress
                </h3>
              </div>
              <div className="p-6 pt-0">
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Completion</span>
                    <span className="text-sm font-medium text-gray-900">
                      {progress}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>
                <button
                  onClick={handleMarkComplete}
                  disabled={isCompleted}
                  className={`w-full px-4 py-2 rounded-md font-medium transition-colors duration-200 ${
                    isCompleted
                      ? "bg-green-600 text-white cursor-not-allowed"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                >
                  {isCompleted ? "Completed ✓" : "Mark as Complete"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </Layout>
  );
}