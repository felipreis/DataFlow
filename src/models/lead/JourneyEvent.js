import { DataTypes } from "sequelize";
import sequelize from "../../config/dataBaseConfig.js"
import Lead from "./Lead.js";


const JourneyEvent = sequelize.define(
  'JourneyEvent',
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
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    event: {
      type: DataTypes.ENUM('LEAD_RECEIVED','STATUS_CHANGED','SENT_TO_CRM','CRM_UPDATED','SALE_CONFIRMED', 'META_EVENT_SENT', 'GOOGLE_EVENT_SENT'),
      allowNull: false,
      defaultValue: 'LEAD_RECEIVED',
    },
    payload: {
      type:DataTypes.JSONB,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "JourneyEvent",
    tableName: "journey_events",
    timestamps: true,
  } 
);

Lead.hasMany(JourneyEvent, { foreignKey: 'lead_id'})
JourneyEvent.belongsTo(Lead,{ foreignKey: 'lead_id' })


export default JourneyEvent;