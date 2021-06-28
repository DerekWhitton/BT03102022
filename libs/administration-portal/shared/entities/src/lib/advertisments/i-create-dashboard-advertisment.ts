export interface ICreateDashboardAdvertisment {
  title: string;
  label: string;
  lilnk: string;
  imageUri: string;
  isActive: boolean;
}

export interface IUpdateDashboardAdvertisment extends ICreateDashboardAdvertisment {
  id: string;
}