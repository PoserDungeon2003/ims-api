import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {Request, Response} from '@loopback/rest';
import {getApp} from "firebase/app";
import {getDownloadURL, getStorage, ref, uploadBytes, UploadMetadata} from 'firebase/storage';

@injectable({scope: BindingScope.TRANSIENT})
export class FirebaseService {
  constructor(
  ) { }

  async uploadFileToStorage(request: Request, response: Response): Promise<object> {
    let firebaseApp = getApp()
    let storage = getStorage(firebaseApp)

    const metadata: UploadMetadata = {
      contentType: request.file?.mimetype,
    };

    const storageRef = ref(storage, `ims/${request.file?.originalname}`);
    const snapshot = uploadBytes(storageRef, request.file?.buffer, metadata);
    const downloadUrl = await getDownloadURL((await snapshot).ref);

    return {
      message: "File uploaded successfully",
      name: request.file?.originalname,
      type: request.file?.mimetype,
      downloadURL: downloadUrl,
    }
  }
}
