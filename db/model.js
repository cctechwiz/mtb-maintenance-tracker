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

// Is this an association table? Is it necessary to make when using sequelize?
class Installation extends Model { 
  [util.inspect.custom]() {
    return this.toJSON();
  };
};
Installation.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  },
  {
    modelName: 'installation',
    sequelize: db,
  }
);

class Ride extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  };
};
Ride.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nickname: {
      type: DataTypes.STRING,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING
    },
    miles: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    minutes: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  },
  {
    modelName: 'ride',
    sequelize: db,
  }
);

// Is this an association table? Is it necessary to make when using sequelize?
class PartRide extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  };
};
PartRide.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  },
  {
    modelName: 'part_rides', // Should this be camelCase or snake_case?
    sequelize: db,
  }
);

// Feature may be unnecessary
class RideCondition extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  };
};
RideCondition.init(
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
  },
  {
    modelName: 'ride_condition', // Should this be camelCase or snake_case?
    sequelize: db,
  }
);

// Feature may be unnecessary 
class RideStyles extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  };
};
RideStyles.init(
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
    modelName: 'ride_style', // Should this be camelCase or snake_case?
    sequelize: db,
  }
);

// Only necessary if RideCondition feature is implemented.
class ConditionMultiplier extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  };
};
ConditionMultiplier.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    multiplier: {
      type: DataTypes.FLOAT,
      allowNull: false,
    }
  },
  {
    modelName: 'condition_multiplier',
    sequelize: db,
  }
);

// Only necessary if RideStyle feature is implemented.
class StyleMultiplier extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  };
};
StyleMultiplier.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    multiplier: {
      type: DataTypes.FLOAT,
      allowNull: false,
    }
  },
  {
    modelName: 'style_multiplier',
    sequelize: db,
  }
);