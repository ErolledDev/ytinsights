import { GoogleGenerativeAI } from '@google/generative-ai';
import { ChannelData, ChannelMetrics, AIReport } from '../types';
import { jsPDF } from 'jspdf';

export const fetchChannelData = async (channelIdentifier: string, apiKey: string): Promise<ChannelData> => {
  try {
    const username = channelIdentifier.replace('@', '');
    
    // First get channel ID from username
    const searchResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${username}&type=channel&key=${apiKey}`
    );
    
    if (!searchResponse.ok) {
      throw new Error('Failed to fetch channel ID');
    }
    
    const searchData = await searchResponse.json();
    if (!searchData.items?.length) {
      throw new Error('Channel not found');
    }
    
    const channelId = searchData.items[0].id.channelId;

    // Then get detailed channel data
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics,topicDetails&id=${channelId}&key=${apiKey}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch channel data');
    }
    
    const data = await response.json();
    if (!data.items?.length) {
      throw new Error('Channel data not found');
    }
    
    return data.items[0];
  } catch (error) {
    console.error('Error fetching channel data:', error);
    throw error;
  }
};

export const calculateMetrics = (channelData: ChannelData): ChannelMetrics => {
  const views = parseInt(channelData.statistics.viewCount);
  const subscribers = parseInt(channelData.statistics.subscriberCount);
  const videos = parseInt(channelData.statistics.videoCount);

  const averageViews = Math.round(views / videos);
  const engagementRate = ((subscribers / views) * 100);
  
  // Estimated earnings calculations
  const estimatedEarningsPerThousand = 2.50; // Average CPM
  const yearlyViews = views * (365 / 365); // Simplified for demonstration

  return {
    engagementRate,
    estimatedEarningsPerThousand,
    estimatedYearlyEarnings: {
      min: Math.round((yearlyViews / 1000) * 1.50), // Conservative estimate
      max: Math.round((yearlyViews / 1000) * 3.50)  // Optimistic estimate
    },
    averageViews
  };
};

export const generateAIReport = async (
  channelData: ChannelData, 
  metrics: ChannelMetrics, 
  geminiKey: string
): Promise<AIReport> => {
  try {
    const genAI = new GoogleGenerativeAI(geminiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `Analyze this YouTube channel and provide insights in JSON format. Include these exact keys: summary, growthAnalysis, contentStrategy, recommendations (as array), category.

Channel Details:
- Name: ${channelData.snippet.title}
- Description: ${channelData.snippet.description}
- Subscribers: ${parseInt(channelData.statistics.subscriberCount).toLocaleString()}
- Total Views: ${parseInt(channelData.statistics.viewCount).toLocaleString()}
- Videos: ${channelData.statistics.videoCount}
- Engagement Rate: ${metrics.engagementRate.toFixed(2)}%
- Average Views: ${metrics.averageViews.toLocaleString()}
- Est. Yearly Earnings: $${metrics.estimatedYearlyEarnings.min.toLocaleString()} - $${metrics.estimatedYearlyEarnings.max.toLocaleString()}

Provide:
1. summary: A detailed analysis of current performance (2-3 sentences)
2. growthAnalysis: Growth trends and potential (2-3 sentences)
3. contentStrategy: Strategic insights and opportunities (2-3 sentences)
4. recommendations: Array of 3-5 specific, actionable recommendations
5. category: Best-fitting YouTube category based on content/description

Response must be valid JSON. Example format:
{
  "summary": "Channel analysis here...",
  "growthAnalysis": "Growth analysis here...",
  "contentStrategy": "Strategy insights here...",
  "recommendations": ["Recommendation 1", "Recommendation 2", "Recommendation 3"],
  "category": "Category name here"
}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Find the JSON object in the response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Invalid AI response format');
    }

    const parsedResponse = JSON.parse(jsonMatch[0]);

    // Validate the response structure
    if (!parsedResponse.summary || !parsedResponse.growthAnalysis || 
        !parsedResponse.contentStrategy || !Array.isArray(parsedResponse.recommendations) || 
        !parsedResponse.category) {
      throw new Error('Invalid AI response structure');
    }

    return parsedResponse as AIReport;
  } catch (error) {
    console.error('Error generating AI report:', error);
    throw new Error('Failed to generate AI report. Please try again.');
  }
};

export const generatePDF = (channelData: ChannelData, metrics: ChannelMetrics, aiReport: AIReport): void => {
  const doc = new jsPDF();
  const fileName = `youtube-${channelData.snippet.title.replace(/\s+/g, '-')}-${aiReport.category.replace(/\s+/g, '-')}.pdf`;

  // Add title
  doc.setFontSize(20);
  doc.text(channelData.snippet.title, 20, 20);
  
  // Add category
  doc.setFontSize(14);
  doc.text(`Category: ${aiReport.category}`, 20, 30);

  // Add metrics
  doc.setFontSize(12);
  doc.text([
    `Subscribers: ${parseInt(channelData.statistics.subscriberCount).toLocaleString()}`,
    `Total Views: ${parseInt(channelData.statistics.viewCount).toLocaleString()}`,
    `Videos: ${channelData.statistics.videoCount}`,
    `Engagement Rate: ${metrics.engagementRate.toFixed(2)}%`,
    `Average Views: ${metrics.averageViews.toLocaleString()}`,
    `Estimated Yearly Earnings: $${metrics.estimatedYearlyEarnings.min.toLocaleString()} - $${metrics.estimatedYearlyEarnings.max.toLocaleString()}`
  ], 20, 45);

  // Add AI analysis
  doc.addPage();
  doc.setFontSize(16);
  doc.text('AI Analysis Report', 20, 20);

  doc.setFontSize(14);
  let y = 35;

  // Summary
  doc.text('Channel Summary', 20, y);
  doc.setFontSize(12);
  y += 10;
  const summaryLines = doc.splitTextToSize(aiReport.summary, 170);
  doc.text(summaryLines, 20, y);
  y += summaryLines.length * 7;

  // Growth Analysis
  doc.setFontSize(14);
  y += 10;
  doc.text('Growth Analysis', 20, y);
  doc.setFontSize(12);
  y += 10;
  const growthLines = doc.splitTextToSize(aiReport.growthAnalysis, 170);
  doc.text(growthLines, 20, y);
  y += growthLines.length * 7;

  // Content Strategy
  doc.setFontSize(14);
  y += 10;
  doc.text('Content Strategy', 20, y);
  doc.setFontSize(12);
  y += 10;
  const strategyLines = doc.splitTextToSize(aiReport.contentStrategy, 170);
  doc.text(strategyLines, 20, y);
  y += strategyLines.length * 7;

  // Recommendations
  doc.setFontSize(14);
  y += 10;
  doc.text('Key Recommendations', 20, y);
  doc.setFontSize(12);
  y += 10;
  aiReport.recommendations.forEach((rec, index) => {
    const recLines = doc.splitTextToSize(`${index + 1}. ${rec}`, 170);
    doc.text(recLines, 20, y);
    y += recLines.length * 7;
  });

  doc.save(fileName);
};