import { DataTypes, EnumDataType, Model, Optional } from "sequelize";
import sequelize from "../sequelize";
import Bangunan from "./bangunan";

interface PengumumanAttributes {
  id: number;
  bangunan: number;
  pengumuman: string;
}

interface PengumumanCreationAttributes
  extends Optional<PengumumanAttributes, "id"> {}

class Pengumuman
  extends Model<PengumumanAttributes, PengumumanCreationAttributes>
  implements PengumumanAttributes
{
  id!: number;
  bangunan!: number;
  pengumuman!: string;
}

Pengumuman.init(
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
    pengumuman: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "pengumuman",
    timestamps: true,
  }
);

export default Pengumuman;
