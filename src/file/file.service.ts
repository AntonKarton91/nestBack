import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import * as path from "path"
import * as fs from "fs"
import * as uuid from "uuid"


export enum FileType {
    Image="Image-",
    Preview="Preview-"
}

@Injectable()
export class FileService {


    createFile(type: FileType, file, productArticul, title, dir?) {
        try {
            const fileExtension = file.originalname.split(".").pop()
            const dirName = dir || productArticul + uuid.v4()
            const fileName = type + productArticul.toString() + title + "." + fileExtension
            const filePAth = path.resolve(__dirname, "..", "static", "products", productArticul.toString(), title.toString(), dirName.toString())
            if (!fs.existsSync(filePAth)) {
                fs.mkdirSync(filePAth, {recursive: true})
            }
            fs.writeFileSync(path.resolve(filePAth, fileName), file.buffer)
            return [`products/${productArticul}/${title}/${dirName}/${fileName}`, dirName]


        } catch (e) {
            // @ts-ignore
            throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    removeFile () {

    }
}