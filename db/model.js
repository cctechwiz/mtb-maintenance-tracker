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
      allowNull: false, // if Null, set to frame name?
    },
    isPrimary: {
      type: DataTypes.BOOLEAN,
    },
    isActive: { // Might not be necessary
      type: DataTypes.BOOLEAN,
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

class Part extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  };
};
Part.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastServiced: {
      type: DataTypes.DATE, // DATE or DATEONLY?
    },
    milesInterval: {
      type: DataTypes.INTEGER, // Is there ever a case where this would be a float?
    },
    hoursInterval: {
      type: DataTypes.INTEGER
    },
    mfgPartNum: {
      type: DataTypes.STRING,
    },
    serialNum: {
      type: DataTypes.STRING, 
    },
    brand: {
      type: DataTypes.STRING,
    },
    modelYear: {
      type: DataTypes.INTEGER, // Should this be a STRING? Is there a way to limit digits for an INTEGER?
    },
    notes: {
      type: DataTypes.TEXT,
    }
  },
  {
    modelName: 'part',
    sequelize: db,
  }
);

class PartType extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  };
};
PartType.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    modelName: 'part_type', // Should this be camelCase or snake_case?
    sequelize: db,
  }
);

class Service extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  };
};
Service.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    notes: { // Should this allow null?
      type: DataTypes.TEXT,
    }
  },
  {
    modelName: 'service',
    sequelize: db,
  }
);

