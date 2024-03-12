import CreateErrorScreen from "./ErrorScreen";

/**
 * Creates a readable errormessage from a given error
 * @param error - the error we want to create a readable string from
 * @returns - A string with the error message
 */
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