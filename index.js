export default class Analytics {
    constructor(instanceURL) {
        this.instanceURL = instanceURL;
    }
    async track() {
        await fetch(`${this.instanceURL}/api/site/${location.hostname}/track`, {
            method: "POST",
            body: JSON.stringify({
                path: location.pathname
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });
    }
}

export * as auth from './oauth.js';