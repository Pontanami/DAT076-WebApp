import CreateErrorScreen from "./ErrorScreen";


function getErrorMessage(error: any) : string {
    if (error.response) {
        return error.response.status
        //denna skickar vidare any, vet inte hur vi vill ha det
        //<CreateErrorScreen error={error.response.status} ></CreateErrorScreen>
    }
    else if (error.request) {
        return "No response provided by the server"
        //<CreateErrorScreen error={"No response provided from the server"} ></CreateErrorScreen>
    }
    else {
        return "Error occured while processing request";
        //<CreateErrorScreen error={"Error occured while processing request"} ></CreateErrorScreen>

    }
}

export default getErrorMessage;