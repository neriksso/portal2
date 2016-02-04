import $ from 'jquery'

/**
 * User API client lib
 * @type {Object}
 */
var userService = {

    // User Details
    login(username, token, callback) {
        if (this.anyElementsEmpty({ username, password})) {
            callback(false, {
                type: "field-missing"
            });
            return;
        }
        $.ajax({
            url: 'http://localhost:8000/' + 'api/' + username + '/',      // TODO: This is hardcoded!!
            dataType: 'json',
            type: 'POST',
            data: login,
            success: function (response) {
                if (response.token) {
                    localStorage.token = response.token;
                    callback(true);
                } else {
                    // If there was a problem authenticating the user, show an error on the
                    // form
                    callback(false, response.error);
                }
            }.bind(this),
            error: function (xhr, status, err) {
                callback(false, err);
            }.bind(this)
        });


    }
}
