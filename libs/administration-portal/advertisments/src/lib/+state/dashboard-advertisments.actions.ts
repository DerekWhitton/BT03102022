import { createAction, props } from '@ngrx/store';
import { ICreateDashboardAdvertisment, IDashboardAdvertisment, IPaginatedResponse, IUpdateDashboardAdvertisment } from '@bushtrade/administration-portal/shared/entites';

export const loadDashboardAdvertisments = createAction(
  '[DashboardAdvertisments] Load DashboardAdvertisments'
);

export const loadDashboardAdvertismentsSuccess = createAction(
  '[DashboardAdvertisments] Load DashboardAdvertisments Success',
  props<{ payload: IPaginatedResponse<IDashboardAdvertisment> }>()
);

export const loadDashboardAdvertismentsFailure = createAction(
  '[DashboardAdvertisments] Load DashboardAdvertisments Failure',
  props<{ error: any }>()
);

export const createDashboardAdvertisment = createAction(
  '[DashboardAdvertisments] Create DashboardAdvertisment',
  props<{ dashboardAdvertisment: ICreateDashboardAdvertisment }>()
);

export const createDashboardAdvertismentSuccess = createAction(
  '[DashboardAdvertisments] Create DashboardAdvertisments Success',
  props<{ dashboardAdvertisment: IDashboardAdvertisment }>()
);

export const createDashboardAdvertismentFailure = createAction(
  '[DashboardAdvertisments] Create DashboardAdvertisments Failure',
  props<{ error: any }>()
);

export const setSelectedDashboardAdvertisment = createAction(
  '[DashboardAdvertisments] Set Selected DashboardAdvertisment',
  props<{ dashboardAdvertismentId: string }>()
);

export const loadDashboardAdvertismentDetails = createAction(
  '[DashboardAdvertisments] Load DashboardAdvertisment Details',
  props<{ dashboardAdvertismentId: string }>()
);

export const loadDashboardAdvertismentDetailsSuccess = createAction(
  '[DashboardAdvertisments] Load DashboardAdvertisment Details Success',
  props<{ dashboardAdvertisment: IDashboardAdvertisment }>()
);

export const loadDashboardAdvertismentDetailsFailure = createAction(
  '[DashboardAdvertisments] Load DashboardAdvertisment Details Failure',
  props<{ error: any }>()
);

export const updateDashboardAdvertisment = createAction(
  '[DashboardAdvertisments] Update DashboardAdvertisment',
  props<{ dashboardAdvertisment: IUpdateDashboardAdvertisment }>()
);

export const updateDashboardAdvertismentSuccess = createAction(
  '[DashboardAdvertisments] Update DashboardAdvertisment Success',
  props<{ dashboardAdvertisment: IDashboardAdvertisment }>()
);

export const updateDashboardAdvertismentFailure = createAction(
  '[DashboardAdvertisments] Update DashboardAdvertisment Failure',
  props<{ error: any }>()
);

export const deleteDashboardAdvertisment = createAction(
  '[DashboardAdvertisments] Delete DashboardAdvertisment',
  props<{ dashboardAdvertismentId: string }>()
);

export const deleteDashboardAdvertismentSuccess = createAction(
  '[DashboardAdvertisments] Delete DashboardAdvertisment Success',
  props<{ dashboardAdvertismentId: string }>()
);

export const deleteDashboardAdvertismentFailure = createAction(
  '[DashboardAdvertisments] Delete DashboardAdvertisment Failure',
  props<{ error: any }>()
);
