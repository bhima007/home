import { Sequelize } from "sequelize";

// Menggunakan variabel lingkungan untuk kredensial
const sequelize = new Sequelize({
  dialect: "mysql",
  dialectModule: require("mysql2"),
  host: "localhost",
  username: "root",
  password: "",
  database: "kos",
  logging: false,
});

// Fungsi sinkronisasi database
const syncDatabase = async () => {
  try {
    // Sinkronisasi dengan alter true akan mengubah tabel sesuai dengan perubahan model
    await sequelize.sync({ alter: true });
    console.log("Database & tables synced!");
  } catch (error) {
    console.error("Error syncing database:", error);
  }
};

syncDatabase();

export default sequelize;
