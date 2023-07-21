const client = require("./client");

// database functions

// user functions
async function createUser({ username, password }) {
  try {
    const {rows: [user]} = await client.query(`
    INSERT INTO users (username, password)
    VALUES ($1, $2)
    ON CONFLICT (username) DO NOTHING RETURNING username;`,
    [username, password]);
    return user;
  } catch (error) {
    return (error);
  }
}

async function getUser({ username, password }) {
  try {
    const {rows: [verifyUser]} = await client.query(`
    SELECT id, username, password FROM users WHERE username=$1`, [username]);
    if (verifyUser.password !== password) {
      // throw new Error ("Passwords do not match our records") --> Error didn't pass test so I changed to return null;
      return null;
    } else if (!verifyUser) {
      throw new Error ("User not found")
    } else if (verifyUser.password === password) {
     const {password, ...rest} = verifyUser
     const user = rest
     return user;
    }
  } catch (error) {
    return (error);
  }
}

async function getUserById(userId) {
try {
  const { rows: user } = await client.query(
    `
    SELECT id, username
    FROM users
    WHERE id=$1;`,
    [userId]
  );
  return user;
} catch (error) {
  return error;
}
}

async function getUserByUsername(userName) {

}

module.exports = {
  createUser,
  getUser,
  getUserById,
  getUserByUsername,
}
