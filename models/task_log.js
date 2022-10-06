module.exports = (sequelize, DataTypes) => {
    const TaskLog = sequelize.define('TaskLog', {
        change_task_log_name: {
            type: DataTypes.STRING(),
            allowNull: true,
        },
        change_task_log_state: {
            type: DataTypes.STRING(),
            allowNull: true,
        },

        change_by: {
            type: DataTypes.STRING(),
            allowNull: true,
        },
        logId: {
            type: DataTypes.STRING(),
            allowNull: true,
        },





    });

    TaskLog.associate = (models) => {


      

    }
    return TaskLog;
};