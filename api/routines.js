const express = require('express');
const router = express.Router();
const { requireUser } = require('./utils');
const { getAllPublicRoutines, createRoutine, updateRoutine, getRoutineById } = require('../db/routines');

// GET /api/routines
router.get('/', async (req, res, next) => {
try {
    const routines = await getAllPublicRoutines()
    res.status(200).send(routines)
} catch ({error, name, message}) {
    next({ error, name, message });
}
})

// POST /api/routines
router.post('/', requireUser, async (req, res, next) => {
    try {
        const createdRoutine = await createRoutine({
            creatorId: req.user.id,
            isPublic: req.body.isPublic,
            name: req.body.name,
            goal: req.body.goal
        });
        if (!createdRoutine) {
            next({
                error: "Creation Error",
                name: "RoutineNotCreated",
                message: "Routine could not be created"
            })
        } else {
        res.status(200).send(createdRoutine);
        }

    } catch ({error, name, message}) {
        next({ error, name, message });
    }
})

// PATCH /api/routines/:routineId
router.patch('/:routineId', requireUser, async (req, res, next) => {
    try {
        const { routineId } = req.params
        //check if user is the creator
        const routineCreator = await getRoutineById(routineId)
        if (routineCreator.creatorId !== req.user.id) {
            res.status(403).send({
                error: "Unauthorized",
                name: "Invalid User",
                message: `User ${req.user.username} is not allowed to update ${routineCreator.name}`
            })
        }

        const updatedRoutine = await updateRoutine({
            id: routineId,
            ...req.body
        })
        res.status(200).send(updatedRoutine);

    } catch ({error, name, message}) {
        next({error, name, message}); 
    }
})

// DELETE /api/routines/:routineId

// POST /api/routines/:routineId/activities

module.exports = router;
