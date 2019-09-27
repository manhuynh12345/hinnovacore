import { Component, Injector, ViewChild, OnInit, HostListener } from '@angular/core';
import { AppComponentBase, storeState, retrieveState, Guid, getMenuTypeOptions } from '@shared/app-component-base';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { DashboardServiceProxy, DashboardConfigServiceProxy, DashboardDto } from '@shared/service-proxies/service-proxies';
import { DxPopupModule, DxButtonModule, DxTemplateModule } from 'devextreme-angular';

import {
    DomSanitizer
} from '@angular/platform-browser';
import {
    Router, ActivatedRoute
} from '@angular/router';
import { isNullOrUndefined } from 'util';
import Swal from 'sweetalert2';
import { formatNumber } from './jslibraries';
import { ModalDirective } from 'ngx-bootstrap';
@Component({
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    animations: [appModuleAnimation()]
})
export class DashboardComponent extends AppComponentBase implements OnInit{
    content: HTMLDivElement;
    @ViewChild('content_1') content1: any;
    @ViewChild('content_5') content5: any;
    @ViewChild('modal') modal: ModalDirective;
    loadAPI: Promise<any>;
    backUrl: string;

    dashboardData: any;
    dashboardOptions: any;
    popupVisible = false;
    moduleId = 0;

    constructor(
        injector: Injector,
        private _dashboardService: DashboardServiceProxy,
        private sanitizer: DomSanitizer,
        private router: Router,
        private _dashboardConfigService: DashboardConfigServiceProxy,
        private activeRoute: ActivatedRoute
    ) {
        super(injector);
        this.dashboardData = retrieveState() || {
            id: 0
        };
    }

    html: any;
    dashboard: any;
    temp_dataSource: any;

    isAccept(id, close) {
        localStorage.setItem('dashboardID', id);
        close(true);

    }

    ngOnInit() {
        window.addEventListener('resize', function () {
            const screen_width = window.screen.availWidth;
            if (screen_width <= 1024) {
                $('.category').css('font-size', '10px');
            } else if (screen_width > 1024 && screen_width <= 1280) {
                $('.category').css('font-size', '11px');
            } else if (screen_width > 1280 && screen_width <= 1366) {
                $('.category').css('font-size', '15px');
            } else if (screen_width > 1366 && screen_width <= 1600) {
                $('.category').css('font-size', '16px');
            } else {
                $('.category').css('font-size', '20px');
            }
        }, false);
    }

    ngAfterViewInit() {
        const self = this;
        document.getElementById('content').style.backgroundColor = '#6997DB';
        document.getElementById('content').style.overflow = 'hidden';
        document.getElementById('content').style.height = '30em';
        var str = window.location.pathname;
        self._dashboardService.getCurrentModule(str).subscribe((res:any)=>{
            self.moduleId = res;

            this._dashboardService.getPrivateDashboardLayoutAsync(self.moduleId).subscribe((res: any) => {
                if (res.success && isNullOrUndefined(res.dashboard)) {
                    Swal.fire({
                        title: 'Dashboard chưa được cấu hình',
                        text: 'Bạn có muốn cấu hình dashboard ngay bây giờ?',
                        type: 'info',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Có!',
                        cancelButtonText: 'Không!',
                        confirmButtonClass: 'btn btn-success',
                        cancelButtonClass: 'btn btn-danger',
                        buttonsStyling: false,
                        reverseButtons: true
                    }).then((result) => {
                        if (result.value) {
                            self._dashboardService.createPrivateDashboardAsync().subscribe((res: any) => {
                                if (res.isSucceeded) {
                                    self.router.navigate(['/pages/dashboard-config/dashboard-config-view-detail/' + res.data]);
                                } else {
                                    toastr.error("Thất bại!", "Lỗi", {
                                        timeOut: 3000,
                                        positionClass: 'toast-top-right',
                                        preventDuplicates: true,
                                    });
                                }
                            });
                        } else if (
                            // Read more about handling dismissals
                            result.dismiss === Swal.DismissReason.cancel
                        ) {
                            // swal(
                            //   'Đã hủy',
                            //   'Hủy việc cấu hình',
                            //   'error'
                            // );
                        }
                    });
                } else if (res.success && res.dashboard.length > 0 && res.layout.length > 0) {
                    self.dashboard = res.dashboard;
                    const dashboard = res.dashboard;
                    const layout = res.layout;
                    let rowIndex = layout[0].rowIndex;
                    this.html = ``;
                    this.html += `<div class='row'>\n`;
                    for (let i = 0; i < layout.length; i++) {
                        if (layout[i].rowIndex == rowIndex) {
                            this.html += layout[i].htmlCode + '\n';
                        } else if (layout[i].rowIndex !== rowIndex && i < layout.length) {
                            rowIndex = layout[i].rowIndex;
                            this.html += `</div>\n`;
                            this.html += `<div class='row'>\n`;
                            this.html += layout[i].htmlCode + '\n';
                        }
                        if (i == layout.length - 1) {
                            this.html += `</div>\n`;
                        }
                    }
                    this.html = this.sanitizer.bypassSecurityTrustHtml(this.html);
                    setTimeout(function () {
                        self.parseItem(self.dashboard);
                    }, 1000);
                }
            });
        })
    }

