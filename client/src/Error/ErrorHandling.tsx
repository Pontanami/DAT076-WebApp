import CreateErrorScreen from "./ErrorScreen";


function getErrorMessage(error: any) : string {
    if (error.response) {
        let errorString : string = error.response.status + ": " + error.response.data
        return errorString
    }
    else if (error.request) {
        return "No response provided by the server"
    }
    else {
        return "Error occured while processing request";
    }
}

export default getErrorMessage;