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
export class DashboardConfigViewDetailEdit extends DashboardConfigViewDetail {

    dashboardId: number;

    ngOnInit() {
        this.activeRoute.params.subscribe(params => {
            this.dashboardId = params['id'];
            this._dashboardConfigService.getDashboardAsync(this.dashboardId).subscribe((dashboard) => {
                this.dashboardData = dashboard;
            })
            this.initLayoutComponentOptions();
            this.initDashboardGroupComponentOptions();
        });
    }

    loadExistedDashboardItemsToLayout() {
        this._dashboardConfigService.getDashboardDetailAsync(this.dashboardId).subscribe((dashboardDetail) => {
            for (let i = 0; i < dashboardDetail.length; i++) {
                this.loadDashboardItemToLayout($('#' + dashboardDetail[i]['itemCode']), $('#' + dashboardDetail[i]['contentId']));
            }
        })
    }

    saveDashboard(dashboard: DashboardDto, dashboardDetail: Array<DashboardDetailDto>){
        dashboard.id = this.dashboardId;
        this._dashboardConfigService.updateDashboardAsync(dashboard).subscribe((dashboardId) => {
            dashboardDetail.map(val => val.dashboardId = dashboardId)
            this._dashboardConfigService.updateDashboardDetailAsync(dashboardDetail).subscribe(() => {
                abp.notify.info('Updated Successfully');
                this.router.navigate(['/app/dashboard-config']);
            })
        });
    }

}
