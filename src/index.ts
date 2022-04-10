import { Repository } from "typeorm";
import { AppDataSource } from "./data-source";
import { Album } from "./entity/Album";
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
    // const photo = new Photo();
    // photo.name = "Me and Bears";
    // photo.description = "I am near polar bears";
    // photo.filename = "photo-with-bears.jpg";
    // photo.isPublished = true;
    // photo.views = 10;
    // // create photo metadata object
    // const metadata = new PhotoMetadata();
    // metadata.height = 640;
    // metadata.width = 480;
    // metadata.compressed = true;
    // metadata.comment = "cybershoot";
    // metadata.orientation = "portrait";
    // photo.metadata = metadata;
    // const photoRepository = AppDataSource.getRepository(Photo);
    // await photoRepository.save(photo);
    // console.log(`success`);
    // const photoRepository = AppDataSource.getRepository(Photo);
    // const photo = await photoRepository.findOneByOrFail({ relations: { metadata: true } });
    // console.log(`photo : `, photo);
    // const photo = await AppDataSource.getRepository(Photo)
    //   .createQueryBuilder()
    //   .leftJoinAndSelect("Photo.metadata", "meta")
    //   .getOne();
    // console.log(photo);
    // const photo = new Photo();
    // photo.name = "Me and Bears";
    // photo.description = "I am 니얼더 polar bears";
    // photo.filename = "photo-with-베얼스.jpg";
    // photo.isPublished = true;
    // photo.views = 100;
    // const metadata = new PhotoMetadata();
    // metadata.height = 640;
    // metadata.width = 480;
    // metadata.compressed = false;
    // metadata.comment = "커멘트";
    // metadata.orientation = "포트 포톨링요";
    // photo.metadata = metadata;
    // // metadata.photo = photo;
    // const medataRepository = AppDataSource.getRepository(PhotoMetadata);
    // await medataRepository.save(metadata);
    // console.log(metadata);
    // const photoRepository = AppDataSource.getRepository(Photo);
    // await photoRepository.save(photo);
    // console.log(photoRepository);

    const album1: Album = new Album();
    album1.name = "Bears";
    await AppDataSource.manager.save(album1);

    const album2: Album = new Album();
    album2.name = "Me";
    await AppDataSource.manager.save(album2);

    const photo = new Photo();
    photo.name = "Me and Bears";
    photo.description = "I am near polar bears";
    photo.filename = "photo-with-bears.jpg";
    photo.views = 101;
    photo.isPublished = true;
    photo.albums = [album1, album2];

    await AppDataSource.manager.save(photo);

    // const loadedPhoto: Photo = await AppDataSource.getRepository(Photo).findOne(
    //   {
    //     where: { id: 15 },
    //     relations: { albums: true },
    //   }
    // );

    const photos = await AppDataSource.getRepository(Photo)
      .createQueryBuilder("photo") // first argument is an alias. Alias is what you are selecting - photos. You must specify it.
      .innerJoinAndSelect("photo.metadata", "meta")
      .leftJoinAndSelect("photo.albums", "album")
      .leftJoinAndSelect("photo.author", "author")
      .where("photo.isPublished = true")
      .andWhere("(photo.name = :photoName OR photo.name = :bearName)")
      .orderBy("photo.id", "DESC")
      .skip(5)
      .take(10)
      .setParameters({ photoName: "Me and Bears", bearName: "Mishka" })
      .getMany();

    console.log(photos);
  })
  .catch((error) => console.log("error : ", error.message));
 