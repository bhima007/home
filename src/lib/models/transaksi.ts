import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../sequelize";
import Kamar from "./kamar";
import Bangunan from "./bangunan";
import Penyewa from "./penyewa";

interface TransaksiAttributes {
  id: number;
  penyewa: number;
  bangunan: number;
  kamar: number;
  nominal: number;
  tgl_pembayaran: number;
}

interface TransaksiCreationAttributes
  extends Optional<TransaksiAttributes, "id"> {}

class Transaksi
  extends Model<TransaksiAttributes, TransaksiCreationAttributes>
  implements TransaksiAttributes
{
  id!: number;
  penyewa!: number;
  bangunan!: number;
  kamar!: number;
  nominal!: number;
  tgl_pembayaran!: number;
}

Transaksi.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    penyewa: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Penyewa,
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
    nominal: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    tgl_pembayaran: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "transaksi",
    timestamps: true,
  }
);

export default Transaksi;
