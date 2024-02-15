
import {NextRequest, NextResponse, userAgent} from "next/server";
import { Model, Sequelize } from "sequelize";
import bcrypt from "bcrypt";
import { userModel } from "@/models/userModel";
import { db } from "@/bdConfig/dbConfig";



export async function POST(req:NextRequest) {
  try{
    console.log(req);
    console.log("toto la req ici")
    const reqBody = await req.json();
    const { email, password } = reqBody;
    console.log(reqBody);

    if (!email || !password) {
      return NextResponse.json({error: 'Email et mot de passe requis'}, {status:400});
    }
     const u = await db.User.findOne({ where: { email: email } });
     if(u){
      return NextResponse.json({error: 'Email déjà utilisé'}, {status:400});
     }
     const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);
      const user = await db.User.create({
        email: email,
        password: hashedPassword,
        admin: false
      }).then((user:Model<any, any>) => {
        return NextResponse.json({success: true},{status:200});
      }
      ).catch((e:any) => {
        return NextResponse.json({error: e}, {status:500});
      }
      );
  }catch(e){
    console.error(e);
    return NextResponse.json({error: e}, {status:500});
  }
  
}