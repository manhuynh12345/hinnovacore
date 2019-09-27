import {Component, Inject, ViewChild, OnInit, Injector, ViewEncapsulation} from '@angular/core';
import {AppComponentBase, storeState, retrieveState } from '@shared/app-component-base';
import {appModuleAnimation} from '@shared/animations/routerTransition';
import {DxDataGridComponent} from 'devextreme-angular';
import {LayoutServiceProxy, LayoutDto, CreateLayoutDto, LayoutConfigDto, SaveLayoutConfig} from '@shared/service-proxies/service-proxies';
import { Router, ActivatedRoute } from '@angular/router';
import { Ng2SmartTableModule, LocalDataSource } from 'ng2-smart-table';
import { isNullOrUndefined } from 'util';

@Component({
    templateUrl: './dashboard-layout-detail-modal.component.html',
    styleUrls: ['./dashboard-layout-detail-modal.component.scss'],
    animations: [appModuleAnimation()],
    encapsulation: ViewEncapsulation.None
})

export class DashboardLayoutDetailComponent extends AppComponentBase implements OnInit{
    currentId: any;
    canvas: any;
    self: any;
    name: string;
    settings = {
    add: {
      addButtonContent: '<i class="mdi mdi-library-plus">Thêm mới</i>',
      createButtonContent: '<i class="mdi mdi-check"></i>',
      cancelButtonContent: '<i class="mdi mdi-close"></i>',
      confirmCreate: true
    },
    edit: {
      editButtonContent: '<i class="mdi mdi-pencil"></i>',
      saveButtonContent: '<i class="mdi mdi-check"></i>',
      cancelButtonContent: '<i class="mdi mdi-close"></i>',
      confirmSave: true
    },
    delete: {
      deleteButtonContent: '<i class="mdi mdi-delete"></i>',
      confirmDelete: true,
    },
    mode: 'inline',
    filter: false,
    sortDirection: 'asc',
    columns: {
      id: {
        title: 'STT',
        type: 'number',
        editable: false,
        sort: true,
        sortOrder: 'asc'
      },
      numCol: {
        title: 'Số cột',
        type: 'number',
      },
      ratio: {
        title: 'Tỉ lệ',
        type: 'string',
      }
    }
  };
  dashboardLayoutDetailData: any;
  dataSourceUpdate: LayoutDto;
  source: LocalDataSource;
  dashboardLayoutDetailDataSource = [
    // ... our data here
  ];

  constructor(
    injector: Injector,
    private _dashboardLayoutService : LayoutServiceProxy,
    private router: Router,
    private activeRoute: ActivatedRoute
    ){
      super(injector);
      this.dashboardLayoutDetailData = retrieveState() || {
          name: '',
          code: '',
          pageSize: 50,
          pageIndex: 0,
          sortOrder: 'createddate_desc'
      }
      this.source = new LocalDataSource(this.dashboardLayoutDetailDataSource);
      const self = this;
      this.activeRoute.params.subscribe(params => {
        this.currentId = params['id'];
        if (this.currentId !== 'null-value') {
          this._dashboardLayoutService.getListLayoutConfigAsync(this.currentId).subscribe(data => {
            const _source = [];
            const rowIndex = [];
            for (let i = 0; i < data.length; i++) {
              //if (!rowIndex.includes(data[i].rowIndex)) {
              if (rowIndex.indexOf(data[i].rowIndex) == -1) {
                rowIndex.push(data[i].rowIndex);
              }
            }
            let colCount = 0;
            let ratio = '';
            let index = 1;
            for (let k = 0; k < rowIndex.length; k++) {
              for (let i = 0; i < data.length; i++) {
                if (data[i].rowIndex === rowIndex[k]) {
                  colCount++;
                  if (ratio === '') {
                    ratio = data[i].ratio.toString();
                  } else {
                    ratio += ':' + data[i].ratio;
                  }
                }
                if (i === data.length - 1) {
                  const obj = new Object();
                  obj['numCol'] = colCount;
                  obj['ratio'] = ratio;
                  obj['id'] = index;
                  _source.push(obj);
                  colCount = 0;
                  ratio = '';
                  index += 1;
                }
              }
            }
            this.source.load(_source);
            this.draw(_source);
        });
        this._dashboardLayoutService.getDetailAsync(this.currentId).subscribe(res => {
          this.dataSourceUpdate = res;
          this.name = res.name;
        });
      }
        
      });
    }

  ngOnInit() {
    this.canvas = document.getElementById('preview');
    const self = this;
    window.addEventListener('resize', function () {
      const container = document.getElementById('canvas');
      self.canvas.width = container.offsetWidth;
      self.canvas.height = container.offsetHeight;
      self.draw(self.source);
    }, false);
    this.resizeCanvas();
    //this.name = "Tào lao";
  }

