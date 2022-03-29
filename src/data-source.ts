import { PhotoMetadata } from "./entity/PhotoMetadata";
import "reflect-metadata";
import { DataSource } from "typeorm";
import { Photo } from "./entity/Photo";
import { User } from "./entity/User";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "",
  password: "",
  database: "typeorm",
  synchronize: true,
  logging: false,
  entities: [User, Photo, PhotoMetadata],
  migrations: [],
  subscribers: [],
});

AppDataSource.initialize()
  .then(() => {
    // here you can start to work with your database
    console.log(`AppDataSource ini!`);
  })
  .catch((error) => console.log("error : ", error));
