import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import { Model } from "mongoose";
import * as bcrypt from "bcrypt";
import * as normalize from "normalize-url";
import * as gravatar from "gravatar";
import { AuthService } from "../auth/auth.service";
import { IUser } from "./interfaces/user.interface";
import { UserRegisterDTO } from "./dto/user-register.dto";
import { UserLoginDTO } from "./dto/user-login.dto";
import { MailService } from "../mail/mail.service";
import { getBeetwenDay } from "src/utils/helper";

const ObjectId = mongoose.Types.ObjectId;

@Injectable()
export class UserService {
    constructor(
        @InjectModel('User') private readonly userModel: Model<IUser>,
        private readonly authService: AuthService,
        private readonly mailService: MailService,
    ) {}

    async create(userRegisterDTO: UserRegisterDTO) {
        let user = new this.userModel(userRegisterDTO);

        // Check if user email is already exist
        const isEmailExist = await this.userModel.findOne({ email: user.email });
        if (isEmailExist) {
            throw new BadRequestException('The email you\'ve entered is already exist.');
        }

        const avatar = normalize(
            gravatar.url(user.email, {
              s: '200',
              r: 'pg',
              d: 'mm'
            }),
            { forceHttps: true }
        );

        user.avatar = avatar;
        await user.save();

        var users = user.toObject();
        delete users.role
        delete users.password
        delete users.created_at
        delete users.updated_at
        delete users.is_confirmed
        delete users.is_forget_pass
        delete users.otp

        // const data = {
        //     name: user.name,
        //     from: "Verification " + process.env.MAIL_FROM,
        //     to: user.email,
        //     subject: 'Please confirm your account',
        //     type: 'verification'
        // }
        //
        // const verification = await this.mailService.templateGenerate(data)

        return {
            user: users,
            accessToken: await this.authService.createAccessToken(user._id, "USER"),
            // verification: verification
        }
    }

    async login(userLoginDTO: UserLoginDTO) {
        const { email } = userLoginDTO;

        let query = await this.userModel.findOne({ email });
        if (!query) {
            throw new NotFoundException('The email you\'ve entered does not exist.');
        }

        // Verify password
        const match = await bcrypt.compare(userLoginDTO.password, query.password);
        if (!match) {
            throw new BadRequestException('The password you\'ve entered is incorrect.');
        }

        var user = query.toObject()
        delete user.role
        delete user.password
        delete user.created_at
        delete user.updated_at

        return {
            user,
            accessToken: await this.authService.createAccessToken(user._id, "USER")
        }
    }

    async changePassword(userId: IUser, input: any) {
        const { old_password, password } = input

        const user = await this.userModel.findOne({ _id: userId })

        const verify_password = await bcrypt.compare(old_password, user.password)
        if (!verify_password) {
            throw new BadRequestException('Incorrect old password.')
        }

        const salt = await bcrypt.genSalt(12);
        const new_password = await bcrypt.hash(password, salt)

        try {
            await this.userModel.updateOne({ _id: userId }, { password: new_password })
            return 'ok'
        } catch (error) {
            throw new InternalServerErrorException(error.message)
        }
    }

    async verify(confirmation: string) {
        var field = 'is_confirmed'
        var redirect = process.env.CLIENT

        const mailArray = confirmation.split('.')

        const unique = mailArray[(mailArray.length - 1)]

        const trueMail = confirmation.replace(`.${unique}`, '')

        const getUser = await this.userModel.findOne({email: trueMail})

        if(!getUser){
            throw new NotFoundException('user or email not found')
        }

        if(getUser && getUser[field]){
            // const trueDay = getBeetwenDay(getUser[field], new Date())
            // if(trueDay > 3){
            //     return `${process.env.CLIENT}/expired`
            // }

            console.log('email confirmation is expired')
            redirect = `${redirect}/expired`
        }
        
        await this.userModel.findOneAndUpdate(
            {email: trueMail},
            {[field]: new Date()}
        )

        return redirect
    }

    // sending link to email
    async forgetPassword(email: string) {
        var user = await this.userModel.findOne({email: email})

        if(!user){
            throw new NotFoundException('account not found')
        }

        const data = {
            name: user.name,
            from: "Change password " + process.env.MAIL_FROM,
            to: user.email,
            subject: 'Change password if this is you',
            type: 'forget'
        }

        const result = await this.mailService.templateGenerate(data)
        
        user.is_forget_pass = new Date()
        user.otp = result["otp"]
        
        user.save()

        return result["mail"]
    }

    async checkAccount(email: string, otp: string) {
        if(!email && !otp){
            throw new BadRequestException('The query must have at least 1')
        }

        var field = 'email'
        var value = email

        if(otp){
            field = 'otp'
            value = otp
        }

        const query = await this.userModel.findOne({[field]: value})

        if(!query){
            throw new NotFoundException(`${field} based accounts were not found`)
        }

        var user = query.toObject()
        delete user.role
        delete user.password
        delete user.created_at
        delete user.updated_at
        delete user.is_confirmed
        delete user.is_forget_pass

        if(email){
            delete user.otp
        }

        return user
    }

    async checkOTP(otp: string) {
	const query = await this.userModel.findOne({otp: otp})

        if(!query){
            throw new NotFoundException('account not found')
        }

        const trueDay = getBeetwenDay(query.is_forget_pass, new Date())
        if(trueDay > 3){
            throw new BadRequestException('your otp has expired')
        }

        var user = query.toObject()
        delete user.role
        delete user.password
        delete user.created_at
        delete user.updated_at
        delete user.is_confirmed
        delete user.is_forget_pass
        delete user.otp

        return {
            user: user,
            otp: otp
        }
    }

    async newPassword(otp: string, input: any) {
        var user = await this.userModel.findOne({otp: otp})

        if(!user){
            throw new NotFoundException('account not found')
        }
        
        user.password = input.password
        user.otp = null

        user.save()

        return 'ok'
    }
}
