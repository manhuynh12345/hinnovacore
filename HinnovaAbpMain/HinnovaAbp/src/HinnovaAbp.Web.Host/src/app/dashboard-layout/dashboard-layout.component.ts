import {Component, Inject, ViewChild, OnInit, Injector, ViewEncapsulation} from '@angular/core';
import {AppComponentBase, storeState, retrieveState } from '@shared/app-component-base';
import {appModuleAnimation} from '@shared/animations/routerTransition';
import {DxDataGridComponent} from 'devextreme-angular';
import {LayoutServiceProxy} from '@shared/service-proxies/service-proxies';
import { Router } from '@angular/router';

@Component({
    templateUrl: './dashboard-layout.component.html',
    styleUrls: ['./dashboard-layout.component.scss'],
    animations: [appModuleAnimation()],
    encapsulation: ViewEncapsulation.None
})
export class DashboardLayoutComponent extends AppComponentBase implements OnInit{
    @ViewChild('dashboardLayoutDg') dashboardLayoutDg: DxDataGridComponent;

    dashboardLayoutDataSource: any;
    dashboardLayoutData: any;

    constructor(
        injector: Injector,
        private _dashboardLayoutService : LayoutServiceProxy,
        private router: Router
    ){
        super(injector);
        this.dashboardLayoutData = retrieveState() || {
            name: '',
            code: '',
            pageSize: 50,
            pageIndex: 0,
            sortOrder: 'createddate_desc'
        }
    }

    createLayout() {
        // this.searchService.createLayout()
        this.router.navigate(['/app/dashboard-layout/dashboard-layout-detail/null-value']);
    }

    editLayout(dashboardLayoutId: number) {
        // this.searchService.createLayout()
        this.router.navigate(['/app/dashboard-layout/dashboard-layout-detail/' + dashboardLayoutId]);
    }

    ngOnInit(){
        this.initDashboardLayoutDataSource();
    }

    initDashboardLayoutDataSource(){
        const self = this;
        this.dashboardLayoutDataSource = {
            load: function(loadOption: any){
                const promise = new Promise((resolve, reject) => {
                    self._dashboardLayoutService.getListAsync().subscribe((res:any) => {
                        resolve(res);
                    });
                });
                return promise;
            }
        }
    }

    //Xóa dashboard layout theo id
    delete(dashboardLayoutId: number){
        abp.message.confirm(
            'Are you sure to delete this dashboard layout? ',
            isConfirmed => {
                if(isConfirmed){
                    this._dashboardLayoutService.deleteAsync(dashboardLayoutId).subscribe(()=>{
                        abp.notify.info('Deleted Successfully');
                        this.search();
                    });
                }
            }
        );
    }

    //Reload datagrid
    search(){
        if(this.dashboardLayoutDg && this.dashboardLayoutDg.instance){
            this.dashboardLayoutDg.instance.refresh();
        }
    }

    onContentReady_DashboardLayoutDataGrid(e){
        this.dashboardLayoutData.pageIndex = e.component.pageIndex();
        this.dashboardLayoutData.pageSize = e.component.pageSize();

        storeState(this.dashboardLayoutData);

        this.initDragging(e);
    }

    onRowPrepared_DashboardLayoutDataGrid(e){
        if(e.rowType != 'data'){return;}
        $(e.rowElement).addClass('row-draggable').data('row-value', e.key);
    }

    initDragging(e){
        const self = this;
        const $gridElement = $(e.element);

        $gridElement.find('.row-draggable').draggable({
            helper: 'clone',
            start: function (event, ui) {
                const $originalRow = $(this), $clonedRow = ui.helper;
                const $originalRowCells = $originalRow.children(), $clonedRowCells = $clonedRow.children();
                for (let i = 0; i < $originalRowCells.length; i++) {
                    $($clonedRowCells.get(i)).width($($originalRowCells.get(i)).width());
                }

                $originalRow.addClass('bg-selected');
                $clonedRow.width($originalRow.width()).addClass('bg-light');
            },
            stop: function (event, ui) {
                const $originalRow = $(this);
                $originalRow.removeClass('bg-selected');
            }
        });

        $gridElement.find('.row-draggable').droppable({
            over: function (event, ui) {
                const $dropRow = $(this);
                $dropRow.addClass('bg-droppable');
            },
            out: function (event, ui) {
                const $dropRow = $(this);
                $dropRow.removeClass('bg-droppable');
            },
            //Thay đổi vị trí phần tử (dashboard layout ko sử dụng)
            // drop: function (event, ui) {
            //     const draggingRowKey = ui.draggable.data('row-value');
            //     const targetRowKey = $(this).data('row-value');

            //     const dataSource = e.component.option('dataSource');

            //     dataSource.reorder(draggingRowKey, targetRowKey).then(() => {
            //         self.dashboardLayoutDg.instance.refresh();
            //     });
            // }
        });
    }

}