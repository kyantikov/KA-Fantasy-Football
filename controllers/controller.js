const db = require('../models/index')
const Sequelize = require('sequelize')
const session = require('express-session')

module.exports = {
    // ------------------------------- User Logic ------------------------------
    getAllUsers: function (req, res) {
        db.user.findAll({}).then(function (result) {
            res.json(result);
        });
    },

    registerUser: function (req, res) {
        db.user.create(req.body)
        .then(function (result) {
            // console.log(result);
            req.session.user_id = result.dataValues.id
            console.log(req.session.user_id);
            
            res.json({ message: "success", data: result })
        }).catch(Sequelize.ValidationError, function (err) {
            res.json({ message: "error", err })
        });
        
    },

    updateUserInfo: function(req,res){
        db.user.update(req.body,{
            where: {
                id:req.params.user_id
            }
        }).then(function(result){
            res.json({message:"success", data:result});
        })
    },

    getUserById: function(req,res) {
        db.user.findAll({
            where: {
                id: req.params.user_id
            }
        }).then(function(result){
            res.json({message:"success", data:result})
        })
    },

    deleteUser: function (req,res){
        db.user.destroy({
            where: {
                id: req.params.user_id
            }
        }).then(function(result){
            res.json({message:"success", data:result})
        });
    },

    // getUsersTeams: function(req,res){
    //     // console.log("hereeeeeeerererererere")
    //     db.user.findAll({
    //         where:{
    //             id:req.params.user_id
    //         },
    //         include: [{
    //             model: db.team,
    //             model: db.league
    //         }]
    //     })
    //     .then(function(result){
    //         res.json({message:"success", data:result})
    //     })
    //     .catch(function(err){
    //         res.json({message:"error", err})
    //     });
    // },
    getUsersTeams: function(req,res){
        db.team.findAll({
            where: {
                user_id:req.params.user_id
            },
            include:[{
                model:db.league,
            }]
        }).then(function(result){
            res.json({message:"success", data:result})
        })
    },

    getUsersTeamById: function(req,res){
        db.team.findAll({
            where: {
                id: req.params.team_id,
            },
            include:[{
                model:db.league
            }]
        }).then(function(result){
            res.json({message:"success", data:result})
        });
    },


    loginUser: function(req,res){
        db.user.findAll({
            where:{
                email:req.body.email
            }
        })
        .then(function(result){
            if(result.length === 0){
                res.json({message: 'error', error: "User does not exist"})
            } else if (req.body.password !== result[0].dataValues.password){
                console.log("password does not match")
                res.json({message:"error", error: 'Password does not match our records'})
            } else {
                req.session.user_id = result[0].dataValues.id
                console.log("user exists, pw matches ")
                console.log('Curry', req.session.user_id)
                res.json({message:"success", data:result, session_id: req.session.user_id});
            }
        })
        .catch(function(err){
            res.json({message:"error", err})
        })
    },
    
    logOutUser: function(req, res) {
        console.log('-----------------', req.session.user_id)
        req.session.destroy();
    },

    // ********************************************************************************
    // ------------------------------ league logic ------------------------------------
    getAllLeagues: function(req,res){
        db.league.findAll({}).then(function(result){
            res.json({message:"success", data:result})
        })
    },

    getLeagueById: function(req,res) {
        db.league.findAll({
            where: {
                id: req.params.league_id
            }
        })
        .then(function(result){
            res.json({message:"success", data:result})
        })
    },

    createLeague: function (req,res){
        let league = req.body;
        league.user_id = req.params.user_id;
        db.league.create(league)
        .then(function(result){
            // figure out how to run this query in one database transaction 
            res.json({message:"success", data:result})
            let team = {league_id:result.id, user_id:req.params.user_id}
            db.team.create(team).then(function(result){
                res.json({message:"success", data:result})
            })
            .catch(function(err){
                res.json({message:"error", err})
            })
        })
        .catch(Sequelize.ValidationError, function(err){
            res.json({message:"error", err})
        }); 
    },

    joinLeague_createTeam: function(req,res){
        db.league.findAll({
            where:{
                id: req.params.league_id
            }
        })
        .then(function(result){
            var maxTeams = result[0].dataValues.max_teams
            db.team.findAll({
                where:{
                    league_id:req.params.league_id
                }
            })
            .then(function(result){
                // console.log('------------------',result.length)
                if (result.length < maxTeams){
                    let inLeague = false;
                    for (let team of result){
                        console.log(team.dataValues.user_id)
                        // console.log(result.length)
                        if (team.dataValues.user_id == req.params.user_id){
                            inLeague=true;
                        } 
                    }
                    if (inLeague){
                        res.json({message: 'error', err: 'User already in league'})
                    } else{
                        let team = {
                            team_name: req.body.team_name, 
                            league_id: req.params.league_id,
                            user_id: req.params.user_id
                        }
                        db.team.create(team).then(function(result){
                            res.json({message: 'success', data: result})
                        })
                    }
                } else{
                    res.json({message: 'error', err: 'Too many teams'})
                }
            })
        })
    },

    createTeam: function(req,res){
        let team = {team_name: "new team",league_id:req.params.league_id, user_id:req.params.user_id}
        db.team.create(team).then(function(result){
            console.log(result)
        })
    },

    // calculatePoints: function(req,res){
    //     db.stat.findAll({
    //         where:{
    //             week_id:req.params.week_id,
    //             // team_id:req.params.team_id
    //         },
    //         include: [{
    //             model: db.player,
    //             include: [{model:db.team}],
    //         }]
    //     }).then(function(result){
    //         res.json({message:"success", data:result})
    //     })
    // }

    statsForPlayersByWeek: function(req,res){
        db.stat.findAll({
            where:{
                week_id:req.params.week_id
            },
            include:[{
                model: db.player
            }]
        }).then(function(result){
            let statsForWeek = []
            for (let stat of result){
                statsForWeek.push(stat.dataValues)
            }
            res.json({message:"success", data:statsForWeek})
        })
    },

    // findStatsForPlayer: function(req,res){
    //     db.player.findAll({
    //         where:{
    //             first_name: req.body.first_name,
    //             last_name:req.body.last_name
    //         },
    //         include: [{
    //             model:db.stat,
    //             include:[{
    //                 model:db.week,
    //             }]
    //         }]
    //     }).then(function(result){
    //         console.log(result)
    //     })
    // }

}