module.exports = {
    errorMsg: (message, errorCode, ) => {
        return {
            message: message,
            errorCode: errorCode
        }
    },
    internalError: (message) => {
        return {
            message: message,
            code: 500
        }

    },
    applyError: (err) => {
        return {
            state: 'fail',
            code: 500,
            err: err,
            state: 'user apply error'
        }
    },

    postingActionError: (err) => {
        return {
            state: 'fail',
            code: 500,
            err: err,
            state: 'posting jobs action failed;'
        }
    }
}