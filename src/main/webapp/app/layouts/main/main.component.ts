import { Component, inject, OnInit, RendererFactory2, Renderer2 } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import dayjs from 'dayjs/esm';

import { AccountService } from 'app/core/auth/account.service';
import { AppPageTitleStrategy } from 'app/app-page-title-strategy';
import { FooterHomeComponent } from 'app/shared/components/footer/footer.component';
import { CommonModule } from '@angular/common';

@Component({
    standalone: true,
    selector: 'jhi-main',
    templateUrl: './main.component.html',
    providers: [AppPageTitleStrategy],
    imports: [CommonModule, RouterOutlet, FooterHomeComponent ]
})
export default class MainComponent implements OnInit {
  private renderer: Renderer2;

  private router = inject(Router);
  private appPageTitleStrategy = inject(AppPageTitleStrategy);
  private accountService = inject(AccountService);
  private translateService = inject(TranslateService);
  private rootRenderer = inject(RendererFactory2);
  // eslint-disable-next-line @typescript-eslint/member-ordering
  public windowScrolled = false;


  constructor() {
    this.renderer = this.rootRenderer.createRenderer(document.querySelector('html'), null);
  }

  ngOnInit(): void {
    window.addEventListener('scroll', () => {
      this.windowScrolled = window.pageYOffset !== 0;
    });
    // try to log in automatically
    this.accountService.identity().subscribe();

    this.translateService.onLangChange.subscribe((langChangeEvent: LangChangeEvent) => {
      this.appPageTitleStrategy.updateTitle(this.router.routerState.snapshot);
      dayjs.locale(langChangeEvent.lang);
      this.renderer.setAttribute(document.querySelector('html'), 'lang', langChangeEvent.lang);
    });
  }

  scrollToTop(): void {
    window.scrollTo(0, 0);
  
  }
}