    getDataSourceFromStore(store) {
        return this._dashboardService.getDashboardLayoutAsync(store).subscribe((res: any) => {
            if(res.code == "ERR"){
                toastr.error(res.message, "Lỗi", {
                    timeOut: 3000,
                    positionClass: 'toast-top-right',
                    preventDuplicates: true,
                });
            }
            return res;
        });
        // this.service.getDataFromStore(store).then(data => return data;);
    }

    convertDataSource(dataSource, argumentField) {
        Object.keys(dataSource).forEach(function (index) {
            Object.keys(dataSource[index]).forEach(function (key) {
                if (key != argumentField) {
                    dataSource[index][key] = parseInt(dataSource[index][key], 10);
                }
            });
        });
        return dataSource;
    }

    parseItem(dashboard) {
        const self = this;

        for (let i = 0; i < self.dashboard.length; i++) {
            const item = self.dashboard[i];
            this._dashboardService.getItem(item.itemCode).subscribe((res: any) => {
                if (res.isSucceeded) {
                    const itemX = res.data;
                    let series = [];
                    // let dataSource = itemX.storeProcedure !== null ? self.getDataSourceFromStore(itemX.storeProcedure) : self.temp_dataSource[i]; // this.getDataSourceFromStore(item.storeProcedure);
                    self._dashboardService.getDashboardLayoutAsync(itemX.storeProcedure).subscribe(data => {
                        if(data.code == "ERR"){
                            toastr.error(data.message, "Lỗi", {
                                timeOut: 3000,
                                positionClass: 'toast-top-right',
                                preventDuplicates: true,
                            });
                        }else{
                            let dataSource = data;
                            if (itemX.itemType == 'BASIC') {
                                self.implementBasicItem(self.dashboard[i].contentId, itemX.boxHeaderIcon, itemX.boxColor, itemX.boxContent, dataSource.data, itemX.boxFooterIcon, itemX.boxDetailText, itemX.boxUrl);
                            } else if (itemX.itemType == 'MULSIP') {
                                self.implementMultiSimpleItem(self.dashboard[i].contentId, itemX.boxHeaderText, itemX.boxContent, dataSource.data, itemX.boxDetailText, itemX.boxUrl);
                            } else if (itemX.itemType == 'CRT' && itemX.chartType == 'bar') {
                                dataSource = self.convertDataSource(dataSource, itemX.chartArgumentField);
                                const t_valueField = itemX.chartValueField.split(';');
                                const t_name = itemX.chartLabelName.split(';');
                                for (let x = 0; x < t_valueField.length; x++) {
                                    if (t_valueField[x] !== '') {
                                        const t_item = {
                                            valueField: t_valueField[x],
                                            name: t_name[x]
                                        };
                                        series.push(t_item);
                                    }
                                }
                                self.implementBarChart('#' + self.dashboard[i].contentId, dataSource.data, itemX.chartPalette, series, itemX.chartTitle, itemX.chartArgumentField, itemX.chartType);
                            } else if (itemX.itemType == 'CRT' && itemX.chartType == 'stackedBar') {
                                dataSource = self.convertDataSource(dataSource, itemX.chartArgumentField);
                                const t_valueField = itemX.chartValueField.split(';');
                                const t_name = itemX.chartLabelName.split(';');
                                const t_stack = itemX.chartStackedColumnName.split(';');
                                for (let x = 0; x < t_valueField.length; x++) {
                                    if (t_valueField[x] !== '') {
                                        const t_item = {
                                            valueField: t_valueField[x],
                                            name: t_name[x],
                                            stack: t_stack[x]
                                        };
                                        series.push(t_item);
                                    }
                                }
                                self.implementBarChart('#' + self.dashboard[i].contentId, dataSource.data, itemX.chartPalette, series, itemX.chartTitle, itemX.chartArgumentField, itemX.chartType);
                            } else if (itemX.itemType == 'CRT' && itemX.chartType == 'pie') {
                                series = [{
                                    argumentField: itemX.chartArgumentField,
                                    valueField: itemX.chartValueField,
                                    label: {
                                        visible: true,
                                        connector: {
                                            visible: true,
                                            width: 1
                                        },
                                        format: {
                                            formatter: function (value) {
                                                return formatNumber(value);
                                            }
                                        }
                                    }
                                }];
                                self.implementCircleChart('#' + self.dashboard[i].contentId, dataSource.data, itemX.chartPalette, series, itemX.chartTitle, itemX.chartType);
                            } else if (itemX.itemType == 'DT') {
                                self.implementDataTable(self.dashboard[i].contentId, itemX, dataSource.data);
                            }
                        }
                    });
                }
                document.getElementById('content').style.backgroundColor = 'white';
                document.getElementById('content').style.height = 'initial';
                const screen_width = window.screen.availWidth;
                if (screen_width <= 1024) {
                    $('.category').css('font-size', '10px');
                } else if (screen_width > 1024 && screen_width <= 1280) {
                    $('.category').css('font-size', '11px');
                } else if (screen_width > 1280 && screen_width <= 1366) {
                    $('.category').css('font-size', '13px');
                } else if (screen_width > 1366 && screen_width <= 1600) {
                    $('.category').css('font-size', '16px');
                } else {
                    $('.category').css('font-size', '20px');
                }
            });
        }
    }

