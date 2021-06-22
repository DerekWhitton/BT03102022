import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'bushtrade-web-selling-index',
  templateUrl: './selling-index.component.html',
  styleUrls: ['./selling-index.component.scss'],
})
export class SellingIndexComponent implements OnInit {
  conditions = [
    {
      label: 'New',
      description:
        "A brand-new item. Item in original packaging with the original manufacturer's warranty (if applicable). Warranty details are to be included in the listing comments.",
    },
    {
      label: 'Restored',
      description:
        'A product that has been inspected and tested to work and look like new. The product has minimal to no signs of wear, no visible cosmetic imperfections when held 12 inches away, and may arrive in a brown or white box with relevant accessories that may be generic with exceptions, if any, mentioned on the product detail page.',
    },
    {
      label: 'Opened, Repackaged',
      description:
        "A brand-new item (unused) in the original or repackaged packaging. The original manufacturer's warranty, if any, still applies, with the warranty details to be included in the listing comments.",
    },
    {
      label: 'Like New',
      description:
        'The item is in perfect working condition. The protective wrapping may be missing, but the original packaging is intact and in good condition with minor damage possible. Instructions are included.',
    },
    {
      label: 'Very Good',
      description:
        'An item that has been well cared for, has seen limited use and remains in good working condition. The item may show some limited signs of wear with small scratches or cosmetic blemishes. Item may have damaged packing or be repackaged and could be missing some accessories. Any missing accessories are clearly defined for each item.',
    },
    {
      label: 'Good',
      description:
        'The item shows wear from consistent use, but it remains in good condition and functions properly. Item may arrive with damaged packaging or be repackaged. It may be marked, have identifying markings on it, or have minor cosmetic damage. It may also be missing some parts/accessories which should be listed.',
    },
    {
      label: 'Acceptable',
      description:
        'The item is fairly worn but continues to function properly. The item may arrive with damaged packaging or be repackaged. Signs of wear can include aesthetic issues such as scratches, dents, and worn corners. The item may have identifying markings on it or show other signs of previous use. Item may be missing some parts/accessories which should be listed.',
    },
    {
      label: 'Other',
      description:
        'A detailed description of the items condition, functionality etc. to be included in the description.',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
