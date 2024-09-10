import { DataTypes, Model } from "sequelize";
import connectToDB from "./db.js";
import url from 'url';
import util from 'util';

const db = await connectToDB('postgresql:///mtbmt');

class User extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  };
};
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING, // is STRING the best to use here?
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nickname: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    prefersKm: {
      type: DataTypes.BOOLEAN,
      allowNull: true, // Should this be required
    }
  },
  {
    modelName: 'user',
    sequelize: db,
  }
);

class Build extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  };
};
Build.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true, // if Null, set to frame name?
    },
    isPrimary: {
      type: DataTypes.BOOLEAN,
    },
    isActive: { // Might not be necessary
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    notes: {
      type: DataTypes.TEXT,
    }
  },
  {
    modelName: 'build',
    sequelize: db,
  }
);

