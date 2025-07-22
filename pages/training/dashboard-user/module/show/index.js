import React, { useState } from "react";
import Layout from "@/components/LayoutDashboardUser";

export default function ModuleShow() {
  const [progress, setProgress] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  // State untuk pretest & posttest
  const [showPretest, setShowPretest] = useState(true);
  const [showMaterial, setShowMaterial] = useState(false);
  const [showPosttest, setShowPosttest] = useState(false);

  // Jawaban user
  const [pretestAnswers, setPretestAnswers] = useState({});
  const [posttestAnswers, setPosttestAnswers] = useState({});
  const [pretestSubmitted, setPretestSubmitted] = useState(false);
  const [posttestSubmitted, setPosttestSubmitted] = useState(false);

  // Soal pretest & posttest
const pretestQuestions = [
    {
        id: "mc1",
        type: "mc",
        question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit?",
        options: ["Lorem ipsum dolor", "Consectetur adipiscing", "Sed do eiusmod tempor", "Ut labore et dolore"],
        answer: "Lorem ipsum dolor"
    },
    {
        id: "mc2",
        type: "mc",
        question: "Sed do eiusmod tempor incididunt ut labore?",
        options: ["Magna aliqua", "Ut enim ad", "Minim veniam", "Quis nostrud"],
        answer: "Magna aliqua"
    },
    {
        id: "essay1",
        type: "essay",
        question: "Explicabo nemo enim ipsam voluptatem quia voluptas sit aspernatur?"
    },
    {
        id: "essay2",
        type: "essay",
        question: "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet?"
    }
];

  const posttestQuestions = [
    ...pretestQuestions,
    {
      id: "mc3",
      type: "mc",
      question: "Lorem ipsum?",
      options: [
        "lorem ipsum dolor sit amet",
        "dolor sit amet consectetur",
        "Sed do eiusmod tempor incididunt",
        "Ut labore et dolore"
      ],
      answer: "lorem ipsum dolor sit amet"
    },
    {
      id: "essay3",
      type: "essay",
      question: "lorem ipsum dolor sit amet."
    }
  ];

  const moduleData = {
    title: "MODULE TITLE",
    description:
      "Lorem Ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
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

  // Handler untuk pretest
  const handlePretestChange = (id, value) => {
    setPretestAnswers({ ...pretestAnswers, [id]: value });
  };
  const handlePretestSubmit = (e) => {
    e.preventDefault();
    setPretestSubmitted(true);
    setTimeout(() => {
      setShowPretest(false);
      setShowMaterial(true);
    }, 1000);
  };

  // Handler untuk posttest
  const handlePosttestChange = (id, value) => {
    setPosttestAnswers({ ...posttestAnswers, [id]: value });
  };
  const handlePosttestSubmit = (e) => {
    e.preventDefault();
    setPosttestSubmitted(true);
    setProgress(100);
    setIsCompleted(true);
  };

  // Custom SVG Icons (sama seperti sebelumnya)
  const PlayIcon = () => (
    <svg className="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h1m4 0h1" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
  const FileTextIcon = () => (
    <svg className="h-5 w-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  );
  const DownloadIcon = () => (
    <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  );
  const CheckCircleIcon = () => (
    <svg className={`h-5 w-5 ${isCompleted ? "text-green-600" : "text-gray-400"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
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
              <svg className="w-5 h-5 mr-2 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Kembali
            </button>
          </div>

          {/* PRETEST */}
          {showPretest && (
            <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-6 mb-8">
              <h2 className="text-xl font-bold mb-4 text-blue-700">Pretest</h2>
              <form onSubmit={handlePretestSubmit} className="space-y-6">
                {pretestQuestions.map((q, idx) => (
                  <div key={q.id}>
                    <label className="font-semibold">{idx + 1}. {q.question}</label>
                    {q.type === "mc" ? (
                      <div className="mt-2 space-y-1">
                        {q.options.map(opt => (
                          <label key={opt} className="flex items-center gap-2">
                            <input
                              type="radio"
                              name={q.id}
                              value={opt}
                              checked={pretestAnswers[q.id] === opt}
                              onChange={e => handlePretestChange(q.id, e.target.value)}
                              className="accent-blue-600"
                              required
                            />
                            {opt}
                          </label>
                        ))}
                      </div>
                    ) : (
                      <textarea
                        className="mt-2 w-full border rounded p-2"
                        rows={2}
                        value={pretestAnswers[q.id] || ""}
                        onChange={e => handlePretestChange(q.id, e.target.value)}
                        required
                      />
                    )}
                  </div>
                ))}
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
                  disabled={pretestSubmitted}
                >
                  {pretestSubmitted ? "Tunggu..." : "Submit Pretest"}
                </button>
              </form>
            </div>
          )}

          {/* MATERI */}
          {showMaterial && (
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
                      onClick={() => {
                        setShowMaterial(false);
                        setShowPosttest(true);
                      }}
                      className="w-full px-4 py-2 rounded-md font-medium transition-colors duration-200 bg-blue-600 text-white hover:bg-blue-700"
                    >
                      Lanjut ke Posttest
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* POSTTEST */}
          {showPosttest && (
            <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-6 mb-8">
              <h2 className="text-xl font-bold mb-4 text-blue-700">Posttest</h2>
              <form onSubmit={handlePosttestSubmit} className="space-y-6">
                {posttestQuestions.map((q, idx) => (
                  <div key={q.id}>
                    <label className="font-semibold">{idx + 1}. {q.question}</label>
                    {q.type === "mc" ? (
                      <div className="mt-2 space-y-1">
                        {q.options.map(opt => (
                          <label key={opt} className="flex items-center gap-2">
                            <input
                              type="radio"
                              name={q.id}
                              value={opt}
                              checked={posttestAnswers[q.id] === opt}
                              onChange={e => handlePosttestChange(q.id, e.target.value)}
                              className="accent-blue-600"
                              required
                            />
                            {opt}
                          </label>
                        ))}
                      </div>
                    ) : (
                      <textarea
                        className="mt-2 w-full border rounded p-2"
                        rows={2}
                        value={posttestAnswers[q.id] || ""}
                        onChange={e => handlePosttestChange(q.id, e.target.value)}
                        required
                      />
                    )}
                  </div>
                ))}
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
                  disabled={posttestSubmitted}
                >
                  {posttestSubmitted ? "Tunggu..." : "Submit Posttest"}
                </button>
              </form>
              {posttestSubmitted && (
                <div className="mt-4 text-green-600 font-semibold">
                  Posttest selesai! Terima kasih.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}