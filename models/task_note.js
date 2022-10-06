module.exports = (sequelize, DataTypes) => {
    const TaskNote = sequelize.define('TaskNote', {
        note_user_phone: {
            type: DataTypes.STRING(),
            allowNull: true,
        },
        note_username: {
            type: DataTypes.STRING(),
            allowNull: true,
        },

        noteText: {
            type: DataTypes.STRING(),
            allowNull: true,
        },
  




    });

    TaskNote.associate = (models) => {


    }
    return TaskNote;
};