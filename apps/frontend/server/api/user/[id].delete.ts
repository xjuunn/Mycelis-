import { UserDB } from "@mycelis/database";
export default defineEventHandler(async (event) => {
  return await UserDB.delUser(Number(event.context.params?.id ?? 0));
});
