var oracledb = require('oracledb');

module.exports = function(username, password) {
    var connectionString = {
        user: "RETAILDB",
        password: "retaildb#321",
        connectString: "10.146.64.232:1521/MKTORARACKDB"
    };
    
    var loginStatus = false;
    

    oracledb.getConnection(
        connectionString,
        function(err, connection) {
            if (err) { console.error(err); return; }
            connection.execute(
                "SELECT mobile, password "
                + "FROM fai_user_profile "
                + "WHERE mobile=" + username + " and password=" + password,
                function(err, result) {
                    if (err) {
                        console.error(err); return;
                    } else {
                        console.log(result.rows.length);
                        if (result.rows.length > 0) {
                            loginStatus = true;
                        } else {
                            loginStatus = false;
                            
                        }
                        return loginStatus;
                    }

                });
        });
}