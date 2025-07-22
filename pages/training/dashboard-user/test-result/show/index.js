import React from "react";
import Layout from "@/components/LayoutDashboardUser";

const testData = {
  module: "Lorem Ipsum Dolor",
  date: "1 Januari 2025",
  instructor: "John Doe",
  pretest: {
    score: 40,
    status: "Tidak Lulus",
    totalQuestions: 5,
    correctAnswers: 2,
    completedAt: "1 Jan 2025, 08:00",
    timeSpent: "10 menit",
    details: [
      {
        question: "Lorem ipsum dolor sit amet?",
        answer: "Consectetur adipiscing elit",
        correct: false,
      },
      {
        question: "Sed do eiusmod tempor incididunt?",
        answer: "Ut labore et dolore magna aliqua",
        correct: true,
      },
      {
        question: "Ut enim ad minim veniam?",
        answer: "Quis nostrud exercitation ullamco",
        correct: false,
      },
      {
        question: "Duis aute irure dolor in reprehenderit?",
        answer: "In voluptate velit esse cillum",
        correct: true,
      },
      {
        question: "Excepteur sint occaecat cupidatat non proident?",
        answer: "Sunt in culpa qui officia deserunt",
        correct: false,
      },
    ],
  },
  posttest: {
    score: 80,
    status: "Lulus",
    totalQuestions: 5,
    correctAnswers: 4,
    completedAt: "1 Jan 2025, 15:00",
    timeSpent: "12 menit",
    details: [
      {
        question: "Lorem ipsum dolor sit amet?",
        answer: "Consectetur adipiscing elit",
        correct: true,
      },
      {
        question: "Sed do eiusmod tempor incididunt?",
        answer: "Ut labore et dolore magna aliqua",
        correct: true,
      },
      {
        question: "Ut enim ad minim veniam?",
        answer: "Quis nostrud exercitation ullamco",
        correct: true,
      },
      {
        question: "Duis aute irure dolor in reprehenderit?",
        answer: "In voluptate velit esse cillum",
        correct: false,
      },
      {
        question: "Excepteur sint occaecat cupidatat non proident?",
        answer: "Sunt in culpa qui officia deserunt",
        correct: true,
      },
    ],
  },
};

export default function TestResultShow() {
  const getScoreColor = (score) => {
    if (score >= 80) return "text-green-600";
    if (score >= 70) return "text-blue-600";
    return "text-red-600";
  };

  const getScoreBgColor = (score) => {
    if (score >= 80) return "bg-green-100";
    if (score >= 70) return "bg-blue-100";
    return "bg-red-100";
  };

  return (
    <Layout title="Detail Hasil Test">
      <div className="p-6 overflow-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="mb-8">
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

          <div className="bg-gradient-to-r bg-purple-600 from-purple-400 to-purple-600 p-6 rounded-xl text-white shadow-lg">
            <h1 className="text-3xl font-bold mb-2">{testData.module}</h1>
            <div className="flex items-center gap-6 text-blue-100">
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                {testData.date}
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                {testData.instructor}
              </div>
            </div>
          </div>
        </div>

        {/* Test Results Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Pretest Card */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800">Pre-test</h2>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${getScoreBgColor(
                  testData.pretest.score
                )} ${getScoreColor(testData.pretest.score)}`}
              >
                {testData.pretest.status}
              </span>
            </div>

            <div className="text-center mb-6">
              <div
                className={`text-4xl font-bold mb-2 ${getScoreColor(
                  testData.pretest.score
                )}`}
              >
                {testData.pretest.score}
              </div>
              <div className="text-gray-600 text-sm">
                {testData.pretest.correctAnswers} dari{" "}
                {testData.pretest.totalQuestions} soal benar
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Waktu Pengerjaan:</span>
                <span className="font-medium">
                  {testData.pretest.timeSpent}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Selesai pada:</span>
                <span className="font-medium">
                  {testData.pretest.completedAt}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Akurasi:</span>
                <span className="font-medium">
                  {Math.round(
                    (testData.pretest.correctAnswers /
                      testData.pretest.totalQuestions) *
                      100
                  )}
                  %
                </span>
              </div>
            </div>

            <div className="mt-4 bg-gray-50 rounded-lg p-3">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${
                    testData.pretest.score >= 80
                      ? "bg-green-500"
                      : testData.pretest.score >= 70
                      ? "bg-blue-500"
                      : "bg-red-500"
                  }`}
                  style={{ width: `${testData.pretest.score}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Posttest Card */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800">Post-test</h2>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${getScoreBgColor(
                  testData.posttest.score
                )} ${getScoreColor(testData.posttest.score)}`}
              >
                {testData.posttest.status}
              </span>
            </div>

            <div className="text-center mb-6">
              <div
                className={`text-4xl font-bold mb-2 ${getScoreColor(
                  testData.posttest.score
                )}`}
              >
                {testData.posttest.score}
              </div>
              <div className="text-gray-600 text-sm">
                {testData.posttest.correctAnswers} dari{" "}
                {testData.posttest.totalQuestions} soal benar
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Waktu Pengerjaan:</span>
                <span className="font-medium">
                  {testData.posttest.timeSpent}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Selesai pada:</span>
                <span className="font-medium">
                  {testData.posttest.completedAt}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Akurasi:</span>
                <span className="font-medium">
                  {Math.round(
                    (testData.posttest.correctAnswers /
                      testData.posttest.totalQuestions) *
                      100
                  )}
                  %
                </span>
              </div>
            </div>

            <div className="mt-4 bg-gray-50 rounded-lg p-3">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${
                    testData.posttest.score >= 80
                      ? "bg-green-500"
                      : testData.posttest.score >= 70
                      ? "bg-blue-500"
                      : "bg-red-500"
                  }`}
                  style={{ width: `${testData.posttest.score}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Improvement Analysis */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Analisis Peningkatan
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600 mb-1">
                +{testData.posttest.score - testData.pretest.score}
              </div>
              <div className="text-sm text-gray-600">Peningkatan Nilai</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600 mb-1">
                +
                {testData.posttest.correctAnswers -
                  testData.pretest.correctAnswers}
              </div>
              <div className="text-sm text-gray-600">Jawaban Benar</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600 mb-1">
                {Math.round(
                  (testData.posttest.correctAnswers /
                    testData.posttest.totalQuestions -
                    testData.pretest.correctAnswers /
                      testData.pretest.totalQuestions) *
                    100
                )}
                %
              </div>
              <div className="text-sm text-gray-600">Peningkatan Akurasi</div>
            </div>
          </div>
        </div>

        {/* Detailed Results */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pretest Details */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              Detail Jawaban Pretest
            </h3>
            <div className="space-y-3">
              {testData.pretest.details.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
                >
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs ${
                      item.correct ? "bg-green-500" : "bg-red-500"
                    }`}
                  >
                    {item.correct ? "✓" : "✗"}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-800 mb-1">
                      {item.question}
                    </div>
                    <div className="text-sm text-gray-600">{item.answer}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Posttest Details */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              Detail Jawaban Posttest
            </h3>
            <div className="space-y-3">
              {testData.posttest.details.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
                >
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs ${
                      item.correct ? "bg-green-500" : "bg-red-500"
                    }`}
                  >
                    {item.correct ? "✓" : "✗"}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-800 mb-1">
                      {item.question}
                    </div>
                    <div className="text-sm text-gray-600">{item.answer}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
