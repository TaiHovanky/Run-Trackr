module.exports = function (sequelize, DataType) {
    return sequelize.define('run', {
        date: {
            type: DataType.DATE,
            allowNull: true,
            isDate: true
        },
        location: {
            type: DataType.STRING,
            allowNull: false,
            isAlpha: true
        },
        distance: {
            type: DataType.FLOAT,
            allowNull: false,
            isNumeric: true
        }
    });
}