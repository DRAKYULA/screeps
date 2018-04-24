var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.upgrading && creep.carry.energy == 0) {
            creep.memory.upgrading = false;
            creep.say('harvesting');
        }
        if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
            creep.memory.upgrading = true;
            creep.say('upgrading');
        }

        if(creep.memory.upgrading) {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
        else {
            // let containersWithEnergy = creep.room.find(FIND_STRUCTURES, {
            //   filter: (i) => i.structureType == (STRUCTURE_CONTAINER || STRUCTURE_EXTENSION) &&
            //                  i.store[RESOURCE_ENERGY] > 0
            // });
            
            // if(containersWithEnergy && creep.harvest(containersWithEnergy) == ERR_NOT_IN_RANGE) {
            //     creep.moveTo(containersWithEnergy, {visualizePathStyle: {stroke: '#ffaa00'}});
            // }
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[1], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
    }
};

module.exports = roleUpgrader;
