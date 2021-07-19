import { ICreateOrUpdateAuctionDurationSetting } from './../../../../shared/entities/src/lib/site-settings/i-create-update-auction-duration-setting';
import {
  createPremiumPackageSetting,
  deletePremiumPackageSetting,
  loadPremiumPackagesSettings,
  setSelectedPremiumPackageSetting,
  updatePremiumPackageSetting,
} from './../+state/premium-package/premium-packages-settings.actions';
import {
  createAuctionDurationSetting,
  deleteAuctionDurationSetting,
  loadAuctionDurationSettings,
  setSelectedAuctionDurationSetting,
  updateAuctionDurationSetting,
} from './../+state/auction-duration/auction-duration-settings.actions';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import {
  AuctionDurationSettingsFacade,
  PremiumPackagesSettingsFacade,
} from '../..';
import { DatePipe } from '@angular/common';
import {
  ICreateOrUpdatePremiumPackageSetting,
  PackageType,
} from '@bushtrade/administration-portal/shared/entites';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'bushtrade-administration-site-settings',
  templateUrl: './site-settings-index.component.html',
  styleUrls: ['./site-settings-index.component.scss'],
})
export class SiteSettingsIndexComponent implements OnInit {
  packageTypes = PackageType;
  selectablePackageTypes: { label: string; value: PackageType }[];
  priorityRequired: boolean;
  selectedPremiumPackageId;

  auctionDurationSettings$ = this.auctionDurationSettingsFacade
    .allAuctionDurationSettings$;
  auctionDurationSettingsLoaded$ = this.auctionDurationSettingsFacade.loaded$;
  lastAuctionDurationError$ = this.auctionDurationSettingsFacade
    .lastKnownError$;
  premiumPackagesSettings$ = this.premiumPackagesSettingsFacade
    .allPremiumPackagesSettings$;
  premiumPackagesSettingsLoaded$ = this.premiumPackagesSettingsFacade.loaded$;
  lastPremiumPackageError$ = this.premiumPackagesSettingsFacade.lastKnownError$;

  auctionDurationSettingsColumns = [
    { field: 'numberOfDays', header: 'Number of days' },
    {
      field: 'isActive',
      header: 'Active',
      converter: (val: any) => (val ? 'Yes' : 'No'),
    },
    {
      field: 'createdAt',
      header: 'Created At',
      converter: (val: any) =>
        this.datePipe.transform(val, 'dd MMM yyyy HH:mm'),
    },
  ];

  premiumPackagesSettingsColumns = [
    {
      field: 'packageType',
      header: 'Package Type',
      converter: (val: any) => PackageType[val],
    },
    { field: 'numberOfDays', header: 'Number of days' },
    {
      field: 'isActive',
      header: 'Active',
      converter: (val: any) => (val ? 'Yes' : 'No'),
    },
    {
      field: 'price',
      header: 'Price',
      converter: (val: any) => `R ${val}`,
    },
    { 
      field: 'priority',
      header: 'Priority',
      converter: (val: any) => isNaN(val) ? null : val,
    },
    {
      field: 'createdAt',
      header: 'Created At',
      converter: (val: any) =>
        this.datePipe.transform(val, 'dd MMM yyyy HH:mm'),
    },
  ];

  createOrUpdateAuctionDurationFormGroup: FormGroup = new FormGroup({
    numberOfDays: new FormControl('', Validators.required),
    isActive: new FormControl(false),
  });

  createOrUpdatePremiumPackageFormGroup: FormGroup = new FormGroup({
    numberOfDays: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    priority: new FormControl('', [Validators.required, Validators.min(1)]),
    packageType: new FormControl('', Validators.required),
    isActive: new FormControl(false),
  });

  constructor(
    private messageService: MessageService,
    private auctionDurationSettingsFacade: AuctionDurationSettingsFacade,
    private premiumPackagesSettingsFacade: PremiumPackagesSettingsFacade,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.auctionDurationSettingsFacade.dispatch(loadAuctionDurationSettings());
    this.lastAuctionDurationError$.subscribe((error) => {
      if (error) {
        this.messageService.add({
          severity: 'error',
          detail: error?.error,
        });
      }
    });
    this.lastPremiumPackageError$.subscribe((error) => {
      if (error) {
        this.messageService.add({
          severity: 'error',
          detail: error?.error,
        });
      }
    });
    this.selectablePackageTypes = Object.keys(PackageType)
      .filter((s) => isNaN(Number(s)))
      .map((s) => {
        return { label: s, value: PackageType[s] };
      });
  }

