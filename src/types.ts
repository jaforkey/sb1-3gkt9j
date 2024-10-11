export interface SocialMediaAccount {
  id: string;
  name: string;
  followers: number;
  likes: number;
  comments: number;
  views: number;
}

export interface AdPlatformData {
  spend: number;
  impressions: number;
  clicks: number;
  ctr: number;
}