import { Component, Injector, OnInit } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { DashboardItemServiceProxy, DashboardItemTypeDto, DashboardItemDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase, retrieveState } from '@shared/app-component-base';
import { isNullOrUndefined } from 'util';
import { Router } from '@angular/router';

@Component({
    templateUrl: './dashboard-item.component.html',
    animations: [appModuleAnimation()]
})

export class DashboardItem extends AppComponentBase implements OnInit {

    dashboardItemTypeOptions: any;
    dashboardItemDataSource: any;
    dashboardData: any;

    constructor(injector: Injector, private _dashboardItemService: DashboardItemServiceProxy, private router: Router) {
        super(injector);
        this.dashboardData = retrieveState() || {
            name: '',
            type: 'ALL',
            pageSize: 50,
            pageIndex: 0,
            sortOrder: 'createddate_desc'
        };
    }

    ngOnInit(): void {
        this.initDashboardTypeComponentOptions();
    }

    initDashboardTypeComponentOptions() {
        const self = this;
        this.dashboardItemTypeOptions = {
            dataSource: {
                loadMode: 'raw',
                load: function () {
                    const promise = new Promise((resolve, reject) => {
                        self._dashboardItemService.getItemType().subscribe(res => {
                            const temp = new DashboardItemTypeDto();
                            temp.code = "ALL"
                            temp.name = "Tất cả"
                            temp.isActive = true
                            temp.isDelete = false
                            res.unshift(temp);
                            resolve(res);
                            self.search();
                        });
                    });
                    return promise;
                }
            },
            valueExpr: 'code',
            displayExpr: 'name',
            value: "ALL"
        };
    }

    reset() {
        this.dashboardData = {
            name: '',
            type: 'ALL',
            pageSize: 50,
            pageIndex: 0
        };

        this.search();
    }

    create() {
        this.router.navigate(['/app/dashboard-item/dashboard-item-view-detail-new']);
    }

    showDetail(dashboardItemId: number) {
        this.router.navigate(['/app/dashboard-item/dashboard-item-view-detail-edit/' + dashboardItemId]);
    }

    search() {
        const self = this;
        this.dashboardItemDataSource = {
            load: function () {
                const promise = new Promise((resolve, reject) => {
                    if (isNullOrUndefined(self.dashboardData.name) || self.dashboardData.name === '') {
                        self.dashboardData.name = '';
                    }
                    if (isNullOrUndefined(self.dashboardData.type) || self.dashboardData.type === 'Administrator' ||self.dashboardData.type === '') {
                        self.dashboardData.type = 'ALL';
                    }
                    self._dashboardItemService.getListDashboardItem(self.dashboardData.name, self.dashboardData.type, 'ALL').subscribe((res: any) => {
                        resolve(res);
                    });
                });
                return promise;
            },
        };
    }

    delete(dashboardItemId: number) {
        abp.message.confirm(
            'Are you sure to delete this dashboard item?',
            isConfirmed => {
                if (isConfirmed) {
                    this._dashboardItemService.getDashboardItem(dashboardItemId).subscribe((res: DashboardItemDto) => {
                        res.isActive = false;
                        res.isDelete = true;
                        this._dashboardItemService.updateDashboardItemAsync(res).subscribe(() => {
                            abp.notify.info('Deleted Successfully');
                            this.search();
                        });
                    })
                }
            }
        );

    }

}