var _token = null;
var _userId = null;
var _instanceUrl = null;
export function logIn(instanceURL = _instanceUrl) {
    if(_instanceUrl != instanceURL && instanceURL != null) _instanceUrl = instanceURL;
    return new Promise((res, rej) => {
        if(instanceURL == null) rej("Instance URL must not be null");
        const wnd = window.open(instanceURL + '/login.html', '_blank', 'location=no,menubar=no,toolbar=no');
        var isLoggedIn = false;
        window.addEventListener('message', function logInListener(event) {
            if(!event.origin.startsWith(instanceURL)) return;
            const data = event.data;
            if(data.msg != 'logged-in') return;
            if(data.detail.success) {
                isLoggedIn = true;
                wnd.close();
                setAuth(data.detail.token, data.detail.userId);
                window.removeEventListener('message', logInListener);
                res(data);
            } else {
                window.removeEventListener('message', logInListener);
                rej("Login unsuccessful");
            }
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

export async function addUserToSite(siteId, userEmail) {
    if(!(checkAuth() && checkInstanceURL())) throw new Error('Must be authenticated');

    const result = await fetch(_instanceUrl + '/api/site/' + siteId + '/user/' + userEmail + '/add', {
        headers: {
            'Authorization': 'Bearer ' + _token
        },
        method: 'POST',
        mode: 'no-cors'
    });
    if(!result.ok) throw new Error("Not authorized");
    return (await result.json()).success;
}
