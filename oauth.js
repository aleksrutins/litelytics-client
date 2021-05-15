var _token = null;
var _userId = null;
var _instanceUrl = null;
export function logIn(instanceURL = _instanceUrl) {
    if(_instanceUrl != instanceURL && instanceURL != null) _instanceUrl = instanceURL;
    return new Promise((res, rej) => {
        if(instanceURL == null) rej("Instance URL must not be null");
        const wnd = window.open(instanceURL + '/login.html');
        var isLoggedIn = false;
        wnd.document.body.addEventListener('logged-in', data => {
            if(data.success) {
                isLoggedIn = true;
                wnd.close();
                setAuth(data.token, data.userId);
                res(data);
            } else {
                rej("Login unsuccessful");
            }
        });
        wnd.addEventListener('close', (e) => {
            if(!isLoggedIn) rej("Window closed before logged in");
        });
    });
}

function checkAuth() {
    return !(_token == null || _userId == null);
}

function checkInstanceURL() {
    return _instanceUrl != null;
}

export function setAuth(token, userId) {
    _token = token;
    _userId = userId;
}

export function setInstance(instanceURL) {
    _instanceUrl = instanceURL;
}

export async function getSites() {
    if(!(checkAuth() && checkInstanceURL())) throw new Error('Must be authenticated');

    const result = await fetch(_instanceUrl + '/api/site/list', {
        headers: {
            'Authorization': 'Bearer ' + _token
        }
    });
    return (await result.json()).sites;
}

export async function getSiteInfo(siteId) {
    if(!(checkAuth() && checkInstanceURL())) throw new Error('Must be authenticated');

    const result = await fetch(_instanceUrl + '/api/site/' + siteId + '/info', {
        headers: {
            'Authorization': 'Bearer ' + _token
        }
    });
    if(!result.ok) throw new Error("Not authorized");
    return (await result.json()).info;
}

export async function getSiteData(siteId) {
    if(!(checkAuth() && checkInstanceURL())) throw new Error('Must be authenticated');

    const result = await fetch(_instanceUrl + '/api/site/' + siteId + '/data', {
        headers: {
            'Authorization': 'Bearer ' + _token
        }
    });
    if(!result.ok) throw new Error("Not authorized");
    return (await result.json()).data;
}