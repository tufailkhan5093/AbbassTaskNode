module.exports = (sequelize, DataTypes) => {
    const TaskComment = sequelize.define('TaskComment', {
        comment_user_phone: {
            type: DataTypes.STRING(),
            allowNull: true,
        },
        comment_username: {
            type: DataTypes.STRING(),
            allowNull: true,
        },

        commentText: {
            type: DataTypes.STRING(),
            allowNull: true,
        },





    });

    TaskComment.associate = (models) => {





    }
    return TaskComment;
};