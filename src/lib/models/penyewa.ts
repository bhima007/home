import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../sequelize";
import Kamar from "./kamar";
import Bangunan from "./bangunan";
import User from "./user";

interface PenyewaAttributes {
  id: number;
  nama: number;
  bangunan: number;
  kamar: number;
  tgl_masuk: number;
  no_darurat: string;
}

interface PenyewaCreationAttributes extends Optional<PenyewaAttributes, "id"> {}

class Penyewa
  extends Model<PenyewaAttributes, PenyewaCreationAttributes>
  implements PenyewaAttributes
{
  id!: number;
  nama!: number;
  bangunan!: number;
  kamar!: number;
  tgl_masuk!: number;
  no_darurat!: string;
}

Penyewa.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nama: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
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
    no_darurat: {
      type: DataTypes.STRING,
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
