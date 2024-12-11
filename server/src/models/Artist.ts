import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../db';

interface ArtistAttributes {
  id: string;
  name: string;
}

interface ArtistCreationAttributes extends Optional<ArtistAttributes, 'id'> {}

class Artist extends Model<ArtistAttributes, ArtistCreationAttributes> implements ArtistAttributes {
  public id!: string;
  public name!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Artist.init(
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
  },
  {
    sequelize,
    modelName: 'Artist',
  }
);

export default Artist;
