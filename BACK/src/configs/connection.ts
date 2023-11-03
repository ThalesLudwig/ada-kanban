import { Sequelize } from "sequelize";

export const connection = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite",
});

export const connectDB = async () => {
  try {
    await connection.sync();
    console.log("Connection to database established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  };
};