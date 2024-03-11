import { db } from "@/helpers/api/bd";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
require('dotenv').config();

async function authenticate( username :string , password :string) {
  const user = await db.User.scope('withHash').findOne({ where: { username } }) as any;

  if (!(user && bcrypt.compareSync(password, user.hash))) {
      throw 'Username or password is incorrect';
  }

  // create a jwt token that is valid for 7 days
  const secret = process.env.Secret;
  
  if(secret === undefined){
    throw 'Secret is not defined';
  }
  const token = jwt.sign({ sub: user.id }, secret, { expiresIn: '7d' });

  // remove hash from return value
  const userJson = user.get();
  delete userJson.hash;

  // return user and jwt
  return {
      ...userJson,
      token
  };
}