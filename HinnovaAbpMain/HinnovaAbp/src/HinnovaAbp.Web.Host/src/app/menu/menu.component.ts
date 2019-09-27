import { Component, Injector, ViewChild, OnInit } from '@angular/core';
import { AppComponentBase, storeState, retrieveState, Guid, getMenuTypeOptions } from '@shared/app-component-base';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { DxDataGridComponent } from 'devextreme-angular';
import { MenuServiceProxy, MenuListDto, ReOrderInputDto } from '@shared/service-proxies/service-proxies';
import { MenuDetailModalComponent } from './menu-detail-modal/menu-detail-modal.component';

@Component({
    templateUrl: './menu.component.html',
    animations: [appModuleAnimation()]
})
export class MenuComponent extends AppComponentBase implements OnInit {

    @ViewChild('menuDg') menuDg: DxDataGridComponent;

    menuData: any;
    menuTypeOptions: any;
    menuDataSource: any;

    constructor(
        injector: Injector,
        private _menuService: MenuServiceProxy
    ) {
        super(injector);

        this.menuData = retrieveState() || {
            name: '',
            type: '',
            pageSize: 50,
            pageIndex: 0,
            sortOrder: 'createddate_desc'
        };
    }

    ngOnInit() {
        this.initMenuTypeOptions();
        this.initMenuDataSource();
    }

    initMenuTypeOptions() {
        this.menuTypeOptions = {
            dataSource: {
                loadMode: 'raw',
                load: function () {
                    return getMenuTypeOptions();
                }
            },
            searchEnabled: false,
            valueExpr: 'text',
            displayExpr: 'value',
            showClearButton: false
        };
    }

    initMenuDataSource() {
        const self = this;
        this.menuDataSource = {
            load: function (loadOptions: any) {
                const promise = new Promise((resolve, reject) => {
                    self._menuService.getListAsync(self.menuData.name, self.menuData.type).subscribe((res: any) => {
                        resolve(res);
                    });
                });
                return promise;
            },
            reorder: function (draggingRowKey, targetRowKey) {
                const promise = new Promise((resolve, reject) => {
                    const input = new ReOrderInputDto();
                    input.sourceId = draggingRowKey;
                    input.targetId = targetRowKey;
                    self._menuService.reOrderAsync(input).subscribe((res: any) => {
                        resolve(res);
                    });
                });
                return promise;
            },
            key: 'id'
        };
    }

    reset() {
        this.menuData = {
            name: '',
            type: '',
            pageSize: 50,
            pageIndex: 0
        };

        this.search();
    }

    delete(menuId: number) {
        abp.message.confirm(
            'Are you sure to delete this menu? ' + this.menuData.name,
            isConfirmed => {
                if (isConfirmed) {
                    this._menuService.deleteAsync(menuId).subscribe(() => {
                        abp.notify.info('Deleted Successfully');
                        this.search();
                    });
                }
            }
        );
        
    }

    search() {
        if (this.menuDg && this.menuDg.instance) {
            this.menuDg.instance.refresh();
        }
    }

    onContentReady_MenuDataGrid(e) {
        this.menuData.pageIndex = e.component.pageIndex();
        this.menuData.pageSize = e.component.pageSize();

        storeState(this.menuData);

        this.initDragging(e);
    }

    onRowPrepared_MenuDataGrid(e) {
        if (e.rowType != 'data') { return; }

        $(e.rowElement).addClass('row-draggable').data('row-value', e.key);
    }

    initDragging(e) {
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
            drop: function (event, ui) {
                const draggingRowKey = ui.draggable.data('row-value');
                const targetRowKey = $(this).data('row-value');

                const dataSource = e.component.option('dataSource');

                dataSource.reorder(draggingRowKey, targetRowKey).then(() => {
                    self.menuDg.instance.refresh();
                });
            }
        });
    }
}
