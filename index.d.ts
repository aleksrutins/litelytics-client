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
        function logIn(instanceURL?: string): Promise<LogInResult>;
        function setAuth(token: string, userId: number): void;
        function setInstance(instanceURL: string): void;
        function getSiteInfo(siteId: number): SiteInfo;
        function getSiteData(siteId: number): Visit[];
    }
}