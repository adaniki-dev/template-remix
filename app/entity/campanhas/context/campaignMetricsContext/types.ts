// types/analyticsData.ts

export interface DailyMetrics {
  [date: string]: number;
}

export interface MetricAnalysis {
  dailyNetChange: DailyMetrics;
  growthRate: DailyMetrics;
}

export interface HistoricalAnalysis {
  group_entry_count: MetricAnalysis;
  group_exit_count: MetricAnalysis;
  invite_link_click_count: MetricAnalysis;
}

export interface GroupCapacity {
  closed: number;
  critical: number;
  almostFull: number;
  available: number;
  withoutLimit: number;
}

export interface GroupMembers {
  total: number;
  maxInGroup: number;
  minInGroup: number;
  average: number;
}

export interface GroupLimits {
  totalCapacity: number;
  remainingSpots: number;
}

export interface GroupUtilization {
  averageUtilization: number;
  groupsWithLimit: number;
}

export interface GroupStats {
  capacity: GroupCapacity;
  members: GroupMembers;
  limits: GroupLimits;
  utilization: GroupUtilization;
  totalGroups: number;
}

export interface Conversion {
  entryRate: number;
  exitRate: number;
  retentionRate: number;
}

export interface AnalyticsData {
  inviteLinkClickCount: number;
  groupEntryCount: number;
  groupExitCount: number;
  sendedMessageTextCount: number;
  sendedMessageMediaCount: number;
  conversion: Conversion;
  groupStats: GroupStats;
  historicalAnalysis: HistoricalAnalysis;
}

export interface ApiResponse {
  status: number;
  body: AnalyticsData;
}
