import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'bushtrade-listing-image-preview',
  templateUrl: './listing-image-preview.component.html',
  styleUrls: ['./listing-image-preview.component.scss'],
})
export class ListingImagePreviewComponent implements OnInit {
  @Input() src: string;
  @Output() removed = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  handleRemoveClicked() {
    this.removed.emit();
  }
}
