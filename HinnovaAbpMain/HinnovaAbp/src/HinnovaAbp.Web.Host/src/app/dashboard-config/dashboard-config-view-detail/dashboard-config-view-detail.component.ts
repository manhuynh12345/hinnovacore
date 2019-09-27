import { Component, OnInit, Injector, HostListener } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import {
    DashboardConfigServiceProxy, DashboardItemDto, LayoutServiceProxy,
    DashboardItemServiceProxy, DashboardItemDisplay, LayoutConfigDto, DashboardDto, DashboardDetailDto, DashboardItemGroupDto
} from '@shared/service-proxies/service-proxies';
import { Router, ActivatedRoute } from '@angular/router';
import { AppComponentBase } from '@shared/app-component-base';
import { AbpSessionService } from '@abp/session/abp-session.service';
import { isNullOrUndefined } from 'util';
import { isEmpty } from 'rxjs/operators';

@Component({
    templateUrl: './dashboard-config-view-detail.component.html',
    styleUrls: ['./dashboard-config-view-detail.component.scss'],
    animations: [appModuleAnimation()]
})
export class DashboardConfigViewDetail extends AppComponentBase implements OnInit {

    layoutOptions: any;
    dashboardData: any;
    dashboardItemData: any;
    dashboardItemGroupOptions: any;
    value = {};
    recycle_icon = '<a title=\'refresh\' class=\'ui-icon ui-icon-refresh\'>refresh</a>';


    constructor(protected _dashboardConfigService: DashboardConfigServiceProxy,
        protected _layoutServiceProxy: LayoutServiceProxy,
        protected _dashboardItemServiceProxy: DashboardItemServiceProxy,
        protected router: Router,
        protected activeRoute: ActivatedRoute,
        protected injector: Injector,
        protected abpSession: AbpSessionService) {
        super(injector)
    }

    ngOnInit(): void { }

    selectFirstItemInLayoutOptions(source: any) { }

    loadExistedDashboardItemsToLayout() { }

    saveDashboard(dashboard: DashboardDto, dashboardDetail: Array<DashboardDetailDto>) { };

    @HostListener("window:scroll", [])
    onWindowScroll() {
        var window_top = $(window).scrollTop();
        var div_top = $('#sticky-anchor-top').offset().top;
        if (window_top > div_top) {
            $('#dashboardItem').addClass('sticky');
        } else {
            $('#dashboardItem').removeClass('sticky');
        }
    }

    save() {
        var dashboard = new DashboardDto();
        var dashboardDetail = new Array<DashboardDetailDto>();
        dashboard.name = this.dashboardData.name;
        dashboard.layoutId = this.dashboardData.layoutId;
        dashboard.userCreated = this.abpSession.userId;
        dashboard.isActive = true;
        dashboard.isDelete = false;
        dashboard.isPublish = true;
        for (const key in this.value) {
            if (this.value[key] != null) {
                var temp = new DashboardDetailDto();
                temp.contentId = this.value[key];
                temp.itemCode = key;
                dashboardDetail.push(temp)
            }
        }
        this.saveDashboard(dashboard, dashboardDetail)
    }

    loadLayout(layoutId: number) {
        const self = this;
        $('#container').empty();
        this._layoutServiceProxy.getListLayoutConfigAsync(layoutId).subscribe((layout: LayoutConfigDto[]) => {
            layout = layout.sort((a, b) => a.contentId - b.contentId);
            let rowIndex = layout[0].rowIndex;
            var html = ``;
            html += `<div class='row'>\n`;
            for (let i = 0; i < layout.length; i++) {
                if (layout[i].rowIndex == rowIndex) {
                    html += layout[i].htmlCode + '\n';
                } else if (layout[i].rowIndex !== rowIndex && i < layout.length) {
                    rowIndex = layout[i].rowIndex;
                    html += `</div>\n`;
                    html += `<div class='row'>\n`;
                    html += layout[i].htmlCode + '\n';
                }
                if (i == layout.length - 1) {
                    html += `</div>\n`;
                }
            }
            $('#container').append(html);

            for (let i = 0; i <= layout.length; i++) {
                $('#content_' + (i + 1)).addClass('ui-widget-content');
                $('#content_' + (i + 1)).addClass('ui-state-default');
                $('#content_' + (i + 1)).addClass('div-container');
                $('#content_' + (i + 1)).droppable({
                    accept: '#gallery > li',
                    classes: {
                        'ui-droppable-active': 'ui-state-highlight'
                    },
                    drop: function (event, ui) {
                        self.loadDashboardItemToLayout(ui.draggable, $('#content_' + (i + 1)));
                    }
                });
            }

            this.loadExistedDashboardItemsToLayout();
        });
    }

