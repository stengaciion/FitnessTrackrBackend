const express = require('express');
const router = express.Router();
const { createActivity, getAllActivities } = require('../db/activities')
const { requireUser } = require("./utils.js");

// GET /api/activities/:activityId/routines

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
        const createdActivity = await createActivity(req.body)
        res.status(200).send(createdActivity)
    } catch ({error, name, message}) {
        next({name, error, message})
    }
})

// PATCH /api/activities/:activityId

module.exports = router;
