import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AppRouteGuard } from '@shared/auth/auth-route-guard';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { UsersComponent } from './users/users.component';
import { TenantsComponent } from './tenants/tenants.component';
import { RolesComponent } from 'app/roles/roles.component';
import { ChangePasswordComponent } from './users/change-password/change-password.component';
import { MenuComponent } from './menu/menu.component';
import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component';
import { DashboardLayoutDetailComponent } from './dashboard-layout/dashboard-layout-detail-modal/dashboard-layout-detail-modal.component';
import { DashboardItem } from './dashboard-item/dashboard-item.component';
import { DashboardItemViewDetailNew } from './dashboard-item/dashboard-item-view-detail/dashboard-item-view-detail-new.component';
import { DashboardItemViewDetailEdit } from './dashboard-item/dashboard-item-view-detail/dashboard-item-view-detail-edit.component';
import { DashboardComponent } from "./dashboard/dashboard.component";
import { DashboardConfig } from './dashboard-config/dashboard-config.component'
import { DashboardConfigViewDetailNew } from './dashboard-config/dashboard-config-view-detail/dashboard-config-view-detail-new.component'
import { DashboardConfigViewDetailEdit } from './dashboard-config/dashboard-config-view-detail/dashboard-config-view-detail-edit.component'
import { LookupComponent } from './lookup/lookup.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: AppComponent,
                children: [
                    { path: 'home', component: HomeComponent, canActivate: [AppRouteGuard] },
                    { path: 'users', component: UsersComponent, data: { permission: 'Pages.Users' }, canActivate: [AppRouteGuard] },
                    { path: 'roles', component: RolesComponent, data: { permission: 'Pages.Roles' }, canActivate: [AppRouteGuard] },
                    { path: 'tenants', component: TenantsComponent, data: { permission: 'Pages.Tenants' }, canActivate: [AppRouteGuard] },
                    { path: 'menu', component: MenuComponent, data: { permission: 'Pages.Menus' }, canActivate: [AppRouteGuard] },
                    { path: 'dashboard-layout', component: DashboardLayoutComponent, data: { permission: 'Pages.Layouts' }, canActivate: [AppRouteGuard] },
                    { path: 'dashboard-layout/dashboard-layout-detail/:id', component: DashboardLayoutDetailComponent, data: { permission: 'Pages.Layouts' }, canActivate: [AppRouteGuard] },
                    { path: 'about', component: AboutComponent },
                    { path: 'update-password', component: ChangePasswordComponent },
                    { path: 'dashboard-item', component: DashboardItem },
                    { path: 'dashboard-item/dashboard-item-view-detail-new', component: DashboardItemViewDetailNew },
                    { path: 'dashboard-item/dashboard-item-view-detail-edit/:id', component: DashboardItemViewDetailEdit },
                    { path: 'dashboard-config', component: DashboardConfig },
                    { path: 'dashboard-config/dashboard-config-view-detail-new', component: DashboardConfigViewDetailNew },
                    { path: 'dashboard-config/dashboard-config-view-detail-edit/:id', component: DashboardConfigViewDetailEdit },
                    { path: 'dashboard/:id', component: DashboardComponent, canActivate: [AppRouteGuard]  },
                    { path: 'lookup', component: LookupComponent },
                ]
            }
        ])
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