  handleChange(event) {
    if (event.index == 0) {
      this.auctionDurationSettingsFacade.dispatch(
        loadAuctionDurationSettings()
      );
    } else {
      this.premiumPackagesSettingsFacade.dispatch(
        loadPremiumPackagesSettings()
      );
    }
  }

  onAuctionDurationCreateSubmit() {
    var auctionDurationSetting = this.createOrUpdateAuctionDurationFormGroup
      .value as ICreateOrUpdateAuctionDurationSetting;
    this.auctionDurationSettingsFacade.dispatch(
      createAuctionDurationSetting({
        auctionDurationSetting: auctionDurationSetting,
      })
    );
    this.createOrUpdateAuctionDurationFormGroup.reset();
  }

  handleAuctionDurationUpdateSelection(event) {
    if (event) {
      this.selectedPremiumPackageId = event.id;
    }
    this.auctionDurationSettingsFacade.dispatch(
      setSelectedAuctionDurationSetting({ settingId: this.selectedPremiumPackageId })
    );
    var ctx = this;
    this.auctionDurationSettingsFacade.selectedAuctionDurationSettings$.subscribe(
      {
        next(auctionDurationSetting) {
          ctx.createOrUpdateAuctionDurationFormGroup.patchValue({
            ...auctionDurationSetting,
          });
        },
      }
    );
  }

  onUpdateAuctionDurationSubmit() {
    var auctionDurationSetting = this.createOrUpdateAuctionDurationFormGroup
      .value as ICreateOrUpdateAuctionDurationSetting;
    this.auctionDurationSettingsFacade.dispatch(
      updateAuctionDurationSetting({
        auctionDurationSetting: auctionDurationSetting,
      })
    );
    this.createOrUpdateAuctionDurationFormGroup.reset();
  }

  onAuctionDurationDeleted(event) {
    this.auctionDurationSettingsFacade.dispatch(
      deleteAuctionDurationSetting({ settingId: event.id })
    );
  }

  onPremiumPackageCreateSubmit() {
    var premiumPackageSetting = this.createOrUpdatePremiumPackageFormGroup
      .value as ICreateOrUpdatePremiumPackageSetting;
    this.premiumPackagesSettingsFacade.dispatch(
      createPremiumPackageSetting({
        premiumPackageSetting: premiumPackageSetting,
      })
    );
    this.createOrUpdatePremiumPackageFormGroup.reset();
  }

  handlePremiumPackageUpdateSelection(event) {
    this.premiumPackagesSettingsFacade.dispatch(
      setSelectedPremiumPackageSetting({ settingId: event.id })
    );
    var ctx = this;
    this.premiumPackagesSettingsFacade.selectedPremiumPackagesSettings$.subscribe(
      {
        next(premiumPackageSetting) {
          ctx.createOrUpdatePremiumPackageFormGroup.patchValue({
            ...premiumPackageSetting,
          });
          ctx.packageTypeSelected();
        },
      }
    );
  }

  onUpdatePremiumPackageSubmit() {
    if (!this.createOrUpdatePremiumPackageFormGroup.valid) {
      this.messageService.add({
        severity: 'error',
        detail: 'Invalid form. Please check the values again',
      });
      return;
    }
    var premiumPackageSetting = this.createOrUpdatePremiumPackageFormGroup
      .value as ICreateOrUpdatePremiumPackageSetting;
    this.premiumPackagesSettingsFacade.dispatch(
      updatePremiumPackageSetting({
        premiumPackageSetting: premiumPackageSetting,
      })
    );
    this.createOrUpdatePremiumPackageFormGroup.reset();
  }

  packageTypeSelected() {
    this.priorityRequired =
      this.createOrUpdatePremiumPackageFormGroup.controls.packageType.value ==
        PackageType['Top Ad'] ||
      this.createOrUpdatePremiumPackageFormGroup.controls.packageType.value ==
        PackageType['Homepage Ad'];
    if (!this.priorityRequired) {
      this.createOrUpdatePremiumPackageFormGroup.controls.priority.disable();
    } else {
      this.createOrUpdatePremiumPackageFormGroup.controls.priority.enable();
    }
  }

  onPremiumPackageDeleted(event) {
    this.premiumPackagesSettingsFacade.dispatch(
      deletePremiumPackageSetting({ settingId: event.id })
    );
  }

  resetForms() {
    this.createOrUpdatePremiumPackageFormGroup.reset();
    this.createOrUpdateAuctionDurationFormGroup.reset();
  }
}
