import { Component, OnInit, EventEmitter, Output, ViewChild, Injector } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { DashboardItemServiceProxy, DashboardItemDto } from '@shared/service-proxies/service-proxies';

import { ModalDirective } from 'ngx-bootstrap';
import { getTypeChartOptions } from '@shared/app-component-base';
import { isNullOrUndefined } from 'util';
import { Router, ActivatedRoute } from '@angular/router';

import { AppComponentBase } from '@shared/app-component-base';

@Component({
    selector: 'dashboardItemViewDetail',
    templateUrl: './dashboard-item-view-detail.component.html',
    animations: [appModuleAnimation()]
})
export class DashboardItemViewDetail extends AppComponentBase implements OnInit {

    page_title: string;
    type_title: string;

    dashboardItemType: number;
    chartTypes: number;
    dashboardItemTypeOptions: any;
    dashboardItemGroupOptions: any;
    chartTypeOptions: any;

    dashboardItemData: DashboardItemDto;


    constructor(protected _dashboardItemService: DashboardItemServiceProxy,
        protected router: Router,
        protected activeRoute: ActivatedRoute,
        protected injector: Injector, ) {
        super(injector)
    }

    ngOnInit() {}

    save() {}

    selectFirstItemInChartTypeOptions(){}

    selectFirstItemInDashboardGroupOptions(){}

    selectFirstItemInDashboardTypeOptions(){}

    return() {
        this.router.navigate(['/app/dashboard-item']);
    }

    initChartTypeComponentOptions() {
        const self = this;
        this.chartTypeOptions = {
            dataSource: {
                loadMode: 'raw',
                load: function () {
                    return getTypeChartOptions();
                }
            },
            valueExpr: 'code',
            displayExpr: 'name',
            onValueChanged: function (event) {
                self.onValueChangedChartType(event.value);
            },
        }
        
        this.selectFirstItemInChartTypeOptions();
    }

    onValueChangedChartType(code: any) {
        if (code == 'bar') {
            this.chartTypes = 1;
        } else if (code == 'stackedBar') {
            this.chartTypes = 2;
        } else if (code == 'pie') {
            this.chartTypes = 3;
        }
    }

    initDashboardGroupComponentOptions() {
        const self = this;
        this.dashboardItemGroupOptions = {
            dataSource: {
                loadMode: 'raw',
                load: function () {
                    const promise = new Promise((resolve, reject) => {
                        self._dashboardItemService.getItemGroup().subscribe(res => {
                            resolve(res);
                        });
                    });
                    return promise;
                },
                onValueChanged: function (event) {},
            },
            valueExpr: 'code',
            displayExpr: 'name'
        };
        
        this.selectFirstItemInDashboardGroupOptions();
    }

    initDashboardTypeComponentOptions() {
        const self = this;
        this.dashboardItemTypeOptions = {
            dataSource: {
                loadMode: 'raw',
                load: function () {
                    const promise = new Promise((resolve, reject) => {
                        self._dashboardItemService.getItemType().subscribe(res => {
                            resolve(res);
                        });
                    });
                    return promise;
                }
            },
            valueExpr: 'code',
            displayExpr: 'name',
            onValueChanged: function (e) {
                const code = e.value;
                if (code == 'BASIC') {
                    self.dashboardItemType = 1;
                    self.type_title = 'Box component';
                } else if (code == 'MULSIP') {
                    self.dashboardItemType = 2;
                    self.type_title = 'Multi Simple component';
                } else if (code == 'CRT') {
                    self.dashboardItemType = 3;
                    self.type_title = 'Biểu đồ'
                } else if (code == 'DT') {
                    self.dashboardItemType = 4;
                    self.type_title = 'Cấu hình bảng dữ liệu';
                }
            },
        };

        this.selectFirstItemInDashboardTypeOptions();
    }

}
