import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { DynamicFieldServiceProxy, DynamicValue } from '@shared/service-proxies/service-proxies';
import { DomSanitizer } from '@angular/platform-browser';
import 'devextreme/integration/jquery';
import * as $ from 'jquery';

@Component({
    selector: 'dynamicModule',
    templateUrl: './dynamicModule.component.html',
})
export class DynamicModuleComponent implements OnInit {
    // @Input() currentId: any;
    @Input() link: any;
    @Input() parameters: any;

    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
    
    currentId: any;
    dynamicFields: any;
    formData: DynamicValue;
    dynamicData: any;
    objectID: any;
    moduleId: any;
    error = true;
    constructor(private _dynamicFieldService: DynamicFieldServiceProxy,
                private _sanitizer: DomSanitizer) {
    }

    loadDynamicField(inputId : any){     
        return new Promise((resolve, reject)=>{
            if (this.error) {
                const self = this;
                // this.href = this.router.url;
                // console.log(this.router.url);
                this.currentId = inputId;
                self._dynamicFieldService.getDynamicFields(this.link, this.currentId).subscribe((res: any) => {
                    console.log(res);
                    console.log(res.length);
                    if (res.length > 0 ) {
                        console.log(res)
                        self.dynamicData = res;            
                        var div = '';
                        self.objectID = this.currentId;
                        self.moduleId = res[0].moduleID;
                        res.forEach(function (value) {
                            div += '<div class="col-sm-'+value.classAttach+'">';
                            div += '<label class="col-sm-'+value.widthDescription+' col-form-label margin-label" style="margin-top: 1%;">'+value.nameDescription+'</label>'
                            div += '<div class="col-sm-'+value.width+'">'
                            if(value.typeField == 2){ // input
                                if(value.valueId != 0){
                                    div += '<input id="dynamic'+value.name+'" type="text" style="margin-top:10px" class="form-control" value="'+value.value+'" >'
                                }else{
                                    div += '<input id="dynamic'+value.name+'" type="text" style="margin-top:10px" class="form-control" >'
                                }      
                            }else if(value.typeField == 3 || value.typeField == 1 || value.typeField == 4){ // combobox,checkbox,datebox
                                div += '<div id="dynamic'+value.name+'"></div>';                          
                            }
                            
                            div += '</div></div>'
                        }); 
                        console.log(div)               
                        self.dynamicFields = this._sanitizer.bypassSecurityTrustHtml(div);                            
                    }else{
                        self.dynamicFields = this._sanitizer.bypassSecurityTrustHtml("");
                    }
                    resolve('done');         
                });
            } else {
                reject('error');
            }
        }).then((val) => {
                    setTimeout(() => 
                    {
                        this.datebox();
                        this.selectBox();
                        this.checkbox();
                    },500)},
                (err) => {
                    console.error(err);
                    });           
    }
   
    selectBox(){
        this.dynamicData.forEach(obj =>{
            if(obj.typeField == 3){
                this.dataSourceSelectBox(obj.id, this.parameters).then((val) => {setTimeout(() => {
                    var dataSource = [];
                    dataSource.push(val);
                    var id = 'dynamic'+obj.name;              
                    $("#"+id).dxSelectBox({
                        items: dataSource[0],
                        valueExpr: "key",
                        displayExpr: "value",
                    });               
                    if(obj.value != 0 && obj.value != "") 
                    {
                        console.log(obj.value)
                        $("#"+id).dxSelectBox("instance").option("value", obj.value);
                    }
                },500) });               
            }           
        });
    }

    dataSourceSelectBox(dynamicFieldId : any, parameters: any){
        return new Promise((resolve, reject)=>{
            this._dynamicFieldService.getDataSourceDynamic(dynamicFieldId, this.currentId, parameters).subscribe((res: any) => {
                resolve(res);
            }); 
        });
         
    }

    checkbox(){
        this.dynamicData.forEach(obj =>{
            if(obj.typeField == 1){
                var id = 'dynamic'+obj.name;
                var check = (obj.value == "true") ? true : false;
                $("#"+id).dxCheckBox({
                    value: check
                });
            }           
        });
    }  

    datebox(){
        this.dynamicData.forEach(obj => {
            if(obj.typeField == 4){
                var id = 'dynamic'+obj.name;
                $("#"+id).dxDateBox({
                    displayFormat: "dd/MM/yyyy",
                    type: 'date',
                    value: (obj.value != '') ? new Date(obj.value) : new Date()
                });
            }
        });
    }

    saveDynamicValue(): boolean{
        const self = this;         
        var objData =[];      
        this.dynamicData.forEach(obj =>{    
            this.formData = new DynamicValue();        
            var id = 'dynamic'+obj.name;
            self.formData.key = obj.name;
            if(obj.typeField == 1)
            {
                if($("#"+id).dxCheckBox('instance').option('value')){
                    self.formData.value = "true";
                }else{
                    self.formData.value = "false";
                }              
            }
            else if(obj.typeField == 2){
                self.formData.value = $("#"+id).val().toString();
            }else if(obj.typeField == 3){
                self.formData.value = $("#"+id).dxSelectBox('instance').option('value');
            }else if(obj.typeField == 4){
                self.formData.value = $("#"+id).dxDateBox('instance').option('value');
            }
            self.formData.dynamicFieldId = obj.id;
            self.formData.objectId = self.currentId;
            self.formData.id = obj.valueId;
            objData.push(self.formData);
        });
        this._dynamicFieldService.insertUpdateDynamicFields(objData).subscribe((res: any) => {

        });     
        return;  
    }

    ngOnInit() {}

}
