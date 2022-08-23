const sequelize = require('../db')
const {DataTypes} = require('sequelize')
const { databaseVersion } = require('../db')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true,},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "ADMIN"},
})

// const Todos = sequelize.define( 'Todos', {
//     id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
//     name: {type: DataTypes.STRING,  allowNull: false},
//     description: {type: DataTypes.STRING,  allowNull: false}
// })




// User.hasMany(Todos)
// Todos.belongsTo(User)

module.exports = {
    User,
    // Todos
}