    implementBasicItem(dom, headerIcon, color, content, value, footerIcon, detailText, url) {
        const html = `<div class="card-component card-stats" style="height:149px">
                        <div class="card-header" data-background-color=` + color + `>
                            <i class="material-icons">` + headerIcon + `</i>
                        </div>
                        <div class="card-content">
                            <p class="category">` + content + `</p>
                            <h3 class="title">` + value[0].value_1 + `
                            </h3>
                        </div>
                        <div class="card-footer" style="
                        bottom: 0;
                        position: absolute;
                        width: 88%;">
                            <div class="stats">
                                <i [ngClass]=` + footerIcon + `></i>
                                <a href=` + url + ` dashboard-link>` + detailText + `</a>
                            </div>
                        </div>
                    </div>`;
        $('#' + dom).css('height', '206px');
        const box = document.getElementById(dom);
        box.innerHTML = html;

    }
    implementTitleItem(dom, content) {
        const html = `<div class="card-component" style="margin-bottom: 0px">
                    <div style="padding:10px; font-weight: bold">` + content + `
                    </div>`;
        const box = document.getElementById(dom);
        box.innerHTML = html;

    }
    implementSimpleItem(dom, content, value, detailText, url) {
        const html =    `<div class="card-component card-stats">
                        <div class="card-content">
                            <p class="category">` + content + `</p>
                            <h3 class="title">` + value + `
                            </h3>
                        </div>
                        <div class="card-footer">
                            <div class="stats">
                                <a [href]=` + url + `>` + detailText + `</a>
                            </div>
                        </div>
                        </div>`;

        const box = document.getElementById(dom);
        box.innerHTML = html;

    }
    implementMultiSimpleItem(dom, header, content, value, detailText, url) {
        let html = ``;
        const contents = content.split(';');
        // Doc ds va tach rieng
        // const values = value.split(';');
        const values = ['1', '1', '1'];
        const detailTexts = detailText.split(';');
        const urls = url.split(';');
        const itemCount = contents.length;
        html += `<div class="card-component card-stats"> \n`;
        html += `<div style="text-align:center"> <p style="font-weight:bold;
                    background: lightblue;
                    margin-bottom:  0;
                    padding: 5px;"> ` + header + `</p> </div> \n`;
        html += `<div class='row'> \n`;
        for (let i = 0; i < itemCount; i++) {
            html += `<div class='col-12 col-md-` + Math.round(12 / itemCount) + `' >\n`;
            html += `
                <div class="card-content">
                    <p class="category">` + contents[i] + `</p>
                    <h3 class="title">` + values[i] + `</h3>
                </div>
                <div class="card-footer">
                    <div class="stats">
                        <a [href]=` + urls[i] + `>` + detailTexts[i] + `</a>
                    </div>
                </div>`;
            html += `</div>`;
        }
        html += `</div> \n`;
        html += `</div> \n`;
        const box = document.getElementById(dom);
        box.innerHTML = html;

    }
    implementCircleChart(dom, dataSource, palette, series, title, type) {
        let options;
        // for (let i = 0; i < dataSource.length; i++) {
        //   dataSource[i][series[0].valueField] = formatNumber(dataSource[i][series[0].valueField]);
        // }
        const self = this;
        options = {
            type: type,

            palette: ['#70ed7d', '#7cb5ec', '#F57C00'],
            dataSource: dataSource,
            series: series,
            title: title,
            legend: {
                verticalAlignment: 'bottom',
                horizontalAlignment: 'center',
                itemTextPosition: 'right',
                columnCount: 1,
                rowCount: 3
            }
        };
        // this.content = <HTMLDivElement>this.content1.nativeElement;
        // jQuery(this.content).dxPieChart(options);
        $(dom).parent().css('border', '1px solid');
        $(dom).dxPieChart(options);

    }
    implementBarChart(dom, dataSource, palette, series, title, argumentField, type) {
        let options;
        options = {
            palette: ['#F57C00', '#7cb5ec', '#70ed7d'],
            dataSource: dataSource,
            customizePoint: function () {
                if (this.value < 0) {
                    return { color: '#8c8cff', hoverStyle: { color: '#8c8cff' } };
                }
            },
            commonSeriesSettings: {
                argumentField: argumentField,
                type: type,
                hoverMode: 'allArgumentPoints',
                selectionMode: 'allArgumentPoints',
                label: {
                    visible: false,
                    format: {
                        type: 'fixedPoint',
                        precision: 0
                    }
                }
            },
            argumentAxis: {
                label: { overlappingBehavior: 'rotate', rotationAngle: -45 }
            },
            series: series,
            title: title,
            legend: {
                verticalAlignment: 'bottom',
                horizontalAlignment: 'center',
                itemTextPosition: 'right',
            }
        };
        if (type == 'stackedBar') {
            options.legend['rowCount'] = 3;
        }
        // this.chart.series = series;
        // this.content = <HTMLDivElement>this.content1.nativeElement;
        // jQuery(this.content).dxChart(options);
        $(dom).parent().css('border', '1px solid');
        $(dom).dxChart(options);

    }

