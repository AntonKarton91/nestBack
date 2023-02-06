import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument, UserRoleType } from './schemas/user.schema';
import { CreateUserDto } from './dto/createUser.dto';
import { BasketService } from '../basket/basket.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly basketService: BasketService,
  ) {}

  async createUser(dto: CreateUserDto) {
    const newUser = await this.userModel.create({
      ...dto,
      role: UserRoleType.CUSTOMER,
    });
    const userId = newUser._id;
    //@ts-ignore
    const userBasket = this.basketService.create({ userId });
    this.userModel.updateOne(
      { email: dto.email },
      { basketId: userBasket },
    );
    return newUser;
  }

  async getAllUsers() {
    const userList = await this.userModel.find();
    return userList;
  }

  async getUserByEmail(email: string){
    const user = await this.userModel.findOne({ email });
    return user;
  }

  async getUserById(id: string): Promise<User> {
    return this.userModel.findById(id);
  }
}
