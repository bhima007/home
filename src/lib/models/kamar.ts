import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../sequelize";
import Bangunan from "./bangunan";

interface KamarAttributes {
  id: number;
  bangunan: number;
  kamar: string;
}

interface KamarCreationAttributes extends Optional<KamarAttributes, "id"> {}

class Kamar
  extends Model<KamarAttributes, KamarCreationAttributes>
  implements KamarAttributes
{
  id!: number;
  bangunan!: number;
  kamar!: string;
}

Kamar.init(
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
    kamar: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "kamar",
    timestamps: true,
  }
);

Kamar.belongsTo(Bangunan, { foreignKey: "bangunan" });
Bangunan.hasMany(Kamar, { foreignKey: "bangunan" });

export default Kamar;
