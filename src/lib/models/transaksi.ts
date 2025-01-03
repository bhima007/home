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
  periode_pembayaran: number;
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
  periode_pembayaran!: number;
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
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
    },
    periode_pembayaran: {
      type: DataTypes.INTEGER,
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

Transaksi.belongsTo(Penyewa, { foreignKey: "penyewa" });
Penyewa.hasMany(Transaksi, { foreignKey: "penyewa" });

Transaksi.belongsTo(Kamar, { foreignKey: "kamar" });
Kamar.hasMany(Transaksi, { foreignKey: "kamar" });

Transaksi.belongsTo(Bangunan, { foreignKey: "bangunan" });
Bangunan.hasMany(Transaksi, { foreignKey: "bangunan" });

export default Transaksi;