    @HostListener('click', ['$event'])
    onClick($event) {
        const href = $($event.target).attr('href');
        if (href && $($event.target).is('[dashboard-link]')) {
            $event.preventDefault();

            let params = {};

            if ($($event.target).attr('query-params')) {
                params = JSON.parse($($event.target).attr('query-params'));
            } else if (href.match(/(\?[\w=&]*)/g) && href.match(/(\?[\w=&]*)/g).length > 0) {
                params = this.queryParamToJson(href.match(/(\?[\w=&]*)/g)[0]);
            }

            params['backUrl'] = this.router.url;

            this.router.navigate([href.split('?')[0]], { queryParams: params });
        }
    }

    queryParamToJson(queryParams: string) {
        const params = queryParams.slice(1).split('&');
        const result: any = {};
        params.forEach(p => {
            const sp = p.trim().split('=');
            result[sp[0]] = sp[1];
        });

        return result;
    }

    implementDataTable(dom, data, dataSource) {
        if (!data.columnBuilder) {
            return;
        }

        const columnConfigs = JSON.parse(data.columnBuilder);

        const bindColumns = [];

        const columns = [];
        if (columnConfigs) {
            columnConfigs.forEach(col => {
                const column = {
                    dataField: col.dataField,
                    caption: col.caption,
                    dataType: col['dataType'] || 'string',
                    width: col['width'] || '*'
                };

                // Create link template
                if (col.customType === 1) {
                    column['cellTemplate'] = (container, options) => {
                        const queryParams = {};
                        if (col.params && options.data) {
                            col.params.forEach(param => {
                                queryParams[param.key] = options.data[param.value] || param.value;
                            });
                        }

                        $(`<a href='` + col.link + `' dashboard-link query-params='` + JSON.stringify(queryParams) + `'>` + options.value + `</a>`).appendTo(container);
                    };
                }


                columns.push(column);
            });
        }

        bindColumns.push({
            caption: data.itemName.toUpperCase(),
            columns: columns
        });

        $('#' + dom).css('margin', '10px 0');
        $('#' + dom).dxDataGrid({
            dataSource: dataSource,
            showRowLines: true,
            showBorders: true,
            rowAlternationEnabled: true,
            wordWrapEnabled: true,
            columns: bindColumns
        });
    }

