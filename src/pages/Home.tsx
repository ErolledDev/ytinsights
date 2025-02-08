import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Youtube,
  AlertCircle,
  Users,
  Video,
  Eye,
  TrendingUp,
  DollarSign,
  BarChart2,
  Download,
  FileText,
  PieChart,
} from 'lucide-react';
import toast from 'react-hot-toast';
import {
  fetchChannelData,
  calculateMetrics,
  generateAIReport,
  generatePDF,
} from '../utils/api';
import { ChannelData, ChannelMetrics, AIReport } from '../types';

export const Home = () => {
  const [channelUrl, setChannelUrl] = useState('');
  const [youtubeApiKey, setYoutubeApiKey] = useState(() => 
    localStorage.getItem('youtubeApiKey') || ''
  );
  const [geminiApiKey, setGeminiApiKey] = useState(() => 
    localStorage.getItem('geminiApiKey') || ''
  );
  const [loading, setLoading] = useState(false);
  const [channelData, setChannelData] = useState<ChannelData | null>(null);
  const [metrics, setMetrics] = useState<ChannelMetrics | null>(null);
  const [aiReport, setAiReport] = useState<AIReport | null>(null);

  useEffect(() => {
    if (youtubeApiKey) {
      localStorage.setItem('youtubeApiKey', youtubeApiKey);
    }
    if (geminiApiKey) {
      localStorage.setItem('geminiApiKey', geminiApiKey);
    }
  }, [youtubeApiKey, geminiApiKey]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const channelUsername = channelUrl.split('@')[1] || channelUrl;
      const data = await fetchChannelData(channelUsername, youtubeApiKey);
      setChannelData(data);

      const calculatedMetrics = calculateMetrics(data);
      setMetrics(calculatedMetrics);

      const report = await generateAIReport(
        data,
        calculatedMetrics,
        geminiApiKey
      );
      setAiReport(report);

      toast.success('Analysis complete!');
    } catch (error) {
      toast.error(
        'Error analyzing channel. Please check your inputs and try again.'
      );
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPDF = () => {
    if (channelData && metrics && aiReport) {
      generatePDF(channelData, metrics, aiReport);
      toast.success('PDF report downloaded!');
    }
  };

  return (
    <>
      {/* Blob Effects */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-red-100 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-green-100 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>

      <div className="relative space-y-8 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 px-4">
            YouTube Channel Analytics + AI Insights
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto px-4">
            Get comprehensive metrics and AI-powered analysis for any YouTube
            channel. Understand performance, growth potential, and content
            strategy recommendations.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          onSubmit={handleSubmit}
          className="max-w-xl mx-auto space-y-4 px-4"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              YouTube Channel URL
            </label>
            <input
              type="text"
              value={channelUrl}
              onChange={(e) => setChannelUrl(e.target.value)}
              placeholder="@username or https://youtube.com/@username"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent truncate"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              YouTube API Key
            </label>
            <input
              type="text"
              value={youtubeApiKey}
              onChange={(e) => setYoutubeApiKey(e.target.value)}
              placeholder="Enter your YouTube Data API v3 key"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent truncate"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Google Gemini API Key
            </label>
            <input
              type="text"
              value={geminiApiKey}
              onChange={(e) => setGeminiApiKey(e.target.value)}
              placeholder="Enter your Gemini API key"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent truncate"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
          >
            {loading ? 'Analyzing...' : 'Analyze Channel'}
          </button>

          <div className="text-sm text-gray-600 flex items-center justify-center space-x-1">
            <AlertCircle className="w-4 h-4" />
            <span>Need API keys? Check our guide in the Features page.</span>
          </div>
        </motion.form>

        {channelData && metrics && aiReport && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8 max-w-6xl mx-auto px-4"
          >
            {/* Channel Overview */}
            <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-200">
              <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
                <img
                  src={channelData.snippet.thumbnails.medium.url}
                  alt={channelData.snippet.title}
                  className="w-24 h-24 rounded-full border-4 border-red-500"
                />
                <div className="flex-1 text-center sm:text-left">
                  <h2 className="text-2xl font-bold text-gray-900 break-words">
                    {channelData.snippet.title}
                  </h2>
                  <p className="text-gray-600 line-clamp-2 break-words">
                    {channelData.snippet.description}
                  </p>
                  <div className="mt-2 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                    <PieChart className="w-4 h-4 mr-1" />
                    {aiReport.category}
                  </div>
                </div>
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-200">
                <div className="flex items-center space-x-3">
                  <Users className="w-8 h-8 text-red-500 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-600">
                      Subscribers
                    </p>
                    <p className="text-xl sm:text-2xl font-bold text-gray-900 truncate">
                      {parseInt(
                        channelData.statistics.subscriberCount
                      ).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-200">
                <div className="flex items-center space-x-3">
                  <Video className="w-8 h-8 text-red-500 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-600">Videos</p>
                    <p className="text-xl sm:text-2xl font-bold text-gray-900 truncate">
                      {parseInt(
                        channelData.statistics.videoCount
                      ).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-200">
                <div className="flex items-center space-x-3">
                  <Eye className="w-8 h-8 text-red-500 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-600">
                      Total Views
                    </p>
                    <p className="text-xl sm:text-2xl font-bold text-gray-900 truncate">
                      {parseInt(
                        channelData.statistics.viewCount
                      ).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-200">
                <div className="flex items-center space-x-3">
                  <BarChart2 className="w-8 h-8 text-red-500 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-600">
                      Average Views
                    </p>
                    <p className="text-xl sm:text-2xl font-bold text-gray-900 truncate">
                      {metrics.averageViews.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-200">
                <div className="flex items-center space-x-3">
                  <TrendingUp className="w-8 h-8 text-red-500 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-600">
                      Engagement Rate
                    </p>
                    <p className="text-xl sm:text-2xl font-bold text-gray-900 truncate">
                      {metrics.engagementRate.toFixed(2)}%
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-200">
                <div className="flex items-center space-x-3">
                  <DollarSign className="w-8 h-8 text-red-500 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-600">
                      Revenue per 1000 Views
                    </p>
                    <p className="text-xl sm:text-2xl font-bold text-gray-900 truncate">
                      ${metrics.estimatedEarningsPerThousand.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-200 col-span-1 sm:col-span-2">
                <div className="flex items-center space-x-3">
                  <DollarSign className="w-8 h-8 text-red-500 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-600">
                      Estimated Yearly Earnings
                    </p>
                    <p className="text-xl sm:text-2xl font-bold text-gray-900 truncate">
                      ${metrics.estimatedYearlyEarnings.min.toLocaleString()} -
                      ${metrics.estimatedYearlyEarnings.max.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Analysis */}
            <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900 flex items-center">
                  <FileText className="w-6 h-6 mr-2 text-red-500" />
                  AI Analysis
                </h3>
              </div>
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-medium text-gray-900 mb-2">
                    Channel Summary
                  </h4>
                  <p className="text-gray-600 break-words">{aiReport.summary}</p>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-gray-900 mb-2">
                    Growth Analysis
                  </h4>
                  <p className="text-gray-600 break-words">{aiReport.growthAnalysis}</p>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-gray-900 mb-2">
                    Content Strategy
                  </h4>
                  <p className="text-gray-600 break-words">{aiReport.contentStrategy}</p>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-gray-900 mb-2">
                    Key Recommendations
                  </h4>
                  <ul className="space-y-2">
                    {aiReport.recommendations.map((rec, index) => (
                      <li
                        key={index}
                        className="flex items-start space-x-2 text-gray-600"
                      >
                        <span className="text-red-500 font-bold flex-shrink-0">•</span>
                        <span className="break-words">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="pt-4 border-t border-gray-200">
                  <button
                    onClick={handleDownloadPDF}
                    className="flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Full Report
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </>
  );
};