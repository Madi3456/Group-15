import { Sequelize, DataTypes } from "sequelize";
const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "database.sqlite",
});
//here, i am importing sequelize to connect to the database 

const TestResult = sequelize.define("TestResult", {
    userId: { 
        type: DataTypes.INTEGER, 
        allowNull: false 
    },
    setName: { 
        type: DataTypes.STRING, 
        allowNull: false 
    },
    score: { 
        type: DataTypes.FLOAT, 
        allowNull: false 
    },
    totalQuestions: { 
        type: DataTypes.INTEGER, 
        allowNull: false 
    },
    correctAnswers: { 
        type: DataTypes.INTEGER, 
        allowNull: false 
    },
    testDate: { 
        type: DataTypes.DATE, 
        defaultValue: DataTypes.NOW 
    },
});

class _SQLiteTestResultModel {
    async create(testResult) {
        return await TestResult.create(testResult);
    }

    async getTestResultsByUser(userId) {
        return await TestResult.findAll({ 
            where: { userId },
            order: [['testDate', 'DESC']]
        });
    }
}

await sequelize.sync();
const SQLiteTestResultModel = new _SQLiteTestResultModel();

export { SQLiteTestResultModel, TestResult };
