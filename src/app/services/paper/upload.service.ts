import { Injectable } from '@angular/core';
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor() { }

  uploadPaper(paper) {
    const contentType = paper.type;
    // console.log(contentType);

    const bucket = new S3(
      {
        accessKeyId: 'ASIAWQUF7FH32O6BPY6R',
        secretAccessKey: 'gR4V/scSm8+VclfLNmAWKF2l47u2EPTV/BNz7Li1',
        region: 'us-east-1'
      }
    );

    const params = {
      Bucket: 'mathsworld-s3-test',
      Key: paper.name,
      Body: paper,
      ACL: 'public-read',
      ContentType: contentType
    };

    bucket.upload(params, function (err, data) {
      if (err) {
          console.log('There was an error uploading your file: ', err);
          return false;
      }
      console.log('Successfully uploaded file.', data);
      return true;
  });
  }


}
