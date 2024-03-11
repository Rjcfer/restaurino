import { apiHandler } from "@/helpers/api/api-handler";
import Logger from "@/helpers/logger";
import { usersRepo } from "@/helpers/repository/user-repo";



export async function POST(req:any, res:any){
    const users = await usersRepo.getAll();
    return res.status(200).json(users);

}
