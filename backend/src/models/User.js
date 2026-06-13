
const pool = require("../config/database");

const createUser = async (
  name,
  email,
  password
) => {
  const [result] = await pool.execute(
    `
      INSERT INTO users
      (name,email,password)
      VALUES (?,?,?)
    `,
    [name, email, password]
  );

  return result.insertId;
};

const findUserByEmail = async (email) => {
  const [rows] = await pool.execute(
    `
      SELECT *
      FROM users
      WHERE email = ?
    `,
    [email]
  );

  return rows[0];
};

const findUserById = async (id) => {
  const [rows] = await pool.execute(
    `
      SELECT id,name,email
      FROM users
      WHERE id = ?
    `,
    [id]
  );

  return rows[0];
};

module.exports = {
  createUser,
  findUserByEmail,
  findUserById
};