import { User } from "src/user/user.model";
import { Repository } from "typeorm";
import { Message } from "./message.model";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Chat } from "src/chat/chat.model";
import {
  PaginatedChatMessagesArgs,
  PaginatedMessages,
} from "./dto/message.inputs";
import { paginate } from "src/shared/paginate";

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message) private messageRepo: Repository<Message>,
    @InjectRepository(Chat) private chatrepo: Repository<Chat>,
  ) {}

  //отправить сообщение [x]
  async sendMessage(
    author: User,
    text: string,
    chatId: number,
  ): Promise<Message> {
    const chat = await this.chatrepo.findOne(chatId);

    const message = new Message();
    message.author = author;
    message.text = text;
    message.date = new Date();
    message.chat = chat;

    const savedMessage = await this.messageRepo.save(message);

    await this.chatrepo.save({ ...chat, lastMessage: savedMessage });

    return savedMessage;
  }

  //получить список сообщений с пагинацией [x]
  async getPaginatedMessages(
    paginationArgs: PaginatedChatMessagesArgs,
  ): Promise<PaginatedMessages> {
    const query = this.messageRepo
      .createQueryBuilder("messages")
      .leftJoinAndSelect("messages.author", "users")
      .leftJoinAndSelect("messages.chat", "chat")
      .select()
      .where("messages.chatId = :chatId", { chatId: paginationArgs.chatId })
      .orderBy({ ["messages.date"]: "DESC" });

    return paginate(query, paginationArgs, "id", "messages.id");
  }
}
