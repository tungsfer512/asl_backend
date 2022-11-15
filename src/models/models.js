const { DataTypes, Sequelize } = require('sequelize');

const sequelize = new Sequelize('asl_dev', 'root', 'tung', {
    host: 'localhost',
    dialect: 'mysql'
});

const User = sequelize.define(
    'User',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        firstName: {
            type: DataTypes.STRING
        },
        lastName: {
            type: DataTypes.STRING
        },
        gender: {
            type: DataTypes.STRING
        },
        dob: {
            type: DataTypes.STRING
        },
        role: {
            type: DataTypes.STRING
        }
    },
    {
        tableName: 'User',
        timestamps: true
    }
);

const Data = sequelize.define(
    'Data',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        path: {
            type: DataTypes.STRING
        },
        content: {
            type: DataTypes.STRING
        },
        userId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'User',
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        },
        status: {
            type: DataTypes.STRING
        }
    },
    {
        tableName: 'Data',
        timestamps: true
    }
);

const Label = sequelize.define(
    'Label',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.STRING
        },
        status: {
            type: DataTypes.STRING
        }
    },
    {
        tableName: 'Label',
        timestamps: true
    }
);

const Sample = sequelize.define(
    'Sample',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        path: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.STRING
        },
        status: {
            type: DataTypes.STRING
        },
        labelId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Label',
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        }
    },
    {
        tableName: 'Sample',
        timestamps: true
    }
);

const DataLabel = sequelize.define(
    'DataLabel',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        dataId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Data',
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        },
        labelId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Label',
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        }
    },
    {
        tableName: 'DataLabel',
        timestamps: true
    }
);
const LstmModel = sequelize.define(
    'LstmModel',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        accuracy: {
            type: DataTypes.STRING
        },
        f1Score: {
            type: DataTypes.STRING
        },
        path: {
            type: DataTypes.STRING
        }
    },
    {
        tableName: 'LstmModel',
        timestamps: true
    }
);

async function createDB() {
    await sequelize.sync({ force: true });
    console.log('All models were synchronized successfully.');
}

module.exports = {
    createDB,
    User,
    Data,
    Label,
    Sample,
    DataLabel,
    LstmModel
};
