import { UserDB } from "@mycelis/database";
export default defineEventHandler(async (event) => {
  let { name, email } = await readBody(event);
  console.log(name, email);
  return await UserDB.addUser(name, email);
});
