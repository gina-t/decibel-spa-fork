import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../db';
import User from './User';
import Song from './Song';

interface PlaylistAttributes {
  id: string;
  name: string;
  userId: string;
}

interface PlaylistCreationAttributes extends Optional<PlaylistAttributes, 'id'> {}

class Playlist extends Model<PlaylistAttributes, PlaylistCreationAttributes> implements PlaylistAttributes {
  public id!: string;
  public name!: string;
  public userId!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Playlist.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Playlist',
  }
);

// Relationships
Playlist.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });
User.hasMany(Playlist, { foreignKey: 'userId' });

const PlaylistSong = sequelize.define('PlaylistSong', {});

Playlist.belongsToMany(Song, { through: PlaylistSong });
Song.belongsToMany(Playlist, { through: PlaylistSong });

export default Playlist;
