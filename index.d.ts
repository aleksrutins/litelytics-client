declare module "litelytics-client" {
    export default class Analytics {
        constructor(instanceURL: string);
        track(): Promise<void>;
    }
    export namespace auth {
        type LogInResult = {
            userId: number,
            token: string
        };
        type SiteInfo = {
            id: number,
            domain: string
        };
        type Visit = {
            id: number,
            site: number,
            useragent: string,
            path: string,
            referer: string,
            timestamp: string,
            ip: string
        };
        declare function logIn(instanceURL?: string): Promise<LogInResult>;
        declare function setAuth(token: string, userId: number): void;
        declare function setInstance(instanceURL: string): void;
        declare function getSiteInfo(siteId: number): SiteInfo;
        declare function getSiteData(siteId: number): Visit[];
    }
}