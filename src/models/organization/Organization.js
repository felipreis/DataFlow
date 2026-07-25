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
    },
    pixel_id:{
      type:DataTypes.STRING,
      allowNull:true,
    },
    access_token:{
      type:DataTypes.STRING,
      allowNull:true
    },
    test_event_code:{
      type:DataTypes.STRING,
      allowNull:true,
    },
    spreadsheet_enabled: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    spreadsheet_id: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    spreadsheet_range: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    spreadsheet_sync_interval: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1, // minutos
    },
    last_spreadsheet_sync: {
        type: DataTypes.DATE,
        allowNull: true,
    },
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