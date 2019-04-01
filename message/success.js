module.exports = {
    loginSuccess: (msg, code, jwt, userid)=>{
        return {
            meg: msg,
            code: code,
            body: jwt,
            userid, userid
        }
    },
    applySuccess: (msg, code)=>{
        return {
            meg: msg,
            code: code,
        }
    },
    postSuccess: ()=>{
      return {
        state: 'success',
        code: 200,
      }

    }

}
