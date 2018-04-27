var roleBuilder = require('role.builder');

module.exports = {
    // a function to run the logic for this role
    /** @param {Creep} creep */
    run: function(creep) {
        // if creep is trying to repair something but has no energy left
        if (creep.memory.repairing == true && creep.carry.energy == 0) {
            // switch state
            creep.memory.repairing = false;
        }
        // if creep is harvesting energy but is full
        else if (creep.memory.repairing == false && creep.carry.energy == creep.carryCapacity) {
            // switch state
            creep.memory.repairing = true;
        }

        if (creep.memory.repairing == true) {
            var structure = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (s) => s.hits < s.hitsMax && s.structureType != STRUCTURE_WALL
            });

            if (structure != undefined) {
                if (creep.repair(structure) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(structure);
                }
            }
            else {
                roleBuilder.run(creep);
            }
        }
        else {
            creep.getEnergy(true, true);
        }
    }
};
