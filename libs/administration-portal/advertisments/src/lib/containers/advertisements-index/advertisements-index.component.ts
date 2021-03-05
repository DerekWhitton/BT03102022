import { AdvertismentsService } from '@bushtrade/administration-portal/shared/services';
import {
  ICreateDashboardAdvertisment,
  IUpdateDashboardAdvertisment,
} from './../../../../../shared/entities/src/lib/advertisments/i-create-dashboard-advertisment';
import {
  createDashboardAdvertisment,
  deleteDashboardAdvertisment,
  loadDashboardAdvertismentDetails,
  setSelectedDashboardAdvertisment,
  updateDashboardAdvertisment,
} from './../../+state/dashboard-advertisments.actions';
import { DashboardAdvertismentsFacade } from './../../+state/dashboard-advertisments.facade';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'bushtrade-administration-advertisements-index',
  templateUrl: './advertisements-index.component.html',
  styleUrls: ['./advertisements-index.component.scss'],
})
export class AdvertisementsIndexComponent implements OnInit {
  @ViewChild('advertismentBannerUpload') advertismentBannerUpload: any;

  columns = [
    { field: 'title', header: 'Title' },
    { field: 'link', header: 'Link' },
    { field: 'label', header: 'Label' },
    {
      field: 'isActive',
      header: 'Active',
      converter: (val) => val ? 'Yes' : 'No'
    },
    {
      field: 'imageUri',
      header: 'Sponsored Banner',
      converter: (val) => `<img src="${val}" alt="No banner" class="banner-in-table"/>`,
    },
  ];
  dashboardAdvertisments$ = this.dashboardAdvertismentsFacade
    .allDashboardAdvertisments$;
  loaded$ = this.dashboardAdvertismentsFacade.loaded$;
  createFormGroup: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    label: new FormControl('', Validators.required),
    link: new FormControl('', Validators.required),
    isActive: new FormControl(false, Validators.required),
    imageUri: new FormControl(''),
  });
  updateFormGroup: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    label: new FormControl('', Validators.required),
    link: new FormControl('', Validators.required),
    isActive: new FormControl(false, Validators.required),
    imageUri: new FormControl(''),
  });
  isUploading: boolean;
  bannerUri: string;

  constructor(
    public dashboardAdvertismentsFacade: DashboardAdvertismentsFacade,
    public advertismentService: AdvertismentsService
  ) {}

  ngOnInit(): void {}

  onCreateSubmit() {
    const dashboardAdvertisment = this.createFormGroup
      .value as ICreateDashboardAdvertisment;
    dashboardAdvertisment.imageUri = this.bannerUri;
    this.dashboardAdvertismentsFacade.dispatch(
      createDashboardAdvertisment({
        dashboardAdvertisment: dashboardAdvertisment,
      })
    );
  }

  handleUpdateSelection(data) {
    this.dashboardAdvertismentsFacade.dispatch(
      setSelectedDashboardAdvertisment({ dashboardAdvertismentId: data.id })
    );
    this.dashboardAdvertismentsFacade.dispatch(
      loadDashboardAdvertismentDetails({ dashboardAdvertismentId: data.id })
    );
    let ctx = this;
    this.dashboardAdvertismentsFacade.selectedDashboardAdvertisments$.subscribe(
      {
        next(dashboardAdvertisment) {
          ctx.bannerUri = dashboardAdvertisment.imageUri;
          ctx.updateFormGroup.patchValue({ ...dashboardAdvertisment });
        },
      }
    );
  }

  onUpdateSubmit() {
    const dashboardAdvertisment = this.updateFormGroup
      .value as IUpdateDashboardAdvertisment;
    dashboardAdvertisment.imageUri = this.bannerUri;
    this.dashboardAdvertismentsFacade.dispatch(
      updateDashboardAdvertisment({
        dashboardAdvertisment: dashboardAdvertisment,
      })
    );
  }

  onItemDeleted(data) {
    this.dashboardAdvertismentsFacade.dispatch(
      deleteDashboardAdvertisment({ dashboardAdvertismentId: data.id })
    );
  }

  async uploadAdvertismentBanner(event) {
    const file = event.files[0];

    this.isUploading = true;
    this.advertismentBannerUpload.clear();

    await this.advertismentService
      .uploadAdvertismentImage(file)
      .subscribe((res) => {
        this.bannerUri = res.imageUri;
      });

    this.isUploading = false;
  }

  removeAdvertismentBanner() {
    this.bannerUri = null;
  }
}
