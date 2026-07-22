import { DataTypes } from "sequelize";
import sequelize from '../../config/dataBaseConfig.js'
import Lead from "../lead/Lead.js";
import Organization from "../organization/Organization.js";


const ConversionEvent = sequelize.define(
  'ConversionEvent',
  {
    // Model attributes are defined here
    id : {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    lead_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
          model: Lead,
          key: "id"
      }
    },
    platform: {
      type: DataTypes.ENUM('META','GOOGLE','LINKEDIN'),
      defaultValue: 'META',
      allowNull: false,
    },
    event_name: {
      type: DataTypes.ENUM('Purchase','QualifiedLead','CompleteRegistration'),
      allowNull: false,
    },
    status: {
      type:DataTypes.ENUM('PENDING','PROCESSING','SENT','FAILED'),
        defaultValue: 'PENDING',
      allowNull: false,
    },
    payload: {
        type:DataTypes.JSONB,
        allowNull:true,
    },
    sent_at:{
        type:DataTypes.DATE,
        allowNull:true,
    },
    error_message: {
        type:DataTypes.STRING,
        allowNull:true,
    },
    attempts: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    processed_at: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    organization_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
          model: Organization,
          key: "id"
    }
  },
  {
    indexes: [
    {fields: ['status']},
    {fields: ['platform']},
    {fields: ['lead_id']}
    ],
    sequelize,
    modelName: "ConversionEvent",
    tableName: "conversion_events",
    timestamps: true,
  } 
);


Lead.hasMany(ConversionEvent,{
    foreignKey: "lead_id",
})

ConversionEvent.belongsTo(Lead,{
    foreignKey:"lead_id"
})

Organization.hasMany(ConversionEvent, {
    foreignKey: "organization_id"
});

ConversionEvent.belongsTo(Organization, {
    foreignKey: "organization_id"
});

export default ConversionEvent;