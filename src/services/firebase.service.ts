import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {Blob} from 'buffer';
import {getApp} from "firebase/app";
import {getStorage, ref, uploadBytes, UploadMetadata} from 'firebase/storage';

@injectable({scope: BindingScope.TRANSIENT})
export class FirebaseService {
  constructor(/* Add @inject to inject parameters */) { }

  async uploadFileToStorage(file: Blob, prefix: string, fileName: string): Promise<void> {
    let firebaseApp = getApp()
    let storage = getStorage(firebaseApp)

    const metadata: UploadMetadata = {
      contentType: 'application/pdf',
    };

    const resumeCvRef = ref(storage, `${fileName}.${prefix}`);
    uploadBytes(resumeCvRef, file).then((snapshot) => {
      console.log('Uploaded a blob or file!', + snapshot);
    });
  }
}
