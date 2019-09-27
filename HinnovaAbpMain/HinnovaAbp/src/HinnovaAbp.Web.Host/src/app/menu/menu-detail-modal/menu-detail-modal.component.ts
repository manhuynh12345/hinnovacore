import { DynamicValue } from './../../../shared/service-proxies/service-proxies';
import { Component, ViewChild, OnInit, EventEmitter, Output, SecurityContext } from '@angular/core';
import { Guid, getMenuTypeOptions } from '@shared/app-component-base';
import { appModuleAnimation, accountModuleAnimation } from '@shared/animations/routerTransition';
import { MenuServiceProxy, CreateMenuInput, DynamicFieldServiceProxy } from '@shared/service-proxies/service-proxies';

import { ModalDirective } from 'ngx-bootstrap';
import { finalize } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';
import 'devextreme/integration/jquery';
import * as $ from 'jquery';
import { DynamicModuleComponent } from '@app/dynamicModule/dynamicModule.component';
// import { EscapeHtmlPipe } from './pipes/keep-html.pipe';

@Component({
    selector: 'menuDetailModal',
    templateUrl: './menu-detail-modal.component.html',
    animations: [appModuleAnimation()]
})
export class MenuDetailModalComponent implements OnInit {
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    @ViewChild('modal') modal: ModalDirective;
    @ViewChild(DynamicModuleComponent) dynamicModule: DynamicModuleComponent;

    active: boolean = false;
    saving: boolean = false;

    menuData: any;
    menuTypeOptions: any;
    parentOptions: any;
    permissionOptions: any;
    menuIndexOptions: any;
    //currentId: string;
    currentId: number;
    error = true;
    link : any = "/app/menu";
    parameters : any = "3,4";
    constructor(private _menuService: MenuServiceProxy,
                private _dynamicFieldService: DynamicFieldServiceProxy,
                private _sanitizer: DomSanitizer) {
        this.menuData = new CreateMenuInput();
    }

    ngOnInit() {
        this.initMenuTypeOptions();
        this.initMenuParentOptions();
        this.initPermissionOptions();     
    }

    show(): void {
        this.active = true;
        //this.currentId = Guid.empty();
        this.currentId = 0;
        this.menuData = new CreateMenuInput();
        this.modal.show();
    }

    detail(menuId: number): void {
        this.active = true;
        this._menuService.getDetailAsync(menuId).subscribe(res => {
            console.log(res)
            this.menuData = res;
            this.currentId = this.menuData.id;           
            this.initMenuIndexOptions();           
            this.dynamicModule.loadDynamicField(this.menuData.id);           
        });
        this.modal.show();
    }

    onShown(): void {
        
    }

    save(): void {
        //if (this.currentId != Guid.empty()) {
        if (this.currentId != 0) {
            this.update();
        } else {
            this.create();
        }
    }

    create(): void {
        this.saving = true;
        if (this.menuData.parent === null) this.menuData.parent = 0;
        this._menuService.createAsync(this.menuData)
            .pipe(finalize(() => this.saving = false))
            .subscribe(() => {
                abp.notify.info("Saved successfully");
                this.dynamicModule.saveDynamicValue();
                this.close();
                this.modalSave.emit(this.menuData);
            });
        this.saving = false;
    }

    update(): void {
        this.saving = true;
        if (this.menuData.parent === null) this.menuData.parent = 0;
        this._menuService.updateAsync(this.menuData)
            .pipe(finalize(() => this.saving = false))
            .subscribe(() => {
                abp.notify.info("Saved successfully");
                this.dynamicModule.saveDynamicValue();
                this.close();
                this.modalSave.emit(this.menuData);
            });
        this.saving = false;
    }

    close(): void {
        this.modal.hide();
        this.active = false;
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

    initMenuParentOptions() {
        const self = this;
        this.parentOptions = {
            dataSource: {
                loadMode: 'raw',
                load: function () {
                    const promise = new Promise((resolve, reject) => {
                        self._menuService.getAllActiveAsync().subscribe(res => {
                            resolve(res);
                        });
                    });
                    return promise;
                },
            },
            searchEnabled: true,
            valueExpr: 'id',
            displayExpr: 'name',
            showClearButton: true
        };
    }

    initPermissionOptions() {
        const self = this;
        this.permissionOptions = {
            dataSource: {
                loadMode: 'raw',
                load: function () {
                    const promise = new Promise((resolve, reject) => {
                        self._menuService.getRootPermissionsAsync().subscribe(res => {
                            resolve(res);
                        });
                    });
                    return promise;
                }
            },
            searchEnabled: true,
            valueExpr: 'name',
            displayExpr: 'displayName',
            showClearButton: true
        };
    }

    initMenuIndexOptions() {
        const self = this;
        console.log(self.currentId)
        this.menuIndexOptions = {
            dataSource: {
                loadMode: 'raw',
                load: function () {
                    const promise = new Promise((resolve, reject) => {
                        self._menuService.getAllIndicesAsync().subscribe(res => {
                            resolve(res);
                        });
                    });
                    return promise;
                },
                byKey: function (key, extra) {
                    const promise = new Promise((resolve, reject) => {
                        self._menuService.getIndexByIdAsync(self.currentId, key).subscribe((res: any) => {
                            resolve(res);
                        });
                    });
                    return promise;
                },
            },
            searchEnabled: true,
            valueExpr: 'id',
            displayExpr: 'name',
            acceptCustomValue: true,
            onInitialized: function (e) {
                if (self.menuData.index === -1 && e.component.option('value') === -1) {
                    const dataSource = e.component.option('dataSource');
                    const loadPromise = dataSource.load();
                    loadPromise.then(function (results: any[]) {
                        self.menuData.index = results[0].id + 1;
                    });
                }
            }
        };
    }



}
