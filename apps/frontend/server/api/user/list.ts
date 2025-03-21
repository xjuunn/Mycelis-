import { UserDB } from "@mycelis/database";
export default defineEventHandler(async (event) => {
  return await UserDB.findAll();
});
