let ffApp = require('../controllers/controller');
const path = require('path');
const db = require('../models/index')
const Sequelize = require('sequelize')

module.exports = function(app){
    // -------------------------- user routes -----------------------------
    app.get('/users', function(req,res){
        ffApp.getAllUsers(req,res);
    });
    app.post('/user/register', function(req,res){
        ffApp.registerUser(req,res);
    });
    app.put('/user/login', function(req,res){
        ffApp.loginUser(req,res);
    });
    
    app.get('/user/logout', function(req,res) {
        ffApp.logOutUser(req,res);
    })
    app.get('/session', function(req,res){
        res.json({session: req.session.user_id})
    })

    // >>>>>>>>>> get/update/delete user <<<<<<<<<<<
    app.route('/user/:user_id')
    .get(function(req,res){
        ffApp.getUserById(req,res);
    })
    .put(function(req,res){
        ffApp.updateUserInfo(req,res);
    })
    .delete(function(req,res){
        ffApp.deleteUser(req,res);
    });
    
    app.get('/user/teams/:user_id', function(req,res){
        ffApp.getUsersTeams(req,res);
    });
    
    app.get('/team/:team_id',function(req,res){
        ffApp.getUsersTeamById(req,res);
    })
    // ***********************************************************************
    // ------------------------------- LEAGUE LOGIC -----------------------------------

    app.get('/leagues', function(req,res){
        ffApp.getAllLeagues(req,res);
    });
    app.get('/league/:league_id', function(req,res) {
        ffApp.getLeagueById(req,res);
    })
    app.post('/league/create/:user_id', function(req,res){
        ffApp.createLeague(req,res);
    });

    app.post('/league/join/:league_id/:user_id', function(req,res){
        ffApp.joinLeague_createTeam(req,res);
    });

    app.post('/create_team/:league_id/:user_id', function(req,res){
        ffApp.createTeam(req,res)
    })
    // ********************************************************************************
    // -------------------------------- TEAM LOGIC ------------------------------------
    app.get('/teams/all', function(req,res){
        db.team.findAll({}).then(function(result){
            res.json({message:"Success", data: result})
        });
    });
    

    //------------------------------points/stats-----------------------------------
    app.get('/calculate/:week_id', function(req,res){
        ffApp.calculatePoints(req,res);
    });

    app.get('/stats/:week_id', function(req,res){
        ffApp.statsForPlayersByWeek(req,res)
    });

    // app.put('/player/stats', function(req,res){
    //     ffApp.findStatsForPlayer(req,res);
    // })


    app.all("*", (req, res, next) => {
        res.sendFile(path.resolve("./public/dist/public/index.html"))
    });
}