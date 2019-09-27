import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JsonpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { ModalModule } from 'ngx-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AbpModule } from '@abp/abp.module';

import { ServiceProxyModule } from '@shared/service-proxies/service-proxy.module';
import { SharedModule } from '@shared/shared.module';

import { HomeComponent } from '@app/home/home.component';
import { AboutComponent } from '@app/about/about.component';
import { TopBarComponent } from '@app/layout/topbar.component';
import { TopBarLanguageSwitchComponent } from '@app/layout/topbar-languageswitch.component';
import { SideBarUserAreaComponent } from '@app/layout/sidebar-user-area.component';
import { SideBarNavComponent } from '@app/layout/sidebar-nav.component';
import { SideBarFooterComponent } from '@app/layout/sidebar-footer.component';
import { RightSideBarComponent } from '@app/layout/right-sidebar.component';
// tenants
import { TenantsComponent } from '@app/tenants/tenants.component';
import { CreateTenantDialogComponent } from './tenants/create-tenant/create-tenant-dialog.component';
import { EditTenantDialogComponent } from './tenants/edit-tenant/edit-tenant-dialog.component';
// roles
import { RolesComponent } from '@app/roles/roles.component';
import { CreateRoleDialogComponent } from './roles/create-role/create-role-dialog.component';
import { EditRoleDialogComponent } from './roles/edit-role/edit-role-dialog.component';
// users
import { UsersComponent } from '@app/users/users.component';
import { CreateUserDialogComponent } from '@app/users/create-user/create-user-dialog.component';
import { EditUserDialogComponent } from '@app/users/edit-user/edit-user-dialog.component';
import { ChangePasswordComponent } from './users/change-password/change-password.component';
import { ResetPasswordDialogComponent } from './users/reset-password/reset-password.component';
import { MenuComponent } from './menu/menu.component';
import { DxFormModule, DxDataGridModule, DxButtonModule, DxTextBoxModule, DxCheckBoxModule, DxSelectBoxModule, DxPopupModule, DxTemplateModule } from 'devextreme-angular';
import { MenuDetailModalComponent } from './menu/menu-detail-modal/menu-detail-modal.component';
//dashboard layouts
import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component'
import { DashboardLayoutDetailComponent } from './dashboard-layout/dashboard-layout-detail-modal/dashboard-layout-detail-modal.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
//Dashboard item
import { DashboardItem } from './dashboard-item/dashboard-item.component';
import { DashboardItemViewDetail } from './dashboard-item/dashboard-item-view-detail/dashboard-item-view-detail.component';
import { DashboardItemViewDetailNew } from './dashboard-item/dashboard-item-view-detail/dashboard-item-view-detail-new.component';
import { DashboardItemViewDetailEdit } from './dashboard-item/dashboard-item-view-detail/dashboard-item-view-detail-edit.component';
//Dashboard config
import { DashboardConfig } from './dashboard-config/dashboard-config.component';
import { DashboardConfigViewDetail } from './dashboard-config/dashboard-config-view-detail/dashboard-config-view-detail.component';
import { DashboardConfigViewDetailNew } from './dashboard-config/dashboard-config-view-detail/dashboard-config-view-detail-new.component';
import { DashboardConfigViewDetailEdit } from './dashboard-config/dashboard-config-view-detail/dashboard-config-view-detail-edit.component';

import { DashboardComponent } from "./dashboard/dashboard.component";
import { DynamicModuleComponent } from './dynamicModule/dynamicModule.component';
import { LookupComponent } from './lookup/lookup.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    TopBarComponent,
    TopBarLanguageSwitchComponent,
    SideBarUserAreaComponent,
    SideBarNavComponent,
    SideBarFooterComponent,
    RightSideBarComponent,
    // tenants
    TenantsComponent,
    CreateTenantDialogComponent,
    EditTenantDialogComponent,
    // roles
    RolesComponent,
    CreateRoleDialogComponent,
    EditRoleDialogComponent,
    // users
    UsersComponent,
    CreateUserDialogComponent,
    EditUserDialogComponent,
    ChangePasswordComponent,
    ResetPasswordDialogComponent,

    // dynamic
    DynamicModuleComponent,

    // menus
    MenuComponent,
    MenuDetailModalComponent,

    //dashboard layouts
    DashboardLayoutComponent,
    DashboardLayoutDetailComponent,

    //Dashboard component
    DashboardItem,
    DashboardItemViewDetail,
    DashboardItemViewDetailNew,
    DashboardItemViewDetailEdit,

    //Dashboard config
    DashboardConfig,
    DashboardConfigViewDetail,
    DashboardConfigViewDetailNew,
    DashboardConfigViewDetailEdit,

    //Dashboard
    DashboardComponent,

    LookupComponent

  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    JsonpModule,
    ModalModule.forRoot(),
    AbpModule,
    AppRoutingModule,
    ServiceProxyModule,
    SharedModule,
    NgxPaginationModule,
    DxFormModule,
    DxDataGridModule,
    DxButtonModule,
    DxCheckBoxModule,
    DxSelectBoxModule,
    DxTextBoxModule,
    Ng2SmartTableModule,
    DxPopupModule,
    DxTemplateModule

  ],
  providers: [],
  entryComponents: [
    // tenants
    CreateTenantDialogComponent,
    EditTenantDialogComponent,
    // roles
    CreateRoleDialogComponent,
    EditRoleDialogComponent,
    // users
    CreateUserDialogComponent,
    EditUserDialogComponent,
    ResetPasswordDialogComponent,
  ]
})
export class AppModule { }
