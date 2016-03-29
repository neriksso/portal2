var config = {
    'api': {
        'hosts': {
            'base': 'http://192.168.99.101:8000',
            'user': 'http://192.168.99.101:8000',
            'reports': 'http://192.168.99.102:8000'
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
        },
        Reports: {
            getProjects: {
                host: config.api.hosts.reports,
                path: 'api/v1/projects/'
            },
            createProject: {
                method: 'POST',
                host: config.api.hosts.reports,
                path: 'api/v1/projects/'
            },
            getProject: {
                host: config.api.hosts.reports,
                path: 'api/v1/projects/{project}/'
            },
            patchProject: {
                method: 'PATCH',
                host: config.api.hosts.reports,
                path: 'api/v1/projects/{project}/'
            },
            putProject: {
                method: 'PUT',
                host: config.api.hosts.reports,
                path: 'api/v1/projects/{project}/'
            },
            deleteProject: {
                method: 'DELETE',
                host: config.api.hosts.reports,
                path: 'api/v1/projects/{project}/'
            },
            getStatuses: {
                host: config.api.hosts.reports,
                path: 'api/v1/statuses/'
            },
            createStatus: {
                method: 'POST',
                host: config.api.hosts.reports,
                path: 'api/v1/statuses/'
            },
            getStatus: {
                host: config.api.hosts.reports,
                path: 'api/v1/statuses/{status}/'
            },
            patchStatus: {
                method: 'PATCH',
                host: config.api.hosts.reports,
                path: 'api/v1/statuses/{status}/'
            },
            putStatus: {
                method: 'PUT',
                host: config.api.hosts.reports,
                path: 'api/v1/statuses/{status}/'
            },
            deleteStatus: {
                method: 'DELETE',
                host: config.api.hosts.reports,
                path: 'api/v1/statuses/{status}/'
            },
            getTrafficLights: {
                host: config.api.hosts.reports,
                path: 'api/v1/trafficlights/'
            },
            createTrafficLight: {
                method: 'POST',
                host: config.api.hosts.reports,
                path: 'api/v1/trafficlights/'
            },
            getTrafficLight: {
                host: config.api.hosts.reports,
                path: 'api/v1/trafficlights/{trafficlight}/'
            },
            getTrafficLightByUrl: {
                host: false,
                path: '{url}'
            },
            getUnitsForTrafficLight: {
                host: config.api.hosts.reports,
                path: 'api/v1/trafficlights/{trafficlight}/units/'
            },
            patchTrafficLight: {
                method: 'PATCH',
                host: config.api.hosts.reports,
                path: 'api/v1/trafficlights/{trafficlight}/'
            },
            putTrafficLight: {
                method: 'PUT',
                host: config.api.hosts.reports,
                path: 'api/v1/trafficlights/{trafficlight}/'
            },
            deleteTrafficLight: {
                method: 'DELETE',
                host: config.api.hosts.reports,
                path: 'api/v1/trafficlights/{trafficlight}/'
            },
            getTrafficLightUnits: {
                host: config.api.hosts.reports,
                path: 'api/v1/trafficlightunits/'
            },
            createTrafficLightUnit: {
                method: 'POST',
                host: config.api.hosts.reports,
                path: 'api/v1/trafficlightunits/'
            },
            getTrafficLightUnit: {
                host: config.api.hosts.reports,
                path: 'api/v1/trafficlightunits/{trafficlightunit}/'
            },
            patchTrafficLightUnit: {
                method: 'PATCH',
                host: config.api.hosts.reports,
                path: 'api/v1/trafficlightunits/{trafficlightunit}/'
            },
            putTrafficLightUnit: {
                method: 'PUT',
                host: config.api.hosts.reports,
                path: 'api/v1/trafficlightunits/{trafficlightunit}/'
            },
            deleteTrafficLightUnitUnit: {
                method: 'DELETE',
                host: config.api.hosts.reports,
                path: 'api/v1/trafficlightunits/{trafficlightunit}/'
            }
        }
    }
};

export default Manifest;