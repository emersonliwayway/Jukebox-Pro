import db from "#db/client";
import bcrypt from "bcrypt";

export async function createUser(username, password) {
  const sql = `
    INSERT INTO users
        (username, password)
    VALUES
        ($1, $2)
    RETURNING *`;

  const hashedPassword = await bcrypt.hash(password, 10);
  const {
    rows: [user],
  } = await db.query(sql, [username, hashedPassword]);
  return user;
}
