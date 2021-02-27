import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ISearchFacet } from '@bushtrade/website/shared/entites';

@Component({
  selector: 'bushtrade-search-facet',
  templateUrl: './search-facet.component.html',
  styleUrls: ['./search-facet.component.scss'],
})
export class SearchFacetComponent implements OnInit {
  @Input() facet: ISearchFacet;
  @Input() selectedFacets: { key: string; value: string }[] = [];
  @Output() facetSelected: EventEmitter<{
    key: string;
    value: string;
  }> = new EventEmitter<{
    key: string;
    value: string;
  }>();

  showOptions: boolean = true;

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    if (this.selectedFacets) {
      const facetOptions = this.selectedFacets.filter(
        (f) => f.key === this.facet.key
      );

      this.facet.options = this.facet.options.map((f) => ({
        ...f,
        active: facetOptions.findIndex((fo) => fo.value == f.value) >= 0,
      }));
    }
  }

  handleFacetSelection(key: string, value: string) {
    this.facetSelected.emit({ key, value });
  }
}
