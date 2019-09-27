import { Component, OnInit, EventEmitter, Output, ViewChild, Injector } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { DashboardItemServiceProxy, DashboardItemDto } from '@shared/service-proxies/service-proxies';

import { DashboardItemViewDetail } from './dashboard-item-view-detail.component';

@Component({
    templateUrl: './dashboard-item-view-detail.component.html',
    animations: [appModuleAnimation()]
})
export class DashboardItemViewDetailEdit extends DashboardItemViewDetail {

    dashboardItemId: any;

    ngOnInit() {
        this.activeRoute.params.subscribe(params => {
            this.dashboardItemId = params['id'];
            this.page_title = "Cập nhật thông tin dashboard item";
            this._dashboardItemService.getDashboardItem(this.dashboardItemId).subscribe((res: DashboardItemDto) => {
                this.onValueChangedChartType(res.chartType)
                this.dashboardItemData = res;
                this.initChartTypeComponentOptions();
            })

            this.initDashboardGroupComponentOptions();
            this.initDashboardTypeComponentOptions();
        });
    }

    save() {
        this._dashboardItemService.updateDashboardItemAsync(this.dashboardItemData).subscribe(() => {
            abp.notify.info('Updated Successfully');
        });
    }

    selectFirstItemInChartTypeOptions() {
        if (this.dashboardItemData.itemType != 'CRT') {
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
    }

}
