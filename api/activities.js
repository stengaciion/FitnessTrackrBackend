const express = require('express');
const router = express.Router();
const { createActivity, getAllActivities, getActivityByName } = require('../db/activities')
const { getPublicRoutinesByActivity } = require('../db/routines')
const { requireUser } = require("./utils.js");

// GET /api/activities/:activityId/routines
router.get('/:activityId/routines', async (req, res, next) => {
    const { activityId } = req.params;
    try {
        // const activity = getPublicRoutinesByActivity(activityId)
        // res.status(200).send(activity)
    } catch ({error, name, message}) {
        next({error, name, message})        
    }
})

// GET /api/activities
router.get('/', async (req, res, next) => {
    try {
        const activities = await getAllActivities()
        res.status(200).send(activities)
    } catch ({ error, name, message}) {
        next({ error, name, message})
    }
})

// POST /api/activities
router.post('/', requireUser, async (req, res, next) => {
    try {
        //check for existing activity
        const activityExists = await getActivityByName(req.body.name)
        if (activityExists) {
            next({
                error: "Activity cannot be created",
                name: "Duplicate Activity",
                message: `An activity with name ${req.body.name} already exists`
            })
        }
        const createdActivity = await createActivity(req.body)
        res.status(200).send(createdActivity)

    } catch ({error, name, message}) {
        next({name, error, message})
    }
})

// PATCH /api/activities/:activityId

module.exports = router;
