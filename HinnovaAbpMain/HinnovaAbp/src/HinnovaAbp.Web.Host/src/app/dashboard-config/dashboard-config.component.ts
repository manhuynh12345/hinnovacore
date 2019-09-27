import { Component, Injector, OnInit } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { DashboardConfigServiceProxy, DashboardDto} from '@shared/service-proxies/service-proxies';
import { AppComponentBase, retrieveState } from '@shared/app-component-base';
import { isNullOrUndefined } from 'util';
import { Router } from '@angular/router';

@Component({
    templateUrl: './dashboard-config.component.html',
    animations: [appModuleAnimation()]
})

export class DashboardConfig extends AppComponentBase implements OnInit {

    dashboardDataSource: any;
    dashboardData: any;

    constructor(injector: Injector, private _dashboardConfigService: DashboardConfigServiceProxy, private router: Router) {
        super(injector);
        this.dashboardData = retrieveState() || {
            name: '',
            type: '',
            pageSize: 50,
            pageIndex: 0,
            sortOrder: 'createddate_desc'
        };
    }

    ngOnInit(): void {
        this.search();
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
        this.router.navigate(['/app/dashboard-config/dashboard-config-view-detail-new']);
    }

    showDetail(dashboardId: number) {
        this.router.navigate(['/app/dashboard-config/dashboard-config-view-detail-edit/' + dashboardId]);
    }

    search() {
        const self = this;
        this.dashboardDataSource = {
            load: function () {
                const promise = new Promise((resolve, reject) => {
                    if (isNullOrUndefined(self.dashboardData.name) || self.dashboardData.name === '') {
                        self.dashboardData.name = '';
                    }
                    self._dashboardConfigService.getListDashboardByName(self.dashboardData.name).subscribe((res: any) => {
                        resolve(res);
                    });
                });
                return promise;
            },
        };
    }

    delete(dashboardItemId: number) {
        abp.message.confirm(
            'Are you sure to delete this dashboard?',
            isConfirmed => {
                if (isConfirmed) {
                    this._dashboardConfigService.getDashboardAsync(dashboardItemId).subscribe((res: DashboardDto) => {
                        res.isActive = false;
                        res.isDelete = true;
                        res.isPublish = false;
                        this._dashboardConfigService.updateDashboardAsync(res).subscribe(() => {
                            abp.notify.info('Deleted Successfully');
                            this.search();
                        });
                    })
                }
            }
        );

    }

}