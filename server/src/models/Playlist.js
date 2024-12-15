import { DataTypes, Model } from 'sequelize';
export class Playlist extends Model {
}
export function PlaylistFactory(sequelize) {
    Playlist.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        album_key: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        album_artist: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        album_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        release_date: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        album_img: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        album_spotify_url: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        artist_spotify_url: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        assignedUserId: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    }, {
        tableName: 'playlists',
        sequelize,
    });
    return Playlist;
}
// Relationships
// Playlist.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });
// User.hasMany(Playlist, { foreignKey: 'userId' });
