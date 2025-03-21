import { UserDB } from "@mycelis/database";
export default defineEventHandler(async (event) => {
  return await UserDB.findUser(Number(event.context.params?.id ?? 1));
});
