var roleRepairer = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.memory.repairing && creep.carry.energy == 0) {
            creep.memory.repairing = false;
            creep.say('collecting');
        }
        if(!creep.memory.repairing && creep.carry.energy == creep.carryCapacity) {
            creep.memory.repairing = true;
            creep.say('repairing');
        }
        if(!creep.memory.repairing) {
            let containersWithEnergy = creep.room.find(FIND_STRUCTURES, {
              filter: (i) => i.structureType == (STRUCTURE_CONTAINER || STRUCTURE_EXTENSION) &&
                             i.store[RESOURCE_ENERGY] > 0
            });
            if(containersWithEnergy && creep.harvest(containersWithEnergy) == ERR_NOT_IN_RANGE) {
                creep.moveTo(containersWithEnergy);
            }
        }
        else {
            const targets = creep.room.find(FIND_STRUCTURES, {
              filter: object => object.hits < object.hitsMax
            });

            targets.sort((a,b) => a.hits - b.hits);

            if(targets.length > 0) {
              if(creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
                  creep.moveTo(targets[0]);
              }
            }
        }
    }
};

module.exports = roleRepairer;