    resetDashboardItem($item) {
        const self = this;
        $item.fadeOut(function () {
            $item
                .find('a.ui-icon-refresh')
                .remove()
                .end()
                .css('width', '150px')
                .find('img')
                .css('height', '58px')
                .end()
                .appendTo($('#gallery'))
                .fadeIn();
            try {
                delete self.value[$item.attr('id')];
            } catch (e) {

            }
        });
    }

    loadDashboardItems() {
        const self = this;
        $('#gallery').empty();
        this._dashboardItemServiceProxy.getListDashboardItem('', 'ALL', this.dashboardItemData.itemGroup).subscribe((output: DashboardItemDisplay[]) => {
            for (let i = 0; i < output.length; i++) {
                if (Object.keys(this.value).length == 0) {
                    const string = '<li id="' + output[i]['itemCode'] + '" class="ui-widget-content ui-corner-tr">' +
                        ' <h5>' + output[i]['itemName'] + '</h5>' +
                        '</li>';
                    $('#gallery').append(string);
                } else {
                    if (Object.keys(this.value).indexOf(output[i]['itemCode']) == -1) {
                        const string = '<li id="' + output[i]['itemCode'] + '" class="ui-widget-content ui-corner-tr">' +
                            ' <h5>' + output[i]['itemName'] + '</h5>' +
                            '</li>';
                        $('#gallery').append(string);
                    }
                }
            }
            setTimeout(() => {
                $('li', $('#gallery')).draggable({
                    cancel: 'a.ui-icon', // clicking an icon won't initiate dragging
                    revert: 'invalid', // when not dropped, the item will revert back to its initial position
                    containment: 'document',
                    helper: 'clone',
                    cursor: 'move'
                });
                // Let the gallery be droppable as well, accepting items from the trash
                $('#gallery').droppable({
                    accept: 'li',
                    classes: {
                        'ui-droppable-active': 'custom-state-active'
                    },
                    drop: function (event, ui) {
                        self.resetDashboardItem(ui.draggable);
                    }
                });
                // Resolve the icons behavior with event delegation
                $('ul.gallery > li').on('click', function (event) {
                    const $item = $(this),
                        $target = $(event.target);
                    if ($target.is('a.ui-icon-trash')) {
                        self.loadDashboardItemToLayout($item);
                    } else if ($target.is('a.ui-icon-refresh')) {
                        self.resetDashboardItem($item);
                    }
                    return false;
                });
            }, 500);

        });

    }

    loadDashboardItemToLayout($item, $containerTemp?) {
        const self = this;
        $item.fadeOut(function () {
            const $list = $('ul', $containerTemp).length ?
                $('ul', $containerTemp) :
                $('<ul class=\'gallery ui-helper-reset\'/>').appendTo($containerTemp);
            $item.append(self.recycle_icon).appendTo($list).fadeIn(function () {
                $item.animate({
                    width: $containerTemp.width(),
                    height: '65px'
                });
            });
            self.value[$item.attr('id')] = $containerTemp.attr('id');
        });
    }

    initDashboardGroupComponentOptions(){
        const self = this;
        this.dashboardItemGroupOptions = {
            dataSource: {
                loadMode: 'raw',
                load: function () {
                    const promise = new Promise((resolve, reject) => {
                        self._dashboardItemServiceProxy.getItemGroup().subscribe(res => {
                            const temp = new DashboardItemGroupDto();
                            temp.code = "ALL"
                            temp.name = "Tất cả"
                            temp.isActive = true
                            temp.isDelete = false
                            res.unshift(temp);
                            resolve(res);
                        });
                    });
                    return promise;
                }
            },
            valueExpr: 'code',
            displayExpr: 'name',
            value: 'ALL',
            onValueChanged: function (event) {
                self.loadDashboardItems();
            }
        };
    }

    initLayoutComponentOptions() {
        const self = this;
        var source = {
            loadMode: 'raw',
            load: function () {
                const promise = new Promise((resolve, reject) => {
                    self._layoutServiceProxy.getListAsync().subscribe(res => {
                        resolve(res);
                    });
                });
                return promise;
            }
        };
        this.layoutOptions = {
            dataSource: source,
            valueExpr: 'id',
            displayExpr: 'name',
            onValueChanged: function (event) {
                self.loadDashboardItems();
                self.loadLayout(event.value);
            }
        };
        this.selectFirstItemInLayoutOptions(source);
    }


}
