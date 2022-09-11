
import { USER_REGISTER_LAMBDA } from '../model/Constants'

export default async function addUser(user, token) {
    await fetch(USER_REGISTER_LAMBDA, {
        method: 'POST',
        body: JSON.stringify({
            "user": {
                "firstName": user.firstName,
                "lastName": user.lastName,
                "email": user.email
            }
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'Authorization': token,
        },
    })
        .then((response) => response.json())
        .then((data) => {
            alert("user registered successfully:" + user.email)
        })
        .catch((err) => {
            console.log(err.message);
        });
};

