var CurrentUser = (function () {
    var userName = "";
    var userId: number;

    var getName = function () {
        return userName;    // Or pull this from cookie/localStorage
    };

    var getId = function () {
        return userId;
    }

    var setActivePlayer = function (id: number, name: string) {
        userId = id
        userName = name;
    }

    return {
        setActivePlayer: setActivePlayer,
        getName: getName,
        getId: getId,
    }

})();

export default CurrentUser;