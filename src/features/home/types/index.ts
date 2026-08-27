export interface MetricItem {
  value: string;
  label: string;
  growth: string;
  iconName: string;
}

export interface TelemetryData {
  posRevenue: string;
  posGrowth: string;
  hrisTeams: string;
  hrisSync: string;
  cloudUptime: string;
  cloudLatency: string;
  labsRequests: string;
  labsLatency: string;
}

export interface DemoTabSimulatorProps {
  onSimulate: (message: string) => void;
  isSimulating: boolean;
}
