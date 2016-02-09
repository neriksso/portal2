import $ from 'jquery'

/**
 * User API client lib
 * @type {Object}
 */
var userService = {

    // User Details
    getUserDetails(username, token, callback) {
        if (this.anyElementsEmpty({ username, token })) {
            callback(false, {
                type: "field-missing"
            });
            return;
        }
        $.ajax({
            url: 'http://localhost:8000/' + 'api/users/' + username + '/',      // TODO: This is hardcoded!!
            dataType: 'json',
            type: 'GET',
            headers: {
                'Authorization': 'JWT ' + token
            },
            success: function (response) {
                console.log(response)
                callback({
                    success: true,
                    response: response
                });
            }.bind(this),
            error: function (xhr, status, err) {
                callback(false, err);
            }.bind(this)
        });


    },
    setUserDetails(username, token, data, callback) {
        if (this.anyElementsEmpty({ username, token })) {
            callback(false, {
                type: "field-missing"
            });
            return;
        }
        $.ajax({
            url: 'http://localhost:8000/' + 'api/users/' + username + '/',      // TODO: This is hardcoded!!
            dataType: 'json',
            type: 'PUT',
            data: data,
            headers: {
                'Authorization': 'JWT ' + token
            },
            success: function (response) {
                console.log(response)
                callback({
                    success: true,
                    response: response
                });
            }.bind(this),
            error: function (xhr, status, err) {
                callback(false, err);
            }.bind(this)
        });


    },
    /**
     * Checks if any elements of a JSON object are empty
     * @param  {object} elements The object that should be checked
     * @return {boolean}         True if there are empty elements, false if there aren't
     */
    anyElementsEmpty(elements) {
        for (let element in elements) {
            if (!elements[element]) {
                return true;
            }
        }
        return false;
    }
};

module.exports = userService;