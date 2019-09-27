import { Component, Injector, ViewEncapsulation, AfterViewInit, ViewChildren, QueryList } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { ConfigurationServiceProxy, MenuDisplayDto } from '@shared/service-proxies/service-proxies';
import { finalize } from 'rxjs/operators';

@Component({
    templateUrl: './sidebar-nav.component.html',
    selector: 'sidebar-nav',
    encapsulation: ViewEncapsulation.None
})
export class SideBarNavComponent extends AppComponentBase implements AfterViewInit {
    @ViewChildren('menus') things: QueryList<any>;
    menuItems: any;
    isDataLoaded: boolean = false;

    constructor(
        injector: Injector,
        private _configurationService: ConfigurationServiceProxy
    ) {
        super(injector);
        this.getMenuList();
    }

    ngAfterViewInit() {
        this.things.changes.subscribe(t => {
            // subscribe to menu data loaded and rendered, this line activate the menu functionality (expand, collapse)
            $.AdminBSB.leftSideBar.activate();
        })
        
    }

    showMenuItem(menuItem): boolean {
        if (menuItem.permissionName) {
            return this.permission.isGranted(menuItem.permissionName);
        }

        return true;
    }

    getMenuList(): any {
        this._configurationService.getDisplayListAsync()
            .pipe(
                finalize(() => {

                })
            )
            .subscribe((result: MenuDisplayDto[]) => {
                console.log(result);
                this.menuItems = result;
            });
    }
}
