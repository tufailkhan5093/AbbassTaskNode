module.exports = (sequelize, DataTypes) => {
    const List = sequelize.define('List', {
        isShared: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        listName: {
            type: DataTypes.STRING(),
            allowNull: true,
        },
        ListSyncStatus: {
            type: DataTypes.STRING(),
            allowNull: true,
        },
        phone_no: {
            type: DataTypes.STRING(),
            allowNull: true,
        },
        username: {
            type: DataTypes.STRING(),
            allowNull: true,
        },




    });

    List.associate = (models) => {

        List.hasMany(models.Task);
        models.Task.belongsTo(List); 



        // User.hasOne(models.Booking);
        // models.Booking.belongsTo(User,{as: 'Driver',foreignKey: 'DriverId' }); 

        // User.hasOne(models.Booking);
        // models.Booking.belongsTo(User,{as: 'User',foreignKey: 'UserId' }); 

    }
    return List;
};