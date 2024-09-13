import { DataTypes, Model } from "sequelize";
import connectToDB from "./db.js";
import url from 'url';
import util from 'util';

export const db = await connectToDB('postgresql:///mtbmt');

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
    name: {
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

class PartCategory extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  };
};
PartCategory.init(
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
    modelName: 'part_category',
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
    modelName: 'part_type',
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

// // Not needed with '.belongsToMany' relationship with Build and Part
// class Installation extends Model { 
//   [util.inspect.custom]() {
//     return this.toJSON();
//   };
// };
// Installation.init(
//   {
//     id: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       autoIncrement: true,
//     },
//   },
//   {
//     modelName: 'installation',
//     sequelize: db,
//   }
// );

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

// // Not needed with '.belongsToMany' relationship with Part and Ride
// class PartRide extends Model {
//   [util.inspect.custom]() {
//     return this.toJSON();
//   };
// };
// PartRide.init(
//   {
//     id: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       autoIncrement: true,
//     },
//   },
//   {
//     modelName: 'part_rides',
//     sequelize: db,
//   }
// );

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
    modelName: 'ride_condition',
    sequelize: db,
  }
);

// Feature may be unnecessary 
class RideStyle extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  };
};
RideStyle.init(
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

// Builds foreign key to Users
User.hasMany(Build, { foreignKey: 'userId' });
Build.belongsTo(User, { foreignKey: 'userId' })

// Parts foreign key to Users
User.hasMany(Part, { foreignKey: 'userId' });
Part.belongsTo(User, { foreignKey: 'userId' });

// PartsType foreign key to PartCategory
PartCategory.hasMany(PartType, { foreignKey: 'categoryId'});
PartType.belongsTo(PartCategory, { foreignKey: 'categoryId'})

// Parts foreign key to PartType
PartType.hasMany(Part, { foreignKey: 'typeId' });
Part.belongsTo(PartType, { foreignKey: 'typeId' });

// Services foreign key to Parts
Part.hasMany(Service, { foreignKey: 'partId' });
Service.belongsTo(Part, { foreignKey: 'partId' });

// Rides foreign key to Users
User.hasMany(Ride, { foreignKey: 'userId' });
Ride.belongsTo(User, { foreignKey: 'userId' });

// OPTIONAL: Rides foreign key to RideConditions
RideCondition.hasMany(Ride, { foreignKey: 'conditionId' });
Ride.belongsTo(RideCondition, { foreignKey: 'conditionId' });

// OPTIONAL: Rides foreign key to RideStyles
RideStyle.hasMany(Ride, { foreignKey: 'styleId' });
Ride.belongsTo(RideStyle, { foreignKey: 'styleId' });

// Installations association table
Part.belongsToMany(Build, { through: 'installations' });
Build.belongsToMany(Part, { through: 'installations' });

// PartRides association table
Ride.belongsToMany(Part, { through: 'part_rides' });
Part.belongsToMany(Ride, { through: 'part_rides' });

// ConditionMultipliers foreign key to PartType
PartType.hasMany(ConditionMultiplier, { foreignKey: 'typeId' });
ConditionMultiplier.belongsTo(PartType, { foreignKey: 'typeId' });

// ConditionMultipliers foreign key to RideConditions
RideCondition.hasMany(ConditionMultiplier, { foreignKey: 'conditionId' });
ConditionMultiplier.belongsTo(RideCondition, { foreignKey: 'conditionId' });

// ConditionMultipliers foreign key to Users
User.hasMany(ConditionMultiplier, { foreignKey: 'userId' });
ConditionMultiplier.belongsTo(User, { foreignKey: 'userId' });

// StyleMultipliers foreign key to PartType
PartType.hasMany(StyleMultiplier, { foreignKey: 'typeId' });
StyleMultiplier.belongsTo(PartType, { foreignKey: 'typeId' });

// StyleMultipliers foreign key to RideStyle
RideStyle.hasMany(StyleMultiplier, { foreignKey: 'styleId' });
StyleMultiplier.belongsTo(RideStyle, { foreignKey: 'styleId' });

// StyleMultipliers foreign key to Users
User.hasMany(StyleMultiplier, { foreignKey: 'userId' });
StyleMultiplier.belongsTo(User, { foreignKey: 'userId' });

if (process.argv[1] === url.fileURLToPath(import.meta.url)) {
  console.log('Syncing to db...');
  // await db.sync({ force: true }); // uncomment to update schema
  await db.sync();
  console.log('Finished syncing database.');
};

export { User, Build, Part, PartCategory, PartType, Service, Ride, RideCondition, RideStyle, ConditionMultiplier, StyleMultiplier };