    config() {
        const self = this;
        this._dashboardService.getCurrentDashboardAsync().subscribe((res: any) => {
            if (res.isSucceeded) {
                self.router.navigate(['/app/dashboard-config/dashboard-config-view-detail/' + res.data]);
            } else {
                toastr.error("Thất bại!", "Lỗi", {
                    timeOut: 3000,
                    positionClass: 'toast-top-right',
                    preventDuplicates: true,
                });
            }
        });
    }

    show(): void {
        this.initDashboardOptions();
        this.dashboardData = retrieveState() || {
            id: 0
        };
        this.modal.show();
    }
    onShown(): void {

    }
    initDashboardOptions() {
        const self = this;
        this.dashboardOptions = {
            dataSource: {
                loadMode: 'raw',
                load: function () {
                    const promise = new Promise((resolve, reject) => {
                        self._dashboardConfigService.getListDashboardByName("").subscribe(res => {
                            resolve(res);
                        });
                    });
                    return promise;
                }
            },
            searchEnabled: false,
            valueExpr: 'id',
            displayExpr: 'name',
            showClearButton: false
        };
    }

    showInfo() {
        this.initDashboardOptions();
        this.popupVisible = true;
    }

    save(){
        const self = this;
        // this.activeRoute.params.subscribe(params => {
        //     var rs = window.location.pathname;
        // });
        //alert("" + self.dashboardData.id);
        self._dashboardService.updateCurrentDashboard(self.moduleId, self.dashboardData.id).subscribe((res=>{
            this.popupVisible = false;
            this.ngAfterViewInit();
        }))
    }
}