export interface ChannelData {
  id: string;
  snippet: {
    title: string;
    description: string;
    thumbnails: {
      default: { url: string };
      medium: { url: string };
      high: { url: string };
    };
    customUrl: string;
  };
  statistics: {
    viewCount: string;
    subscriberCount: string;
    videoCount: string;
  };
  topicDetails?: {
    topicCategories: string[];
  };
}

export interface ChannelMetrics {
  engagementRate: number;
  estimatedEarningsPerThousand: number;
  estimatedYearlyEarnings: {
    min: number;
    max: number;
  };
  averageViews: number;
}

export interface AIReport {
  summary: string;
  growthAnalysis: string;
  contentStrategy: string;
  recommendations: string[];
  category: string;
}