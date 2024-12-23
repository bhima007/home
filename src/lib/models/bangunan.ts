import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../sequelize";

interface BangunanAttributes {
  id: number;
  lokasi: string;
  bangunan: string;
  alamat: string;
}

interface BangunanCreationAttributes
  extends Optional<BangunanAttributes, "id"> {}

class Bangunan
  extends Model<BangunanAttributes, BangunanCreationAttributes>
  implements BangunanAttributes
{
  id!: number;
  lokasi!: string;
  bangunan!: string;
  alamat!: string;
}

Bangunan.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    lokasi: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bangunan: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    alamat: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "bangunan",
    timestamps: true,
  }
);

export default Bangunan;
