import { SignInInput, SignUpInput } from "./dto/user.inputs";
import { BadRequestException, Injectable } from "@nestjs/common";
import { User } from "./user.model";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcryptjs";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  createToken({ id, email, name, surname }: User) {
    return jwt.sign(
      {
        id,
        email,
        name,
        surname,
      },
      "secret",
    );
  }

  async createUser(user: SignUpInput) {
    const password = await bcrypt.hash(user.password, 10);

    const userData: SignUpInput = {
      name: user.name,
      surname: user.surname,
      email: user.email.toLowerCase(),
      password,
    };

    return this.userRepo.save(userData).catch((e) => {
      if (/(email)[\s\S]+(already exists)/.test(e.detail)) {
        throw new BadRequestException(
          "Account with this email already exists.",
        );
      }
      return e;
    });
  }

  async login(authData: SignInInput) {
    const { email, password } = authData;

    const user = await this.userRepo.findOne({ email });

    if (!user) {
      throw new BadRequestException("This user does not exist...");
    }

    const isVerified = await bcrypt.compare(password, user.password);

    if (!isVerified) {
      throw new BadRequestException("This user does not exist...");
    }

    return user;
  }
}
