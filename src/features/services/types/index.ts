import { ServiceItem } from '@/types';

export interface ServicesOverviewProps {
  services?: ServiceItem[];
}

export interface ServiceDetailProps {
  service: ServiceItem;
}
