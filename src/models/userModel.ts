import { DataTypes, Model, ModelOptions, Sequelize } from "sequelize";

 export  function userModel(sequelize:Sequelize) {
    const attributes = {
      username: { type: DataTypes.STRING, allowNull: false,required:{true:"Username is required"}},
      password: { type: DataTypes.STRING, allowNull: false,required:{true:"Password is required"}},
      firstName: { type: DataTypes.STRING, allowNull: false ,required:{true:"Firstname is required"}},
      lastName: { type: DataTypes.STRING, allowNull: false,required:{true:"Lastname is required"}},
      email:{type:DataTypes.STRING, allowNull:false, unique:true,required:{true:"Email is required"}},
      admin : {type:DataTypes.BOOLEAN, allowNull:false,required:{true:"Admin is required"}},
      resetPasswordToken:{type:DataTypes.STRING, allowNull:true},
      resetPasswordExpires:{type:DataTypes.DATE, allowNull:true},
      verifyToken:{type:DataTypes.STRING, allowNull:true},
      verifyExpires:{type:DataTypes.DATE, allowNull:true},
    };

    return sequelize.define('User', attributes);
}
