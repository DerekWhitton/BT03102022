import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Subscription } from 'rxjs';

@Component({
  selector: '[boma-portal-menu-item]',
  host: {
    '[class.layout-root-menuitem]': 'root',
    '[class.active-menuitem]': '(active && !root) || (active && this.isSlim)',
  },
  animations: [
    trigger('children', [
      state(
        'void',
        style({
          height: '0px',
        })
      ),
      state(
        'hiddenAnimated',
        style({
          height: '0px',
        })
      ),
      state(
        'visibleAnimated',
        style({
          height: '*',
        })
      ),
      state(
        'visible',
        style({
          height: '*',
          'z-index': 100,
        })
      ),
      state(
        'hidden',
        style({
          height: '0px',
          'z-index': '*',
        })
      ),
      state(
        'slimVisibleAnimated',
        style({
          opacity: 1,
          transform: 'none',
        })
      ),
      state(
        'slimHiddenAnimated',
        style({
          opacity: 0,
          transform: 'translateX(20px)',
        })
      ),
      transition(
        'visibleAnimated => hiddenAnimated',
        animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')
      ),
      transition(
        'hiddenAnimated => visibleAnimated',
        animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')
      ),
      transition(
        'void => visibleAnimated, visibleAnimated => void',
        animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')
      ),
      transition(
        'void => slimVisibleAnimated',
        animate('400ms cubic-bezier(.05,.74,.2,.99)')
      ),
      transition(
        'slimHiddenAnimated => slimVisibleAnimated',
        animate('400ms cubic-bezier(.05,.74,.2,.99)')
      ),
    ]),
  ],
  templateUrl: './portal-menu-item.component.html',
  styleUrls: ['./portal-menu-item.component.scss'],
})
export class PortalMenuItemComponent implements OnInit {
  @Input() item: any;

  @Input() index: number;

  @Input() root: boolean;

  @Input() parentKey: string;

  @Input() isSlim = false;

  @Input() isMobile = false;

  @Input() isDesktop = false;

  @Input() menuHoverActive = false;

  @Output() setMenuHoverActive = new EventEmitter();

  @Output() setMenuHoverActiveFalse = new EventEmitter();

  @Output() unblockBodyScroll = new EventEmitter();

  @Output() staticMenuMobileActiveFalse = new EventEmitter();

  active = false;

  menuSourceSubscription: Subscription;

  menuResetSubscription: Subscription;

  key: string;

  slimClick = true;

  constructor(
    public router: Router,
    private cd: ChangeDetectorRef,
    private menuService: PortalMenuService
  ) {
    this.menuSourceSubscription = this.menuService.menuSource$.subscribe(
      (key) => {
        // deactivate current active menu
        if (this.active && this.key !== key && key.indexOf(this.key) !== 0) {
          this.active = false;
        }
      }
    );

    this.menuResetSubscription = this.menuService.resetSource$.subscribe(() => {
      this.active = false;
    });
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((params) => {
        if (this.isSlim) {
          this.active = false;
        } else {
          if (this.item.routerLink) {
            this.updateActiveStateFromRoute();
          } else {
            this.active = false;
          }
        }
      });
  }

  ngOnInit() {
    if (!this.isSlim && this.item.routerLink) {
      this.updateActiveStateFromRoute();
    }

    this.key = this.parentKey
      ? this.parentKey + '-' + this.index
      : String(this.index);
  }

  updateActiveStateFromRoute() {
    this.active = this.router.isActive(
      this.item.routerLink[0],
      !this.item.items
    );
  }

  itemClick(event: Event) {
    if (this.isSlim) {
      this.slimClick = true;
    }

    // avoid processing disabled items
    if (this.item.disabled) {
      event.preventDefault();
      return true;
    }

    // navigate with hover in horizontal mode
    if (this.root) {
      this.setMenuHoverActive.emit();
    }

    // notify other items
    this.menuService.onMenuStateChange(this.key);

    // execute command
    if (this.item.command) {
      this.item.command({ originalEvent: event, item: this.item });
    }

    // toggle active state
    if (this.item.items) {
      this.active = !this.active;
    } else {
      // activate item
      this.active = true;

      if (this.isMobile) {
        this.staticMenuMobileActiveFalse.emit();
      }

      // reset horizontal menu
      if (this.isSlim) {
        this.menuService.reset();
        this.setMenuHoverActiveFalse.emit();
      }

      this.unblockBodyScroll.emit();
    }
  }

  onMouseEnter() {
    // activate item on hover
    if (this.root && this.isSlim && this.isDesktop) {
      if (this.menuHoverActive) {
        this.menuService.onMenuStateChange(this.key);
        this.slimClick = false;
        this.active = true;
      } else {
        this.slimClick = true;
      }
    }
  }

  ngOnDestroy() {
    if (this.menuSourceSubscription) {
      this.menuSourceSubscription.unsubscribe();
    }

    if (this.menuResetSubscription) {
      this.menuResetSubscription.unsubscribe();
    }
  }
}
