module.exports = {
    insertNewUser: (state, code, msg) => {
        return {
            state: `${state}`,
            code: `${code}`,
            msg: `${msg}`,
        }
    },

    isFindTheUserSuccess: (state, code, msg, token) => {
        return {
            state: `${state}`,
            code: `${code}`,
            msg: `${msg}`,
            token: `${token}`,
            
        }
    }
}