import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { GhostService } from '../ghost.service';
import { Title } from '@angular/platform-browser';
import { AppShellComponent } from '../app-shell/app-shell.component';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  postSlug: string;
  post;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ghostService: GhostService,
    private titleService: Title,
    private appShellComponent: AppShellComponent
  ) {
    this.postSlug = '';
  }

  ngOnInit(): void {
    this.postSlug = this.route.snapshot.paramMap.get('slug');

    this.ghostService.ghostConnection.posts
      .read({ slug: this.postSlug, include: 'authors, tags' })
      .then((post) => {
        this.post = post;
        this.titleService.setTitle(
          this.appShellComponent.buildTitle(post.title)
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }
}
