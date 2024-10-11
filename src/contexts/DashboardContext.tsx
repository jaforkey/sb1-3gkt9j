import React, { createContext, useContext, useState, ReactNode } from 'react';
import { SocialMediaAccount, AdPlatformData } from '../types';

interface DashboardContextType {
  facebookAccounts: SocialMediaAccount[];
  instagramAccounts: SocialMediaAccount[];
  googleAds: AdPlatformData;
  metaAds: AdPlatformData;
  updateConfiguration: (config: {
    facebookAccessToken: string;
    instagramAccessToken: string;
    googleAdsClientId: string;
    googleAdsClientSecret: string;
    metaAdsAccessToken: string;
  }) => void;
  fetchData: (startDate: Date, endDate: Date) => Promise<void>;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const DashboardProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [facebookAccounts, setFacebookAccounts] = useState<SocialMediaAccount[]>([]);
  const [instagramAccounts, setInstagramAccounts] = useState<SocialMediaAccount[]>([]);
  const [googleAds, setGoogleAds] = useState<AdPlatformData>({
    spend: 0,
    impressions: 0,
    clicks: 0,
    ctr: 0,
  });
  const [metaAds, setMetaAds] = useState<AdPlatformData>({
    spend: 0,
    impressions: 0,
    clicks: 0,
    ctr: 0,
  });

  const updateConfiguration = (config: {
    facebookAccessToken: string;
    instagramAccessToken: string;
    googleAdsClientId: string;
    googleAdsClientSecret: string;
    metaAdsAccessToken: string;
  }) => {
    console.log('Updating configuration:', config);
    // In a real application, you would store these tokens securely
    // and use them to authenticate API requests
  };

  const fetchData = async (startDate: Date, endDate: Date) => {
    console.log(`Fetching data for date range: ${startDate.toISOString()} - ${endDate.toISOString()}`);
    
    // Facebook API query
    const facebookData = await fetchFacebookData(startDate, endDate);
    setFacebookAccounts(facebookData);

    // Instagram API query
    const instagramData = await fetchInstagramData(startDate, endDate);
    setInstagramAccounts(instagramData);

    // Google Ads API query
    const googleAdsData = await fetchGoogleAdsData(startDate, endDate);
    setGoogleAds(googleAdsData);

    // Meta Ads API query
    const metaAdsData = await fetchMetaAdsData(startDate, endDate);
    setMetaAds(metaAdsData);
  };

