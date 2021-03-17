import { MessageService } from 'primeng/api';
import {
  Component,
  Input,
  OnInit,
  EventEmitter,
  Output,
  ViewChild,
  ElementRef,
} from '@angular/core';
import {
  ListingsService,
  PurchasesService,
  SiteSettingsService,
} from '@bushtrade/website/shared/services';
import {
  IListingPremiumPackage,
  IPaymentDetails,
  IPremiumPackageSetting,
} from '@bushtrade/website/shared/entites';

@Component({
  selector: 'website-premium-package-modal',
  templateUrl: './premium-package-modal.component.html',
  styleUrls: ['./premium-package-modal.component.scss'],
})
export class PremiumPackageModalComponent implements OnInit {
  @Input() listingId: string;
  @Input() sellerId: string;
  @Input() visible: boolean;
  @Output() closeEvent = new EventEmitter();

  currentDate = Date.now();
  selectedPackageId: string;
  confirmedPackageId: string;
  premiumPackages: IPremiumPackageSetting[] = [];
  loading: boolean;
  placingPackage: boolean;
  listingPremiumPackages: IListingPremiumPackage[] = [];
  paymentDetails: IPaymentDetails;

  constructor(
    private messageService: MessageService,
    private siteSettingsService: SiteSettingsService,
    private listingService: ListingsService,
    private purchasesService: PurchasesService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.siteSettingsService.getPremiumPackagesSettings().subscribe(
      (premiumPackages) => {
        this.premiumPackages = premiumPackages;
        this.loading = false;
        this.listingService
          .getPremiumPackageHistory(this.sellerId, this.listingId)
          .subscribe(
            (premiumPackages) => {
              this.listingPremiumPackages = premiumPackages;
            },
            () => {
              this.loading = false;
              this.messageService.add({
                severity: 'error',
                data: 'Error retrieving the Premium Packages.',
              });
            }
          );
      },
      () => {
        this.loading = false;
        this.messageService.add({
          severity: 'error',
          data:
            'Error retrieving the Premium Packages. Try refreshing the page.',
        });
      }
    );
  }

  selectPackage(packageId: string) {
    this.selectedPackageId = packageId;
  }

  addPremiumPackage() {
    this.placingPackage = true;
    const listingPremiumPackage = {
      listingId: this.listingId,
      premiumPackageId: this.selectedPackageId,
    };
    this.listingService
      .addListingPremiumPackage(this.sellerId, listingPremiumPackage)
      .subscribe(
        (listingPackage) => {
          this.purchasesService
            .getPremiumPackagePaymentDetails(this.sellerId, listingPackage.id)
            .subscribe((paymentDetails) => {
              this.paymentDetails = paymentDetails;
              this.confirmedPackageId = this.selectedPackageId;
              this.selectedPackageId = null;
              this.placingPackage = false;
            });
        },
        (error) => {
          this.placingPackage = false;
          this.selectedPackageId = null;
          const errorMessage = error
            ? error.error
            : 'Error while placing the premium package purchase.';
          this.messageService.add({
            severity: 'error',
            detail: errorMessage,
          });
        }
      );
  }

  closeModal() {
    this.selectedPackageId = null;
    this.closeEvent.emit();
  }
}
