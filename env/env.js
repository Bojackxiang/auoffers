module.exports = {
    // * the following is the local service
    local_port: 3306,
    local_host: '0.0.0.0',
    local_user: 'root',
    local_password: 'root',
    local_database: 'jobsearch',
    //* the following is remote server
    server_port: 8080,
    server_host: 'localhost',
    server_user: 'root',
    server_password: 'root',
    server_database: 'jobsearch',
    // * email sender
    // * jwt secret key,
    secretKey: "secretkey"


}
