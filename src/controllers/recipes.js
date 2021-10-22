const Mongoose = require("mongoose");
const {sanitize} = require("../helpers/sanitize");

const Recipes = Mongoose.model("Recipe");
let tagsCache = [];

(async function getTags() {
    const docs = await Recipes.find();

    for (let doc in docs) {
        for (let tag in docs[doc].tags) {
           if(!tagsCache.includes( docs[doc].tags[tag]))
            tagsCache.push (docs[doc].tags[tag]);
        }
    }
})()

module.exports.get = async (req, res) => {
    const recipeId = req.params.id;
    Recipes.findOne({_id:recipeId})
            .then(recipe => {
                if(recipe)
                    return res.status(201).json({ok: true, data: recipe});
                else
                    return res.status(404).json({ok: false, data: {err: "This recipe does not exist"}});
            })
            .catch(e =>{
                console.log(e);
                return res.status(302).json({ok:true, data: "Wrong id"});
            });
}
module.exports.tags = async(req, res) => {
    return res.status(200).json({ok:true, data: tagsCache});
};

module.exports.find = async (req, res) => {

    if(!req.params || !sanitize(req.params.term))
        return res.status(403).json({ok: false, data: {err: "Bad request"}});

    const search_term = new RegExp(`(${req.params.term.split(";").join("|")})`, "i");

    Recipes.find({$or:[{tags: search_term},{ingredients: search_term},{howto:search_term}, {name:search_term}]})
            .then(recipe => {
                if(recipe)
                
                    return res.status(201).json({ok: true, data: recipe});
                else
                    return res.status(404).json({ok: false, data: {err: "No recipe found whit this terms"}});
            })
            .catch(e => {
                console.log(e);
                return res.status(500).json({ok:false, data: "Internal error"});
            })
}

module.exports.post = async (req, res) => {
    const recipe = req.body;
    await Recipes.create(recipe)
                 .then( recipe => {
                    for (let tag in recipe.tags)
                        if( !tagsCache.includes (recipe.tags[tag]) )
                            tagsCache.push(recipe.tags[tag]);
                    return res.status(201).json({ok: true, data: recipe.id});
                 })
                 .catch((e) => {
                    console.log(e);
                    return res.status(403).json({ok: false, data: "Invalid recipe"})
                 })
}