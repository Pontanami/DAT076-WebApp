/**
 * Function used for representing the current user
 */

var CurrentUser = (function () {
    var userName = "";
    var userId: number;

    var getName = function () {
        return userName
    };

    var getId = function () {
        return userId
    }

    var setActiveUser = function (id: number, name: string) {
        userId = id
        userName = name;
    }

    return {
        setActiveUser: setActiveUser,
        getName: getName,
        getId: getId,
    }

})();

export default CurrentUser;