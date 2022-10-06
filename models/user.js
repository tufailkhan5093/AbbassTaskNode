module.exports = (sequelize, DataTypes) =>{
    const user = sequelize.define('user', {
        phone_no: {
            type: DataTypes.STRING(),
            allowNull: true,
        },
        universal_unique_token: {
            type: DataTypes.STRING(),
            allowNull: true,
        },
        username: {
            type: DataTypes.STRING(),
            allowNull: true,
        },
        password: {
            type: DataTypes.STRING(),
            allowNull: true,
        },
       
       
       
    });
    
    user.associate = (models)=>{

        // User.hasOne(models.Booking);
        // models.Booking.belongsTo(User,{as: 'Driver',foreignKey: 'DriverId' }); 

        // User.hasOne(models.Booking);
        // models.Booking.belongsTo(User,{as: 'User',foreignKey: 'UserId' }); 

    }
    return user;
};