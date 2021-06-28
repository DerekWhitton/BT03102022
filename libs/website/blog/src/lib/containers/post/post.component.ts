import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { loadBlog, setSelectedBlog } from '../../+state/blog.actions';
import { BlogEffects } from '../../+state/blog.effects';
import { BlogFacade } from '../../+state/blog.facade';

@Component({
  selector: 'bushtrade.web-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  post$ = this.blogFacade.selectedBlog$;
  selectedId$ = this.blogFacade.selectedId$;
  loaded$ = this.blogFacade.loaded$;

  constructor(private route: ActivatedRoute, private blogFacade: BlogFacade) {}

  ngOnInit(): void {
    const params = this.route.snapshot.params;

    this.blogFacade.dispatch(setSelectedBlog({ id: params.id }));
    this.blogFacade.dispatch(loadBlog());
  }
}
