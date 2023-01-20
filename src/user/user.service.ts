import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {User, UserDocument, UserRoleType} from "./schemas/user.schema";
import {CreateUserDto} from "./dto/createUser.dto";

@Injectable()
export class UserService {
    constructor( @InjectModel(User.name) private userModel: Model<UserDocument>,) {}

    async createUser(dto: CreateUserDto) {
        const newUser = await this.userModel.create({...dto, userRole: UserRoleType.CUSTOMER})
        return newUser
    }

    async getAllUsers() {
        const userList = await this.userModel.find()
            return userList
    }

    async getUserByEmail(email: string): Promise<User> {
        const user = this.userModel.findOne({ userEmail: email})
        return user
    }
}
