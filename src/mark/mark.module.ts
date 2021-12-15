import { Mark } from "./mark.model";
import { Module } from "@nestjs/common";
import { MarkService } from "./mark.service";
import { MarkResolver } from "./mark.resolver";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([Mark])],
  providers: [MarkService, MarkResolver],
})
export class MarkModule {}
