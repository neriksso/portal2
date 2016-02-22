var config = {
    'api': {
        'hosts': {
            'base': 'http://localhost:8000',
            'user': 'http://localhost:8000'
        }
    }
};

var Manifest = {
    host: config.api.hosts.base,
    resources: {
        User: {
            login: {
                method: 'POST',
                host: config.api.hosts.user,
                path: '/api-token-auth/'
            },
            getProfile: {
                host: config.api.hosts.user,
                path: 'api/users/{username}/'
            },
            patchProfile: {
                method: 'PATCH',
                host: config.api.hosts.user,
                path: 'api/users/{username}/'
            },
            getGroups: {
                host: config.api.hosts.user,
                path: 'api/users/{username}/groups/'
            },
            setGroups: {
                method: 'PUT',
                host: config.api.hosts.user,
                path: 'api/users/{username}/groups/'
            },
            unsetGroups: {
                method: 'DELETE',
                host: config.api.hosts.user,
                path: 'api/users/{username}/groups/'
            },
            getAvailableGroups: {
                host: config.api.hosts.user,
                path: 'api/users/{username}/available_groups/'
            }
        }
    }
};

export default Manifest;