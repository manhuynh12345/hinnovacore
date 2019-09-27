import { Component, OnInit, EventEmitter, Output, ViewChild, Injector } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { DashboardItemServiceProxy, DashboardItemDto } from '@shared/service-proxies/service-proxies';

import { DashboardItemViewDetail } from './dashboard-item-view-detail.component';

@Component({
    templateUrl: './dashboard-item-view-detail.component.html',
    animations: [appModuleAnimation()]
})
export class DashboardItemViewDetailNew extends DashboardItemViewDetail {

    ngOnInit() {
        this.activeRoute.params.subscribe(params => {
            this.page_title = "Thêm mới thành phần!";
            this.dashboardItemData = new DashboardItemDto();
            this.dashboardItemType = 0;
            this.chartTypes = 0;
            this.initDashboardGroupComponentOptions();
            this.initDashboardTypeComponentOptions();
            this.initChartTypeComponentOptions();
        });
    }

    save() {
        this.dashboardItemData.isActive = true;
        this.dashboardItemData.isDelete = false;
        this._dashboardItemService.createDashboardItemAsync(this.dashboardItemData).subscribe(() => {
            abp.notify.info('Created Successfully');
        });
    }


    selectFirstItemInChartTypeOptions() {
        var flag = true
        this.chartTypeOptions.deferRendering = false;
        this.chartTypeOptions.onContentReady = function (e) {
            if (flag) {
                flag = false;
                e.component.getDataSource().load().then((data) => {
                    e.component.option('value', data[0].code);
                })
            }
        }
    }

    selectFirstItemInDashboardGroupOptions() {
        var flag = true
        this.dashboardItemGroupOptions.deferRendering = false;
        this.dashboardItemGroupOptions.onContentReady = function (e) {
            if (flag) {
                flag = false;
                e.component.getDataSource().load().then((data) => {
                    e.component.option('value', data[0].code);
                })
            }
        }
    }

    selectFirstItemInDashboardTypeOptions() {
        var flag = true
        this.dashboardItemTypeOptions.deferRendering = false;
        this.dashboardItemTypeOptions.onContentReady = function (e) {
            if (flag) {
                flag = false;
                e.component.getDataSource().load().then((data) => {
                    e.component.option('value', data[0].code);
                })
            }
        }
    }

}
