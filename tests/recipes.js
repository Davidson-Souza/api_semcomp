const axios = require("axios").default;

const request = axios.create({
    baseURL: "http://apisemcomp.sytes.net:8080/api/v1/recipes/"
})

const dummy = {
    name: "Pão de queijo",
    ingredients: ['ing1', 'ing2'], 
    howto: "123",
    tags: ['a', 'b', 'c']
};


const run = async () => {
    const token = (await axios.get("http://apisemcomp.sytes.net:8080/api/v1/users/auth/email/321")).data.data;

    const res = await request.post('/post', dummy, {
        headers:{
            Cookie:token
        }
    });

    const get = await request.get('/find/a');

    const recipe = await request.get(`/read/${get.data.data[0]._id}`);
    console.log({
        "res": res.data,
        "get": get.data.data,
        "recipe": recipe.data.data
    })
}

run();