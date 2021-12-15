import { NestFactory } from "@nestjs/core";
import { AppModule } from "./user/app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(5001);
}
bootstrap();