  return (
    <DashboardContext.Provider
      value={{
        facebookAccounts,
        instagramAccounts,
        googleAds,
        metaAds,
        updateConfiguration,
        fetchData,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};

// API query functions
async function fetchFacebookData(startDate: Date, endDate: Date): Promise<SocialMediaAccount[]> {
  // Replace 'YOUR_ACCESS_TOKEN' with the actual access token
  const accessToken = 'YOUR_ACCESS_TOKEN';
  const apiVersion = 'v12.0';
  const baseUrl = `https://graph.facebook.com/${apiVersion}`;

  const accounts = await fetch(`${baseUrl}/me/accounts?access_token=${accessToken}`)
    .then(res => res.json())
    .then(data => data.data);

  const accountsData = await Promise.all(accounts.map(async (account: any) => {
    const metrics = await fetch(`${baseUrl}/${account.id}/insights?metric=page_fans,page_post_engagements,page_views_total&period=day&since=${startDate.toISOString()}&until=${endDate.toISOString()}&access_token=${accessToken}`)
      .then(res => res.json())
      .then(data => data.data);

    return {
      id: account.id,
      name: account.name,
      followers: metrics.find((m: any) => m.name === 'page_fans').values.reduce((sum: number, val: any) => sum + val.value, 0),
      likes: metrics.find((m: any) => m.name === 'page_post_engagements').values.reduce((sum: number, val: any) => sum + val.value, 0),
      comments: 0, // Facebook Insights API doesn't provide comment count directly
      views: metrics.find((m: any) => m.name === 'page_views_total').values.reduce((sum: number, val: any) => sum + val.value, 0),
    };
  }));

  return accountsData;
}

async function fetchInstagramData(startDate: Date, endDate: Date): Promise<SocialMediaAccount[]> {
  // Replace 'YOUR_ACCESS_TOKEN' with the actual access token
  const accessToken = 'YOUR_ACCESS_TOKEN';
  const apiVersion = 'v12.0';
  const baseUrl = `https://graph.facebook.com/${apiVersion}`;

  const accounts = await fetch(`${baseUrl}/me/accounts?access_token=${accessToken}`)
    .then(res => res.json())
    .then(data => data.data);

  const accountsData = await Promise.all(accounts.map(async (account: any) => {
    const instagramBusinessAccount = await fetch(`${baseUrl}/${account.id}?fields=instagram_business_account&access_token=${accessToken}`)
      .then(res => res.json())
      .then(data => data.instagram_business_account);

    if (!instagramBusinessAccount) return null;

    const metrics = await fetch(`${baseUrl}/${instagramBusinessAccount.id}/insights?metric=follower_count,likes,comments,impressions&period=day&since=${startDate.toISOString()}&until=${endDate.toISOString()}&access_token=${accessToken}`)
      .then(res => res.json())
      .then(data => data.data);

    return {
      id: instagramBusinessAccount.id,
      name: account.name,
      followers: metrics.find((m: any) => m.name === 'follower_count').values[0].value,
      likes: metrics.find((m: any) => m.name === 'likes').values.reduce((sum: number, val: any) => sum + val.value, 0),
      comments: metrics.find((m: any) => m.name === 'comments').values.reduce((sum: number, val: any) => sum + val.value, 0),
      views: metrics.find((m: any) => m.name === 'impressions').values.reduce((sum: number, val: any) => sum + val.value, 0),
    };
  }));

  return accountsData.filter((account): account is SocialMediaAccount => account !== null);
}

async function fetchGoogleAdsData(startDate: Date, endDate: Date): Promise<AdPlatformData> {
  // Replace with actual Google Ads API client
  const { GoogleAdsApi } = require('google-ads-api');

  const client = new GoogleAdsApi({
    client_id: 'YOUR_CLIENT_ID',
    client_secret: 'YOUR_CLIENT_SECRET',
    developer_token: 'YOUR_DEVELOPER_TOKEN',
  });

  const customer = client.Customer({
    customer_id: 'YOUR_CUSTOMER_ID',
    refresh_token: 'YOUR_REFRESH_TOKEN',
  });

  const report = await customer.report({
    entity: 'customer',
    attributes: ['metrics.cost_micros', 'metrics.impressions', 'metrics.clicks', 'metrics.ctr'],
    constraints: {
      'date_range': {
        'start_date': startDate.toISOString().split('T')[0],
        'end_date': endDate.toISOString().split('T')[0],
      },
    },
  });

  const data = report[0];
  return {
    spend: data.metrics.cost_micros / 1000000, // Convert micros to actual currency
    impressions: data.metrics.impressions,
    clicks: data.metrics.clicks,
    ctr: data.metrics.ctr,
  };
}

async function fetchMetaAdsData(startDate: Date, endDate: Date): Promise<AdPlatformData> {
  // Replace 'YOUR_ACCESS_TOKEN' with the actual access token
  const accessToken = 'YOUR_ACCESS_TOKEN';
  const apiVersion = 'v12.0';
  const baseUrl = `https://graph.facebook.com/${apiVersion}`;

  const adAccountId = 'YOUR_AD_ACCOUNT_ID';

  const insights = await fetch(`${baseUrl}/act_${adAccountId}/insights?fields=spend,impressions,clicks,ctr&time_range={'since':'${startDate.toISOString().split('T')[0]}','until':'${endDate.toISOString().split('T')[0]}'}&access_token=${accessToken}`)
    .then(res => res.json())
    .then(data => data.data[0]);

  return {
    spend: parseFloat(insights.spend),
    impressions: parseInt(insights.impressions),
    clicks: parseInt(insights.clicks),
    ctr: parseFloat(insights.ctr),
  };
}