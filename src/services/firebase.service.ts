import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {HttpErrors, Request, Response} from '@loopback/rest';
import {getApp} from "firebase/app";
import {deleteObject, getDownloadURL, getStorage, ref, uploadBytes, UploadMetadata} from 'firebase/storage';

@injectable({scope: BindingScope.TRANSIENT})
export class FirebaseService {
  constructor(
  ) { }

  async testUploadToFirebase(request: Request, response: Response): Promise<object> {
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

  async uploadFileToStorage(request: Request, prefix: string): Promise<any> {
    let firebaseApp = getApp()
    let storage = getStorage(firebaseApp)

    const files = request.files as Express.Multer.File[];
    console.log('=====targetFile', files);

    const targetFile = files[0];
    if (targetFile.mimetype !== 'application/pdf') {
      throw new HttpErrors[400]('Only PDF files are allowed');
    }

    const metadata: UploadMetadata = {
      contentType: targetFile.mimetype,
    };

    const storageRef = ref(storage, `ims/${targetFile.fieldname}_applicationId_${prefix}.pdf`);
    const snapshot = uploadBytes(storageRef, targetFile.buffer, metadata);
    const downloadUrl = await getDownloadURL((await snapshot).ref);

    return {
      message: "File uploaded successfully",
      name: targetFile.originalname,
      type: targetFile.mimetype,
      downloadURL: downloadUrl,
    }
  }

  async deleteFileFromStorage(id: number): Promise<void> {
    let firebaseApp = getApp()
    let storage = getStorage(firebaseApp)

    const storageRef = ref(storage, `ims/resume_applicationId_${id}.pdf`);
    try {
      await deleteObject(storageRef);
    } catch (error) {
      console.log('=====delete_object_error', error);
    }
  }
}
