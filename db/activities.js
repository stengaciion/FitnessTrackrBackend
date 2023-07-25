const client = require('./client');

// database functions
async function createActivity({ name, description }) {
  // return the new activity
  try {
    const {rows: [newActivity]} = await client.query(
      `INSERT INTO activities (name, description) 
    VALUES ($1, $2)
    RETURNING *;
`,
      [name, description]
    );
    return newActivity;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getAllActivities() {
  // select and return an array of all activities
   try {
    const { rows } = await client.query(`
  SELECT * FROM activities;`);
    return rows;
   } catch (error) {
    return error
   }
}

async function getActivityById(id) {
  try {
    const {
      rows: [activity],
    } = await client.query(
      `
  SELECT * FROM activities
  WHERE id=$1;`,
      [id]
    );
    return activity;
  } catch (error) {
   return error
  }
}

async function getActivityByName(name) {
  try {
    const {
      rows: [activity],
    } = await client.query(
      `
  SELECT * FROM activities
  WHERE name=$1;`,
      [name]
    );
    return activity;
  } catch (error) {
    return error
  }
}

// used as a helper inside db/routines.js
async function attachActivitiesToRoutines(routines) {
  // for (const routine of routines) {
  //   const activities = await getActivitiesByRoutineId(routine.id);
  //   routine.activities = activities;
  // }
  // return routines;
}

async function updateActivity({ id, ...fields }) {
  const { name, description } = fields
  // don't try to update the id
  try {
    if (name && description) {
    const { rows: [updatedActivity] } = await client.query(`
    UPDATE activities
    SET name=$1, description=$2
    WHERE id=${id}
    RETURNING *`
    , [name, description])
    return updatedActivity
    } else if (name) {
      const {
        rows: [updatedActivity]
      } = await client.query(
        `
    UPDATE activities
    SET name=$1
    WHERE id=${id}
    RETURNING *`,
        [name]
      );
      return updatedActivity;
    } else if (description) {
      const {
        rows: [updatedActivity]
      } = await client.query(
        `
    UPDATE activities
    SET description=$1
    WHERE id=${id}
    RETURNING *`,
        [description]
      );
      return updatedActivity;
    } else {
      return
    }
  } catch (error) {
    return error
  }
  // do update the name and description
  // return the updated activity
}

module.exports = {
  getAllActivities,
  getActivityById,
  getActivityByName,
  attachActivitiesToRoutines,
  createActivity,
  updateActivity,
};
