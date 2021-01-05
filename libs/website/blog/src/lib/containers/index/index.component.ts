import { Component, OnInit } from '@angular/core';
import { BlogFacade } from '../../+state/blog.facade';

@Component({
  selector: 'bushtrade.web-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
  blogs$ = this.blogFacade.allBlogs$;
  loaded$ = this.blogFacade.loaded$;

  constructor(private blogFacade: BlogFacade) {}

  ngOnInit(): void {}
}
