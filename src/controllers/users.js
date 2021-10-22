const Mongoose = require("mongoose");
const User = Mongoose.model("User");

const { create } = require("../helpers/auth");
const { sanitize } = require("../helpers/sanitize");
const { createHmac, createHash } = require("crypto");

const secret = "627303ef3ba877a33a8c4c962a8cda1c1a9e689c5efc918e5a77cb1f761a545d";

exports.create = async (req, res, next) => {
    var user;
    
    const password = req.body.password;
    const email = req.body.email;
    const username = req.body.username;

    if(!sanitize(email) || !sanitize(password) || !sanitize(username))
        return res.status(403).json({ok:false, data:"Bad request"});
    
    const search = (await User.find({email: email}));

    if(search.length > 0)
        return res.status(200).json({ok:false, data:"User already exists"});
    
    const hashedPassword = await createHmac('sha256', createHash("shake256").update(secret).digest()).update(req.body.password).digest();

    try {
        user = new User({password: hashedPassword.toString("hex"), email, username});
    } catch(e) {
        return res.status(401).json({ok:false, data:"Invalid user"})
    }
    user.save()
           .then(x => {
                res.status(201).send({ok:true, data:x.id});      
           })
           .catch(e =>
            {
                return res.status(400).send({ok:false, data:"Unknown error"})
            });
};

exports.authenticate = async (req, res) => {
    const email = req.params.email;
    const password = req.params.password;
    if(!sanitize(email) || !sanitize(password))
        return res.status(403).json({ok:false, data:"Bad request"});
    
    const hashedPassword = await createHmac('sha256', createHash("shake256").update(secret).digest()).update(password).digest();

    User.findOne({email, password:hashedPassword.toString("hex")})
        .then(async r => {
            console.log(r);
            if(r)
                return res.json({ok:true, data: await create(r._id.toString())})
            else
                return res.status(401).json({ok:false, data:{error: "User not found in"}})
        })
        .catch(r => {
            return res.json({ok:false, data:"Internal error"})
        });   
}

exports.read = async (req, res, next) => {
    // Don't sanitize, because it come from auth, with is trusted
    const id = req.user;
    
    try {
        const user = (await User.find({_id: id}))[0];

        if(!user)
            return res.status(404).json({ok:false, data:"User not found"});
    
        return res.status(200).json({
            ok: true,
            data: {
                id: user.id,
                username: user.username,
                userBookmarks: user.bookmarks
            },
        });
    } catch (error) {
        return res.status(500).json({ok: false, data: {err: "Internal error"}});
    }
};

exports.update = async (req, res, next) => {
    const newUser = req.body;
    if(!sanitize(newUser.email) || !sanitize(newUser.newPassword)|| !sanitize(newUser.newUsername))
        return res.status(403).json({ok:false, data:"Bad request"});

    if(!newUser)
        return res.status(403).json({ok:false, data:"Bad user"});
    
    const hashedPassword = await createHmac('sha256', createHash("shake256").update(secret).digest()).update(newUser.newPassword).digest().toString("hex");

    const user = await  User.updateOne({_id:req.user}, [
        { $set: { "username": newUser.newUsername, "password": hashedPassword, "email": newUser.email } }
    ])
                            .then(r => {
                                if(r.matchedCount == 0)
                                    return res.status(404).json({ok:false, data:"User not found"});
                                return res.status(200).json({ok:true});
                            })
                            .catch(e => {
                                return res.status(500).json({ok:false, data:"Internal error"});
                            });
};

exports.bookmark = (req, res) => {
    const recipe = req.params.id;
    const user = req.user;
    if(!sanitize(recipe) || !sanitize(user))
        return res.status(403).json({ok:false, data:"Bad request"});    
    User.findOne({id:user}).then(doc => {
        if(!doc)
            return res.status(404).json({ok:false, data:"User not found"});
        doc.bookmarks.push(recipe);
        doc.save();
        return res.status(201).json({ok:true});
    });
};
exports.delete = (req, res, next) => {
    const user = req.user;
    User.findOneAndDelete({_id:user})
        .then(() => {
            return res.status(201).json({ok:true});
        })
        .catch((e) => {
            return res.status(500).json({ok: false, data: "Internal error"});
        });
}