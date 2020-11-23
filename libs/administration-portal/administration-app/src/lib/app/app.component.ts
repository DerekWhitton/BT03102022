import { Component, OnInit } from '@angular/core';
import { MegaMenuItem, PrimeNGConfig } from 'primeng/api';
import { from, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { getUiStyle } from '@bushtrade/administration-portal/shared/state';
import { IUiStyle } from '@bushtrade/administration-portal/shared/entites';

@Component({
  selector: 'bushtrade-aministration-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'administration-portal';
  menuMode = 'static';
  colorScheme = 'light';
  menuTheme = 'layout-sidebar-darkgray';
  overlayMenuActive: boolean;
  staticMenuDesktopInactive: boolean;
  staticMenuMobileActive: boolean;
  menuClick: boolean;
  search = false;
  searchClick = false;
  userMenuClick: boolean;
  topbarUserMenuActive: boolean;
  notificationMenuClick: boolean;
  topbarNotificationMenuActive: boolean;
  rightMenuClick: boolean;
  rightMenuActive: boolean;
  configActive: boolean;
  configClick: boolean;
  resetMenu: boolean;
  menuHoverActive = false;
  inputStyle = 'outlined';
  ripple: boolean = false;
  style$: Observable<IUiStyle>;

  menuItems: any = [
    {
      label: 'Favourites',
      icon: 'pi pi-fw pi-home',
      items: [
        {
          label: 'Dashboard',
          icon: 'pi pi-fw pi-home',
          routerLink: ['/', 'dashboard'],
        },
      ],
      routerLink: ['/', 'dashboard'],
    },
    { separator: true },
    {
      label: 'Users',
      icon: 'pi pi-pw pi-users',
      items: [
        {
          label: 'Home',
          icon: 'pi pi-fw pi-home',
          routerLink: ['/', 'users'],
        },
      ],
      routerLink: ['/', 'users'],
    },
    { separator: true },
    {
      label: 'Advertisments',
      icon: 'pi pi-user',
      items: [
        {
          label: 'Home',
          icon: 'pi pi-fw pi-list',
          routerLink: ['/', 'advertisments'],
        },
      ],
      routerLink: ['/', 'advertisments'],
    },
    { separator: true },
    {
      label: 'Articles',
      icon: 'pi pi-user',
      items: [
        {
          label: 'Home',
          icon: 'pi pi-fw pi-list',
          routerLink: ['/', 'articles'],
        },
      ],
      routerLink: ['/', 'articles'],
    },
    { separator: true },
    {
      label: 'Escrow',
      icon: 'pi pi-user',
      items: [
        {
          label: 'Home',
          icon: 'pi pi-fw pi-list',
          routerLink: ['/', 'escrow'],
        },
      ],
      routerLink: ['/', 'escrow'],
    },
    { separator: true },
    {
      label: 'Forums',
      icon: 'pi pi-user',
      items: [
        {
          label: 'Home',
          icon: 'pi pi-fw pi-list',
          routerLink: ['/', 'forums'],
        },
      ],
      routerLink: ['/', 'forums'],
    },
    { separator: true },
    {
      label: 'Listings',
      icon: 'pi pi-user',
      items: [
        {
          label: 'Home',
          icon: 'pi pi-fw pi-list',
          routerLink: ['/', 'listings'],
        },
      ],
      routerLink: ['/', 'listings'],
    },
    { separator: true },
    {
      label: 'Messages',
      icon: 'pi pi-user',
      items: [
        {
          label: 'Home',
          icon: 'pi pi-fw pi-list',
          routerLink: ['/', 'messages'],
        },
      ],
      routerLink: ['/', 'messages'],
    },
    { separator: true },
    {
      label: 'Reports',
      icon: 'pi pi-user',
      items: [
        {
          label: 'Home',
          icon: 'pi pi-fw pi-list',
          routerLink: ['/', 'reports'],
        },
      ],
      routerLink: ['/', 'reports'],
    },
    { separator: true },
    {
      label: 'Support',
      icon: 'pi pi-user',
      items: [
        {
          label: 'Home',
          icon: 'pi pi-fw pi-list',
          routerLink: ['/', 'support'],
        },
      ],
      routerLink: ['/', 'support'],
    },
    { separator: true },
  ];
  constructor(
    private primengConfig: PrimeNGConfig,
    private store: Store // private broadcastService: BroadcastService,
  ) // private authService: MsalService
  {}

  ngOnInit(): void {
    // // event listeners for authentication status
    // this.broadcastService.subscribe('msal:loginSuccess', (success) => {
    //   // We need to reject id tokens that were not issued with the default sign-in policy.
    //   // "acr" claim in the token tells us what policy is used (NOTE: for new policies (v2.0), use "tfp" instead of "acr")
    //   // To learn more about b2c tokens, visit https://docs.microsoft.com/en-us/azure/active-directory-b2c/tokens-overview
    //   if (
    //     success.idToken.claims['acr'] === environment.b2c.names.resetPassword
    //   ) {
    //     window.alert(
    //       'Password has been reset successfully. \nPlease sign-in with your new password'
    //     );
    //     return this.authService.logout();
    //   }
    // });

    // this.broadcastService.subscribe('msal:loginFailure', (error) => {
    //   if (error.errorMessage.indexOf('AADB2C90118') > -1) {
    //     this.authService.loginRedirect(
    //       environment.b2c.authorities.resetPassword
    //     );
    //   }
    //   if (error.errorMessage.indexOf('AADB2C90077') > -1) {
    //     this.authService.loginRedirect(
    //       environment.b2c.authorities.signUpSignIn
    //     );
    //   }
    // });

    // // redirect callback for redirect flow (IE)
    // this.authService.handleRedirectCallback((authError, response) => {
    //   if (authError) {
    //     console.error('Redirect Error: ', authError.errorMessage);
    //     return;
    //   }
    // });

    this.style$ = this.store.select(getUiStyle);
    let ctx = this;
    this.style$.subscribe({
      next(res) {
        if (res != null) {
          (ctx.menuMode = res.menuMode != '' ? res.menuMode : ctx.menuMode),
            (ctx.colorScheme =
              res.colorScheme != '' ? res.colorScheme : ctx.colorScheme);
          ctx.menuTheme =
            res.menuTheme != ''
              ? 'layout-sidebar-' + res.menuTheme
              : ctx.menuTheme;

          ctx.ripple = res.ripple != null ? res.ripple : ctx.ripple;

          ctx.changeStyleSheetsColor(
            'theme-css',
            'theme-' + res.colorScheme + '.css',
            res.componentTheme != '' ? res.componentTheme : 'blue'
          );

          console.log(res);
          if (res.colorScheme != '') {
            ctx.changeStyleSheetsColor(
              'layout-css',
              'layout-' + res.colorScheme + '.css',
              null
            );

            const mobileLogoLink: HTMLImageElement = document.getElementById(
              'logo-mobile'
            ) as HTMLImageElement;
            const footerLogoLink: HTMLImageElement = document.getElementById(
              'footer-logo'
            ) as HTMLImageElement;
            const appLogoLink: HTMLImageElement = document.getElementById(
              'app-logo'
            ) as HTMLImageElement;

            if (res.colorScheme === 'light') {
              mobileLogoLink.src = 'assets/layout/images/logo-dark.svg';
              footerLogoLink.src = 'assets/layout/images/logo-dark.svg';
              if (res.menuTheme == 'white') {
                appLogoLink.src = 'assets/layout/images/logo-dark.svg';
              } else {
                appLogoLink.src = 'assets/layout/images/logo-light.svg';
              }
            } else {
              mobileLogoLink.src = 'assets/layout/images/logo-light.svg';
              footerLogoLink.src = 'assets/layout/images/logo-light.svg';
              appLogoLink.src = 'assets/layout/images/logo-light.svg';
            }
          }
        }
      },
    });
    this.primengConfig.ripple = true;
  }

  changeStyleSheetsColor(id, value, sub) {
    const element = document.getElementById(id);
    const urlTokens = element.getAttribute('href').split('/');

    urlTokens[urlTokens.length - 1] = value;
    if (sub != null) {
      // we have a sub.. add it
      urlTokens[urlTokens.length - 2] = sub;
    }
    const newURL = urlTokens.join('/');
    this.replaceLink(element, newURL);
  }

  replaceLink(linkElement, href) {
    if (this.isIE()) {
      linkElement.setAttribute('href', href);
    } else {
      const id = linkElement.getAttribute('id');
      const cloneLinkElement = linkElement.cloneNode(true);

      cloneLinkElement.setAttribute('href', href);
      cloneLinkElement.setAttribute('id', id + '-clone');

      linkElement.parentNode.insertBefore(
        cloneLinkElement,
        linkElement.nextSibling
      );

      cloneLinkElement.addEventListener('load', () => {
        linkElement.remove();
        cloneLinkElement.setAttribute('id', id);
      });
    }
  }

  isIE() {
    return /(MSIE|Trident\/|Edge\/)/i.test(window.navigator.userAgent);
  }

  onLayoutClick() {
    if (!this.searchClick) {
      this.search = false;
    }

    if (!this.userMenuClick) {
      this.topbarUserMenuActive = false;
    }

    if (!this.notificationMenuClick) {
      this.topbarNotificationMenuActive = false;
    }

    if (!this.rightMenuClick) {
      this.rightMenuActive = false;
    }

    if (!this.menuClick) {
      if (this.isSlim()) {
        // this.menuService.reset();
      }

      if (this.overlayMenuActive || this.staticMenuMobileActive) {
        this.hideOverlayMenu();
      }

      this.menuHoverActive = false;
      this.unblockBodyScroll();
    }

    if (this.configActive && !this.configClick) {
      this.configActive = false;
    }

    this.searchClick = false;
    this.configClick = false;
    this.userMenuClick = false;
    this.rightMenuClick = false;
    this.notificationMenuClick = false;
    this.menuClick = false;
  }

  onMenuButtonClick(event) {
    this.menuClick = true;
    this.topbarUserMenuActive = false;
    this.topbarNotificationMenuActive = false;
    this.rightMenuActive = false;

    if (this.isOverlay()) {
      this.overlayMenuActive = !this.overlayMenuActive;
    }

    if (this.isDesktop()) {
      this.staticMenuDesktopInactive = !this.staticMenuDesktopInactive;
    } else {
      this.staticMenuMobileActive = !this.staticMenuMobileActive;
      if (this.staticMenuMobileActive) {
        this.blockBodyScroll();
      } else {
        this.unblockBodyScroll();
      }
    }

    event.preventDefault();
  }

  onSearchClick(event) {
    this.search = !this.search;
    this.searchClick = !this.searchClick;
  }

  onMenuClick() {
    this.menuClick = true;
    this.resetMenu = false;
  }

  onTopbarUserMenuButtonClick(event) {
    this.userMenuClick = true;
    this.topbarUserMenuActive = !this.topbarUserMenuActive;

    this.hideOverlayMenu();

    event.preventDefault();
  }

  onTopbarNotificationMenuButtonClick(event) {
    this.notificationMenuClick = true;
    this.topbarNotificationMenuActive = !this.topbarNotificationMenuActive;

    this.hideOverlayMenu();

    event.preventDefault();
  }

  onRightMenuClick(event) {
    this.rightMenuClick = true;
    this.rightMenuActive = !this.rightMenuActive;

    this.hideOverlayMenu();

    event.preventDefault();
  }

  onRippleChange(event) {
    this.ripple = event.checked;
  }

  onConfigClick(event) {
    this.configClick = true;
  }

  isSlim() {
    return this.menuMode === 'slim';
  }

  isOverlay() {
    return this.menuMode === 'overlay';
  }

  isDesktop() {
    return window.innerWidth > 991;
  }

  isMobile() {
    return window.innerWidth <= 991;
  }

  hideOverlayMenu() {
    this.overlayMenuActive = false;
    this.staticMenuMobileActive = false;
  }

  blockBodyScroll(): void {
    if (document.body.classList) {
      document.body.classList.add('blocked-scroll');
    } else {
      document.body.className += ' blocked-scroll';
    }
  }

  unblockBodyScroll(): void {
    if (document.body.classList) {
      document.body.classList.remove('blocked-scroll');
    } else {
      document.body.className = document.body.className.replace(
        new RegExp(
          '(^|\\b)' + 'blocked-scroll'.split(' ').join('|') + '(\\b|$)',
          'gi'
        ),
        ' '
      );
    }
  }

  isMenuHoverActive() {
    return this.menuHoverActive;
  }

  onSetMenuHoverActive() {
    this.menuHoverActive = !this.menuHoverActive;
  }

  onSetMenuHoverActiveFalse() {
    this.menuHoverActive = false;
  }

  onSetStaticMenuMobileActiveFalse() {
    this.staticMenuMobileActive = false;
  }
}
