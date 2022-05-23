const serverAddress = "http://localhost:5000";


function getUsers(){
    fetch( serverAddress + "/users")
        .then(res =>
            res.json()
        ).then(data =>
            setUsers(data.item)
        )
        .catch(function (error) {
            console.log(error);
        })
}