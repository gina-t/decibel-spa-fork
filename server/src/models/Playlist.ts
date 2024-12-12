import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../../database/db';
import { User } from './User';



// export interface AlbumDataType {
//   album_key: string;
//   album_artist: string;
//   album_name: string;
//   release_date: string;
//   album_img: string; 
//   album_spotify_url: string;
//   artist_spotify_url: string;
// }


interface PlaylistAttributes {
  id: string;
  userId: string;
  album_key: string;
  album_artist: string;
  album_name: string;
  release_date: string;
  album_img: string; 
  album_spotify_url: string;
  artist_spotify_url: string;
}

interface PlaylistCreationAttributes extends Optional<PlaylistAttributes, 'id'> {}

export class Playlist extends Model<PlaylistAttributes, PlaylistCreationAttributes> implements PlaylistAttributes {
  public id!: string;
  public name!: string;
  public userId!: string;
  public album_key!: string;
  public album_artist!: string;
  public album_name!: string;
  public release_date!: string;
  public album_img!: string;
  public album_spotify_url!: string;
  public artist_spotify_url!: string;

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
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
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
  },
  {
    sequelize,
    modelName: 'Playlist',
  }
);

// Relationships
Playlist.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });
User.hasMany(Playlist, { foreignKey: 'userId' });

export default Playlist;
