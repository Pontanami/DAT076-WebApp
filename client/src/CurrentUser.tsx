var CurrentUser = (function () {
    var userName = "";
    var userId: number;

    var getName = function () {
        const localStorageName = localStorage.getItem("activeUserName")
        if(localStorageName){
            const name = JSON.parse(localStorageName)
            return name
        }
        throw new Error("No Active User");
    };

    var getId = function () {
        //return userId
        const localStorageID = localStorage.getItem("activeUserID")
        if(localStorageID){
            const id = JSON.parse(localStorageID)
            return id
        }
        throw new Error("No Active User");
    }

    var setActiveUser = function (id: number, name: string) {
        //userId = id
        //userName = name;
        localStorage.setItem("activeUserName", JSON.stringify(name))
        localStorage.setItem("activeUserID", JSON.stringify(id))
    }

    return {
        setActiveUser: setActiveUser,
        getName: getName,
        getId: getId,
    }

})();

export default CurrentUser;