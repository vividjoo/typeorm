import { Repository } from "typeorm";
import { AppDataSource } from "./data-source";
import { Photo } from "./entity/Photo";
import { PhotoMetadata } from "./entity/PhotoMetadata";
import { User } from "./entity/User";

AppDataSource.initialize()
  .then(async () => {
    //   console.log("Inserting a new user into the database...");
    //   const user: User = new User();
    //   user.firstName = "Timber";
    //   user.lastName = "Saw";
    //   user.age = 25;
    //   await AppDataSource.manager.save(user);
    //   console.log("Saved a new user with id: " + user.id);
    //   console.log("Loading users from the database...");
    //   const users = await AppDataSource.manager.find(User);
    //   console.log("Loaded users: ", users);
    //   console.log(
    //     "Here you can setup and run express / fastify / any other framework."
    //   );
    // const photo: Photo = new Photo();
    // photo.name = "월요일";
    // photo.description = "2022/03/28";
    // photo.filename = "photos";
    // photo.views = 2;
    // photo.isPublished = true;

    // create a photo
    const photo = new Photo();
    photo.name = "Me and Bears";
    photo.description = "I am near polar bears";
    photo.filename = "photo-with-bears.jpg";
    photo.views = 1;
    photo.isPublished = true;

    const metadata: PhotoMetadata = new PhotoMetadata();
    metadata.height = 640;
    metadata.width = 480;
    metadata.compressed = true;
    metadata.comment = "cybershoot";
    metadata.orientation = "portrait";
    metadata.photo = photo; // this way we connect them

    // get entity repositories
    const photoRepository = AppDataSource.getRepository(Photo);
    const metadataRepository = AppDataSource.getRepository(PhotoMetadata);

    console.log(metadataRepository);
    // first we should save a photo
    await photoRepository.save(photo);

    // photo is saved. Now we need to save a photo metadata
    await metadataRepository.save(metadata);
  })
  .catch((error) => console.log(error.message));
