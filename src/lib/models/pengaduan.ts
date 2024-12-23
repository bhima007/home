import { DataTypes, EnumDataType, Model, Optional } from "sequelize";
import sequelize from "../sequelize";
import Bangunan from "./bangunan";
import Penyewa from "./penyewa";

interface PengaduanAttributes {
  id: number;
  nama: number;
  bangunan: number;
  kamar: number;
  pengaduan: string;
  status: string;
}

interface PengaduanCreationAttributes
  extends Optional<PengaduanAttributes, "id"> {}

class Pengaduan
  extends Model<PengaduanAttributes, PengaduanCreationAttributes>
  implements PengaduanAttributes
{
  id!: number;
  nama!: number;
  bangunan!: number;
  kamar!: number;
  pengaduan!: string;
  status!: string;
}

Pengaduan.init(
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
        model: Pengaduan,
        key: "id",
      },
    },
    pengaduan: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "pengaduan",
    timestamps: true,
  }
);

export default Pengaduan;
