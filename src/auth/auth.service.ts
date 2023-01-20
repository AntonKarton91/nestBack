import {HttpException, HttpStatus, Injectable, UnauthorizedException} from '@nestjs/common';
import {AuthDto} from "./dto/auth.dto";
import {UserService} from "../user/user.service";
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from "bcrypt"
import {CreateUserDto} from "../user/dto/createUser.dto";
import {User, UserRoleType} from "../user/schemas/user.schema";


@Injectable()
export class AuthService {

    constructor(private userService: UserService,
                private jwtService: JwtService) {
    }

    async login(dto: CreateUserDto) {
        const user = await this.validateUser(dto)
        return this.generateToken(user)
    }

    async  register(dto: CreateUserDto) {
        const candidate = await this.userService.getUserByEmail(dto.userEmail)
        if (candidate) {
            throw new HttpException("Пользователь с таким email уже существует", HttpStatus.BAD_REQUEST)
        }
        const passwordHash = await bcrypt.hash(dto.userPassword, 5)
        const user = await this.userService.createUser({...dto, userPassword: passwordHash})
        return this.generateToken(user)
    }

    private async generateToken(user: User) {
        const payload = { email: user.userEmail, password: user.userPassword, role: UserRoleType.CUSTOMER }
        return {
            token: this.jwtService.sign(payload)
        }
    }

    private async validateUser(dto: CreateUserDto) {
        const user = await this.userService.getUserByEmail(dto.userEmail)
        const passEquals = await bcrypt.compare(dto.userPassword, user.userPassword)
        if (user && passEquals) {
            return user
        }
        throw new UnauthorizedException({message: "Проверьте имя пользователя и пароль"})
    }
}
