import React, { useState, useEffect } from 'react';
import { SocialMediaTable } from './SocialMediaTable';
import { PaidAdsSection } from './PaidAdsSection';
import { useDashboard } from '../contexts/DashboardContext';
import { DateRangePicker } from './DateRangePicker';

export const Dashboard: React.FC = () => {
  const { facebookAccounts, instagramAccounts, fetchData } = useDashboard();
  const [startDate, setStartDate] = useState<Date>(new Date(new Date().setDate(new Date().getDate() - 30)));
  const [endDate, setEndDate] = useState<Date>(new Date());

  useEffect(() => {
    fetchData(startDate, endDate);
  }, [startDate, endDate, fetchData]);

  return (
    <div className="space-y-8">
      <DateRangePicker
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
      />
      <SocialMediaTable
        platform="Facebook"
        accounts={facebookAccounts}
        startDate={startDate}
        endDate={endDate}
      />
      <SocialMediaTable
        platform="Instagram"
        accounts={instagramAccounts}
        startDate={startDate}
        endDate={endDate}
      />
      <PaidAdsSection id="paid-ads" startDate={startDate} endDate={endDate} />
    </div>
  );
};