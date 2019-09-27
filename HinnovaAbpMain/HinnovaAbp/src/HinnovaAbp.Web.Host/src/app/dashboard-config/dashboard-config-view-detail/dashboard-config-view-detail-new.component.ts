import { Component, OnInit, Injector } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import {
    DashboardConfigServiceProxy, DashboardItemDto, LayoutServiceProxy,
    DashboardItemServiceProxy, DashboardItemDisplay, LayoutConfigDto, DashboardDto, DashboardDetailDto
} from '@shared/service-proxies/service-proxies';
import { Router, ActivatedRoute } from '@angular/router';

import { AppComponentBase } from '@shared/app-component-base';
import { DashboardConfigViewDetail } from './dashboard-config-view-detail.component';

@Component({
    templateUrl: './dashboard-config-view-detail.component.html',
    styleUrls: ['./dashboard-config-view-detail.component.scss'],
    animations: [appModuleAnimation()]
})
export class DashboardConfigViewDetailNew extends DashboardConfigViewDetail {

    ngOnInit() {
        this.activeRoute.params.subscribe(params => {
            this.initLayoutComponentOptions();
            this.initDashboardGroupComponentOptions();
        });
    }

    selectFirstItemInLayoutOptions(source) {
        var flag = true
        this.layoutOptions.deferRendering = false;
        this.layoutOptions.onContentReady = function (e) {
            if (flag) {
                flag = false;
                source.load().then((data) => {
                    e.component.option('value', data[0].id);
                })
            }
        }
    }

    saveDashboard(dashboard: DashboardDto, dashboardDetail: Array<DashboardDetailDto>){
        this._dashboardConfigService.createDashboardAsync(dashboard).subscribe((dashboardId) => {
            dashboardDetail.map(val => val.dashboardId = dashboardId)
            this._dashboardConfigService.createDashboardDetailAsync(dashboardDetail).subscribe(() => {
                abp.notify.info('Created Successfully');
                this.router.navigate(['/app/dashboard-config']);
            })
        });
    }

}
