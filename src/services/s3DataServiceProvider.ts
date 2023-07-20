import dotenv from 'dotenv';
dotenv.config();
import * as AWS from "aws-sdk";

export class S3DataServiceProvider {
    s3Service: AWS.S3;
    constructor() {
        this.s3Service = new AWS.S3({
            accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
            region: process.env.AWS_S3_BUCKET_REGION,
            signatureVersion: 'v4'
        });
    }
    async getPreSignedUrl(
        fileName,
        type = "put",
        slug?,
        expireSeconds = parseInt(process.env.PRE_SIGNED_URL_EXPIRES, 10),
        bucket = process.env.AWS_S3_BUCKET
    ) {

        let key = "";
        if (slug) {
            key += `${slug}/`;
        }

        key += fileName;
        const params = {
            Bucket: bucket,
            Expires: expireSeconds,
            Key: key,
        };

        if (type == "put") {
            params["ContentType"] = "application/x-www-form-urlencoded";
        }

        const method = type === "put" ? "putObject" : "getObject";
        return await this.s3Service.getSignedUrl(method, params);
    }

    async upload(file, slug)
    {
        const bucket = process.env.AWS_S3_BUCKET;
        let key = "";
        if (slug) {
            key += `${slug}/`;
        }
        key += file.originalname;

        const params = {
            Bucket: bucket,
            Key: key,
            Body: file.buffer,
        };

        return await this.s3Service.upload(params).promise();
    }
}