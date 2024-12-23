import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../sequelize";
import Kamar from "./kamar";
import Bangunan from "./bangunan";

interface PenyewaAttributes {
  id: number;
  nama: string;
  bangunan: number;
  kamar: number;
  tgl_masuk: number;
}

interface PenyewaCreationAttributes extends Optional<PenyewaAttributes, "id"> {}

class Penyewa
  extends Model<PenyewaAttributes, PenyewaCreationAttributes>
  implements PenyewaAttributes
{
  id!: number;
  nama!: string;
  bangunan!: number;
  kamar!: number;
  tgl_masuk!: number;
}

Penyewa.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nama: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bangunan: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Bangunan,
        key: "id",
      },
    },
    kamar: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Kamar,
        key: "id",
      },
    },
    tgl_masuk: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "penyewa",
    timestamps: true,
  }
);

export default Penyewa;
