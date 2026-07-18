import { DataTypes } from "sequelize";
import sequelize from "../../config/dataBaseConfig.js"
import Organization from "../organization/Organization.js";

const Lead = sequelize.define(
  'Lead',
  {
    // Model attributes are defined here
    id : {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    organization_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
          model: Organization,
          key: "id"
      }
    },
    source_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    source: {
      type: DataTypes.ENUM('META','LANDING_PAGE','WEBHOOK','GOOGLE_FORMS','TYPEFORM'),
      allowNull: false,
    },
    status: {
      type:DataTypes.ENUM('RECEIVED','QUALIFIED','SALE'),
      defaultValue: 'RECEIVED',
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: true,
      validate: {
        isEmail: true,
      },
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    campaign_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    campaign_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    adset_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    adset_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ad_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ad_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    fbclid: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    fbc: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    fbp: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    utm_source: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    utm_medium: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    utm_campaign: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    utm_content: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    utm_term: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    metadata: {
        type: DataTypes.JSONB,
        allowNull:true
    },
    value: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true,
    },
    currency:{
      type:DataTypes.STRING,
      defaultValue:"BRL"
    }
  },
  {
    sequelize,
    modelName: "Lead",
    tableName: "leads",
    timestamps: true,
    underscored: true,
    indexes: [
        {fields: ['email']},
        {fields:['phone']},
        {fields:['status']},
        {fields:['campaign_id']},
        {fields:["source"]}
    ]
  }
 
);

Organization.hasMany(Lead,{
    foreignKey:"organization_id",
    as:"leads"
});

Lead.belongsTo(Organization,{
    foreignKey:"organization_id",
    as:"organization"
});

export default Lead;