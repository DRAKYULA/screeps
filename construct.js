/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('construct');
 * mod.thing == 'a thing'; // true
 */
var construct = {
    spawn: function(spawnRole, numSpawnsRequired, body){
        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader' );
    if(upgraders.length < 1) {
        var newName = 'Upgrader' + Game.time;
        console.log('Spawning new upgrader: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName, 
            {memory: {role: 'upgrader'}});
    }
    }
}
module.exports = {

};