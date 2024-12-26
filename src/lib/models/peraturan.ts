import { DataTypes, EnumDataType, Model, Optional } from "sequelize";
import sequelize from "../sequelize";
import Bangunan from "./bangunan";

interface PeraturanAttributes {
  id: number;
  bangunan: number;
  aturan: string;
  fasilitas: string;
}

interface PeraturanCreationAttributes
  extends Optional<PeraturanAttributes, "id"> {}

class Peraturan
  extends Model<PeraturanAttributes, PeraturanCreationAttributes>
  implements PeraturanAttributes
{
  id!: number;
  bangunan!: number;
  aturan!: string;
  fasilitas!: string;
}

Peraturan.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    bangunan: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Bangunan,
        key: "id",
      },
    },
    aturan: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fasilitas: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "peraturan_kos",
    timestamps: true,
  }
);

export default Peraturan;
