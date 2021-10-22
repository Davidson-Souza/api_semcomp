const axios = require("axios").default;

const request = axios.create({
    baseURL: "http://apisemcomp.sytes.net:8080/api/v1/users/"
})

const dummy = {
    email: "email",
    username: "Erik", 
    password: "123"
};

const create = async () => {
    return (await request.post('/create', dummy));
}

const update = async (token) => {
    return (await request.post(`/update`, {
        newUsername: "Erik",
        newPassword: "321",
        email:"email"
    }, {
            headers:
                {
                    "Cookie": token
                }
    })).data;
}
const login = async () => {
    return (await request.get(`/auth/${dummy.email}/${dummy.password}`)).data
}
const list = async (token) => {
    return (await request.get(`/get`, {
        headers:
            {
                "Cookie": token
            }
    })).data;
}

const bookmark = async (token) => {
    return (await request.get(`/bookmark/j`, {
            headers:
                {
                    "Cookie": token
                }
    })).data;
}

const run = async () => {
    const status = await create();
    if(!status.data.ok) throw new Error("Filled creating user");
    
    const loginStatus = await login();
    if(!loginStatus.ok) throw new Error("Failed to login");
    
    const token = loginStatus.data;

    const user = await list(token);
    if(!user.ok) throw new Error("Failed getting user information");

    const book = await bookmark(token);
    if(!book.ok) throw new Error("Failed getting user information");

    const ok = await update(token);
    if(!ok.ok) throw new Error("Filed updating user");

    console.log("Everything looks good\n", 
    {
        status: status.data,
        loginStatus,
        user,
        book,
        ok,
    });
}
run();
