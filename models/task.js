module.exports = (sequelize, DataTypes) => {
    const Task = sequelize.define('Task', {
        task_latitude: {
            type: DataTypes.STRING(),
            allowNull: true,
        },
        task_longitude: {
            type: DataTypes.STRING(),
            allowNull: true,
        },

        taskName: {
            type: DataTypes.STRING(),
            allowNull: true,
        },

        taskState: {
            type: DataTypes.STRING(),
            allowNull: true,
        },

        taskSyncStatus: {
            type: DataTypes.STRING(),
            allowNull: true,
        },




    });

    Task.associate = (models) => {

        Task.hasMany(models.TaskComment);
        models.TaskComment.belongsTo(Task);

        Task.hasMany(models.TaskNote);
        models.TaskNote.belongsTo(Task);

        Task.hasMany(models.TaskLog);
        models.TaskLog.belongsTo(Task);


    }
    return Task;
};