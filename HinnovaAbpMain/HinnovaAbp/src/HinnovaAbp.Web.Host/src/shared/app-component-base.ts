import { Injector, ElementRef } from '@angular/core';
import { AppConsts } from '@shared/AppConsts';
import { LocalizationService } from '@abp/localization/localization.service';
import { PermissionCheckerService } from '@abp/auth/permission-checker.service';
import { FeatureCheckerService } from '@abp/features/feature-checker.service';
import { NotifyService } from '@abp/notify/notify.service';
import { SettingService } from '@abp/settings/setting.service';
import { MessageService } from '@abp/message/message.service';
import { AbpMultiTenancyService } from '@abp/multi-tenancy/abp-multi-tenancy.service';
import { AppSessionService } from '@shared/session/app-session.service';

export abstract class AppComponentBase {

    localizationSourceName = AppConsts.localization.defaultLocalizationSourceName;

    localization: LocalizationService;
    permission: PermissionCheckerService;
    feature: FeatureCheckerService;
    notify: NotifyService;
    setting: SettingService;
    message: MessageService;
    multiTenancy: AbpMultiTenancyService;
    appSession: AppSessionService;
    elementRef: ElementRef;

    constructor(injector: Injector) {
        this.localization = injector.get(LocalizationService);
        this.permission = injector.get(PermissionCheckerService);
        this.feature = injector.get(FeatureCheckerService);
        this.notify = injector.get(NotifyService);
        this.setting = injector.get(SettingService);
        this.message = injector.get(MessageService);
        this.multiTenancy = injector.get(AbpMultiTenancyService);
        this.appSession = injector.get(AppSessionService);
        this.elementRef = injector.get(ElementRef);
    }

    l(key: string, ...args: any[]): string {
        let localizedText = this.localization.localize(key, this.localizationSourceName);

        if (!localizedText) {
            localizedText = key;
        }

        if (!args || !args.length) {
            return localizedText;
        }

        args.unshift(localizedText);
        return abp.utils.formatString.apply(this, args);
    }

    isGranted(permissionName: string): boolean {
        return this.permission.isGranted(permissionName);
    }
}


export function storeState(data: any, key: string = 'STATE_SEARCH') {
    if (data) {
        localStorage.setItem(key, JSON.stringify(data));
    }
}

export function retrieveState(key: string = 'STATE_SEARCH') {
    const dataStr = localStorage.getItem(key);
    return dataStr ? JSON.parse(dataStr) : null;
}

export function clearState(key: string = 'STATE_SEARCH') {
    localStorage.removeItem(key);
}

export class Guid {
    static empty(): any {
        return '00000000-0000-0000-0000-000000000000';
    }
}

export function getMenuTypeOptions() {
    const data = [
        { text: "Administrator", value: "ADMINISTRATOR" },
        { text: "Manager", value: "MANAGER" },
        { text: "User", value: "USER" }
    ];
    return data;
}

export function getTypeChartOptions() {
    const chartType = [{
        code: 'pie',
        name: 'Biểu đồ tròn'
    },
    {
        code: 'bar',
        name: 'Biểu đồ cột'
    },
    {
        code: 'stackedBar',
        name: 'Biểu đồ cột chồng dữ liệu'
    }
    ];
    return chartType;
}