  btnBackClick() {
    this.router.navigate(['/app/dashboard-layout']);
  }

  //Xóa 1 dòng trong Table ng-2-smart-table
  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
      const tmp = event.source.data.slice(0);
      for (let i = 0; i < tmp.length; i++) {
        if (tmp[i].id === event.data.id) {
          tmp.splice(i, 1);
        }
      }
      this.dashboardLayoutDetailDataSource = tmp;
      this.draw(tmp);
    } else {
      event.confirm.reject();
    }
  }
  //Chỉnh sửa dữ liệu trong Table ng-2-smart-table
  onEditConfirm(event): void {
    if (parseInt(event.newData.numCol, 10) !== (event.newData.ratio.split(':').length)) {
      toastr.error("Số cột phải bằng số tỉ lệ", "Lỗi", {
        timeOut: 3000,
        positionClass: 'toast-top-right',
        preventDuplicates: true,
      });
    } else if (event.newData.numCol > 4) {
      toastr.error("Để tối ưu hiển thị, số cột nên nhỏ hơn hoặc bằng 4", "Lỗi", {
        timeOut: 3000,
        positionClass: 'toast-top-right',
        preventDuplicates: true,
      });
    } else {
      const listRatio = event.newData.ratio.split(':');
      for (let i = 0; i < listRatio; i++) {
        if (isNaN(parseInt(listRatio[i], 10))) {
          toastr.error("Tỉ lệ phải là số", "Lỗi", {
            timeOut: 3000,
            positionClass: 'toast-top-right',
            preventDuplicates: true,
          });
        }
      }
      event.confirm.resolve(event.newData);
      //var tmp = Object.assign(event.source.data);
      const tmp = event.source.data.slice(0);
      for (let i = 0; i < tmp.length; i++) {
        if (tmp[i].id === event.newData.id) {
          tmp[i] = event.newData;
        }
      }
      this.dashboardLayoutDetailDataSource = tmp;
      this.draw(tmp);
    }
  }
  //Tạo mới dữ liệu trong Table ng-2-smart-table
  onCreateConfirm(event): void {
    if (parseInt(event.newData.numCol, 10) !== (event.newData.ratio.split(':').length)) {
      toastr.error("Số cột phải bằng tỉ lệ", "Lỗi", {
        timeOut: 3000,
        positionClass: 'toast-top-right',
        preventDuplicates: true,
      });
    } else if (event.newData.numCol > 4) {
      toastr.error("Để tối ưu hiển thị, số cột nên nhỏ hơn hoặc bằng 4", "Lỗi", {
        timeOut: 3000,
        positionClass: 'toast-top-right',
        preventDuplicates: true,
      });
    } else {
      const listRatio = event.newData.ratio.split(':');
      for (let i = 0; i < listRatio; i++) {
        if (isNaN(parseInt(listRatio[i], 10))) {
          toastr.error("Tỉ lệ phải là số", "Lỗi", {
            timeOut: 3000,
            positionClass: 'toast-top-right',
            preventDuplicates: true,
          });
        }
      }
      if (event.source.data.length === 0) {
        event.newData.id = '1';
      } else {
        //event.newData.id = (parseInt(event.source.data[0].id, 10) + 1).toString();
        var _max = 0;
        for(var i = 0; i < event.source.data.length; i++){
          if(event.source.data[i].id > _max)
            _max = event.source.data[i].id;
        }
        event.newData.id = (_max + 1);
      }

      // var tmp = Object.assign({},event.source.data);
      const tmp = event.source.data.slice(0);

      // var tmp = event.source.data;
      // const newData = Object.assign({}, event.newData);

      //tmp.unshift(event.newData);
      tmp.push(event.newData);
      this.dashboardLayoutDetailDataSource = tmp;
      this.draw(tmp);
      event.confirm.resolve(event.newData);
    }
  }

  resizeCanvas() {
    const container = document.getElementById('canvas');

    this.canvas.width = container.offsetWidth;
    this.canvas.height = container.offsetHeight;
    this.draw(this.source);
  }
  draw(_source: any) {
    let data: any;
    try {
      if((_source.length != undefined && _source.length > 0 && (parseInt(_source[0].id) == 1 || jQuery.type(_source[0].id) === "string") )
      || (_source.data != undefined && _source.data.length > 0 && (parseInt(_source.data[0].id) == 1|| jQuery.type(_source[0].id) === "string")))
        data = _source;
      else
        data = _source.reverse();
    } catch (e) {
      data = _source.data.slice(0);
      data = data.reverse();
    }
    const ctx = this.canvas.getContext('2d');
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    let totalRowPart = 0;
    for (let i = 0; i < data.length; i++) {
      totalRowPart += 1;
    }
    const onePart = parseFloat(this.canvas.height) / totalRowPart;
    let lastPosition = 0;
    for (let i = 0; i < data.length; i++) {
      ctx.beginPath();
      ctx.moveTo(0, onePart * (1) + lastPosition);
      ctx.lineTo(this.canvas.width, onePart * (1) + lastPosition);
      ctx.stroke();
      lastPosition = onePart * (1) + lastPosition;
      const col = data[i].ratio.toString().indexOf(':') > 0 ? data[i].ratio.toString().split(':') : data[i].ratio;
      let lastColPosition = 0;
      let totalCol = 0;

      for (let j = 0; j < col.length; j++) {
        totalCol += parseInt(col[j], 10);
      }
      if (totalCol == 0) {
        totalCol = 1;
      }
      const oneCol = parseFloat(this.canvas.width) / totalCol;
      for (let j = 0; j < col.length; j++) {
        ctx.moveTo(oneCol * parseInt(col[j], 10) + lastColPosition, lastPosition - onePart * (1));
        ctx.lineTo(oneCol * parseInt(col[j], 10) + lastColPosition, lastPosition);
        ctx.stroke();
        lastColPosition = oneCol * parseInt(col[j], 10) + lastColPosition;
      }


    }

  }

  saveLayout() {
    const self = this;
    // if (this.currentId === 'null-value') {
    if (self.currentId > 0) {
      if (this.name === undefined || this.name === '') {
        toastr.error("Vui lòng nhập thông tin cho layout", "Lỗi", {
          timeOut: 3000,
          positionClass: 'toast-top-right',
          preventDuplicates: true,
        });
      } else {
        this.dataSourceUpdate.name = this.name;
        this.dataSourceUpdate.row = self.dashboardLayoutDetailDataSource.length;
        this._dashboardLayoutService.updateAsync(this.dataSourceUpdate).subscribe(res => {
          if (!isNullOrUndefined(self.dashboardLayoutDetailDataSource)) {
            if (self.dashboardLayoutDetailDataSource.length > 0) {
              self.updateAll(self.currentId);
            }
          }
        });
      }
    } else if (self.currentId == 'null-value') {
      if (this.name === undefined || this.name === '' || isNullOrUndefined(this.dashboardLayoutDetailDataSource)) {
        toastr.error("Vui lòng nhập thông tin cho layout", "Lỗi", {
          timeOut: 3000,
          positionClass: 'toast-top-right',
          preventDuplicates: true,
        });
      } else {
        if (this.dashboardLayoutDetailDataSource.length > 0) {
          const obj = new CreateLayoutDto();
          obj.name = this.name;
          obj.row = this.dashboardLayoutDetailDataSource.length;
          obj.isActive = true;
          obj.isDelete = false;
          this._dashboardLayoutService.createAsync(obj).subscribe(res => {
            this.updateAll(res);
          });
        }
      }
    }
  }
  updateAll(Id: any) {
    const self = this;
    this._dashboardLayoutService.resetLayoutAsync(Id).subscribe(data => {
      //if (data['succeeded'] === true) {
        let index = 1;

        for (let i = 0; i < self.dashboardLayoutDetailDataSource.length; i++) {
          let totalCol = 0;
          const col = self.dashboardLayoutDetailDataSource[i].ratio.toString().split(':');
          for (let j = 0; j < col.length; j++) {
            totalCol += parseInt(col[j], 10);
          }
          for (let j = 0; j < col.length; j++) {
            let html;
            html = `<div class='col-12 `;
            if (col.length === 4) {
              html += `col-sm-` + (12 / totalCol) * parseInt(col[j], 10) * 2 + ` `;
            }
            html += `col-md-` + (12 / totalCol) * parseInt(col[j], 10) + `'>`;
            html += `<div id='content_` + index + `' ></div>`;
            html += `</div>`;
            const _layoutConfig = new SaveLayoutConfig();
            _layoutConfig.layoutId = Id;
            _layoutConfig.contentId = index;
            _layoutConfig.rowIndex = i;
            _layoutConfig.colIndex = j;
            _layoutConfig.ratio = parseInt(col[j], 10);
            _layoutConfig.htmlCode = html;
            _layoutConfig.isLayout = false;
            self._dashboardLayoutService.saveLayoutAsync(_layoutConfig).subscribe(function (result) {

            });
            index++;
          }
        }
        toastr.success("Nạp thành công dữ liệu", "Thành công", {
          timeOut: 3000,
          positionClass: 'toast-top-right',
          preventDuplicates: true,
        });
        self.router.navigate(['/app/dashboard-layout/']);
        //this.router.navigate(['/app/dashboard-layout']);
      //}
    });
  }
}