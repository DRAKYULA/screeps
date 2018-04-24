var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.memory.unloading && creep.carry.energy == 0) {
            creep.memory.unloading = false;
            creep.say('harvesting');
        }
        if(!creep.memory.unloading && creep.carry.energy == creep.carryCapacity) {
            creep.memory.unloading = true;
            creep.say('unloading');
        }
        if(!creep.memory.unloading) {
            var source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
            if(source && creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            }
        }
        else {
            var spawnTarget = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_SPAWN) && structure.energy < structure.energyCapacity;
                }
            });
            var containerTarget = creep.pos.findPathTo(24,39, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_CONTAINER) && structure.energy < structure.energyCapacity;
                }
            });
            
            if(spawnTarget) {
                if(creep.transfer(spawnTarget, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(spawnTarget);
                }
            } else {
                if (creep.transfer(containerTarget, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(containerTarget);
                }
            }

        }
    }
};

module.exports = roleHarvester;
