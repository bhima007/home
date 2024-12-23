import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../sequelize";

interface RoleAttributes {
  id: number;
  nama: string;
}

interface RoleCreationAttributes extends Optional<RoleAttributes, "id"> {}

class Role
  extends Model<RoleAttributes, RoleCreationAttributes>
  implements RoleAttributes
{
  id!: number;
  nama!: string;
}

Role.init(
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
  },
  {
    sequelize,
    tableName: "role",
    timestamps: true,
  }
);

export default Role;
