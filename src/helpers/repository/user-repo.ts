import getConfig from 'next/config';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { db } from '../api/bd';
import {  userModel } from '@/models/userModel';
import { DataTypes } from 'sequelize';
import Logger from '../logger';


const { serverRuntimeConfig } = getConfig();

export const usersRepo = {
    authenticate,
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function authenticate( username :string , password :string) {
    const user = await db.User.scope('withHash').findOne({ where: { username } }) as any;

    if (!(user && bcrypt.compareSync(password, user.hash))) {
        throw 'Username or password is incorrect';
    }

    // create a jwt token that is valid for 7 days
    const token = jwt.sign({ sub: user.id }, serverRuntimeConfig.secret, { expiresIn: '7d' });

    // remove hash from return value
    const userJson = user.get();
    delete userJson.hash;

    // return user and jwt
    return {
        ...userJson,
        token
    };
}

async function getAll() {
    return await db.User.findAll();
}

async function getById(id:any) {
    return await db.User.findByPk(id);
}

async function create(params:any) {
    // validate
    if (await db.User.findOne({ where: { username: params.username } })) {
        throw 'Username "' + params.username + '" is already taken';
    }

    const user = new db.User;

      user.setDataValue("username", params.username);
      user.setDataValue("firstName", params.firstName);
      user.setDataValue("lastName", params.lastName);
      user.setDataValue("email", params.email);
      user.setDataValue("admin", params.admin);
     
    if (params.password) {
      user.setDataValue("hash", bcrypt.hashSync(params.password, 10));
    }

    // save user
    await user.save();
}

async function update(id:any, params:any) {
    const user = await db.User.findByPk(id);

    // validate
    if (!user) throw 'User not found';
    if (user.getDataValue("username") !== params.username && await db.User.findOne({ where: { username: params.username } })) {
        throw 'Username "' + params.username + '" is already taken';
    }

    // hash password if it was entered
    if (params.password) {
        params.hash = bcrypt.hashSync(params.password, 10);
    }

    // copy params properties to user
    Object.assign(user, params);

    await user.save();
}

async function _delete(id:any) {
    const user = await db.User.findByPk(id);
    if (!user) throw 'User not found';

    // delete user
    await user.destroy();
}