import { DataTypes } from "sequelize";
import sequelize from "../../config/dataBaseConfig.js"
import Lead from "../lead/Lead.js";

const Organization = sequelize.define(
  'Organization',
  {
    // Model attributes are defined here
    id : {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    api_key: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:true
    },
    status: {
      type:DataTypes.ENUM('ACTIVE','INACTIVE','SUSPENDED'),
      allowNull: false,
      defaultValue: 'ACTIVE'
    },
    description: {
    type: DataTypes.STRING
    }
  },
  {
    sequelize,
    modelName: "Organization",
    tableName: "organizations",
    timestamps: true,
    indexes: [
        {
            unique: true,
            fields: ["api_key"]
        }
    ]
  } 
);

export default Organization;