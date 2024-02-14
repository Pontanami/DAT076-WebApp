function handleError(error: any, displayErrorMessage: (errorMessage: string) => void) {
    if (error.response) {
        displayErrorMessage(error.response.status)
    }
    else if (error.request) {
        displayErrorMessage("No response provided from the server")
    }
    else {
        displayErrorMessage("Error occured while processing request")
    }
}

export default handleError;