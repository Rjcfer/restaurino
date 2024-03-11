
import {NextRequest, NextResponse, userAgent} from "next/server";
import { Model, Sequelize } from "sequelize";
import bcrypt from "bcrypt";
import { userModel } from "@/models/userModel";
import Logger from "@/helpers/logger";
import { db } from "@/helpers/api/bd";


export async function POST(req:NextRequest) {
  try{
     if (!db.initialized)
                await db.initialize();
    const reqBody = await req.json();
    
     if (!reqBody.email || !reqBody.password) {
      return NextResponse.json({error: 'Email et mot de passe requis'}, {status:400});
    }
     const u = await db.User.findOne({ where: { email: reqBody.email } });
     if(u!==null){
      return NextResponse.json({error: 'Email déjà utilisé'}, {status:409, statusText:"Email déjà utilisé"});
     }
     const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(reqBody.password, salt);
      const user = await db.User.create({
        email: reqBody.email,
        username: reqBody.username,
        firstName: reqBody.firstName,
        lastName: reqBody.lastName,
        password: hashedPassword,
        admin: false
      });
     return  user.save().then((user:Model<any, any>)=>{
        Logger.v("User created: "+ user);
        return NextResponse.json({ success: true }, { status: 200 });
      }).catch((e:any)=>{
        Logger.e("Error creating user: "+ e);
        return NextResponse.json({ success: false }, { status: 500 });
      });
      
  }catch(e){
    console.error(e);
    return NextResponse.json({error: e}, {status:500});
  }
  
}