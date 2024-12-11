import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../db';
import Artist from './Artist';

interface SongAttributes {
  id: string;
  title: string;
  duration: number;
  artistId: string;
}

interface SongCreationAttributes extends Optional<SongAttributes, 'id'> {}

class Song extends Model<SongAttributes, SongCreationAttributes> implements SongAttributes {
  public id!: string;
  public title!: string;
  public duration!: number;
  public artistId!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Song.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    artistId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Song',
  }
);

// Relationships
Song.belongsTo(Artist, { foreignKey: 'artistId', onDelete: 'CASCADE' });
Artist.hasMany(Song, { foreignKey: 'artistId' });

export default Song;
