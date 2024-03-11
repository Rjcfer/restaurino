import getConfig from 'next/config';
import mysql from 'mysql2/promise';
import { Sequelize, DataTypes, ModelCtor, Model } from 'sequelize';
import { userModel } from '@/models/userModel';
import Logger from '@/helpers/logger';

require('dotenv').config();

export const db = {
    initialized: false,
    User: null as unknown as  ModelCtor<Model<any, any>>, 
    initialize
};

// initialize db and models, called on first api request from /helpers/api/api-handler.js
async function initialize() {
    // create db if it doesn't already exist
    Logger.v("initialize db");
    const { DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD } = process.env;

    if (DB_HOST && DB_PORT && DB_NAME && DB_USER && DB_PASSWORD) {
        const connection = await mysql.createConnection({
            host: DB_HOST||"localhost",
            port: parseInt(DB_PORT) || 3306,
            database: DB_NAME || "test",
            user: DB_USER || "root",
            password: DB_PASSWORD || "root"
        });
        // create db if it doesn't already exist
        await connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_HOST}\`;`);
        //connect to db
    const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, 
        { dialect: 'mysql' ,
                 host: DB_HOST,
                  port: parseInt(DB_PORT),
                  dialectModule: require('mysql2')
    });

    // init models and add them to the exported db object
    db.User = userModel(sequelize );

    // sync all models with database
    await sequelize.sync({ alter: true });

    db.initialized = true;
    } else {
        Logger.e("Les informations de connexion ne sont pas correctement définies.");
    }
    
}


