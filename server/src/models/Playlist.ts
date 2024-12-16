import { DataTypes, Sequelize, Model, Optional } from "sequelize";
import { User } from "./User";

interface PlaylistAttributes {
  id: number;
  album_key: string;
  album_artist: string;
  album_name: string;
  release_date: string;
  album_img?: string;
  album_spotify_url?: string;
  artist_spotify_url?: string;
  assignedUserId?: string;
}

interface PlaylistCreationAttributes
  extends Optional<PlaylistAttributes, "id"> {}

export class Playlist
  extends Model<PlaylistAttributes, PlaylistCreationAttributes>
  implements PlaylistAttributes
{
  public id!: number;
  public album_key!: string;
  public album_artist!: string;
  public album_name!: string;
  public release_date!: string;
  public album_img?: string;
  public album_spotify_url?: string;
  public artist_spotify_url?: string;
  public assignedUserId!: string;

  // associated User model
  public readonly assignedUser?: User;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export function PlaylistFactory(sequelize: Sequelize): typeof Playlist {
  Playlist.init(
    {
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
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
    },
    {
      tableName: "playlist",
      sequelize,
    }
  );

  return Playlist;
}

// Relationships
// Playlist.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });
// User.hasMany(Playlist, { foreignKey: 'userId' });
