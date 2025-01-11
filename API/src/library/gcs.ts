import { Storage, GetSignedUrlConfig } from '@google-cloud/storage';

// The ID of your GCS bucket
const bucketName = 'royal-matrimoni';

// The full path of your file inside the GCS bucket, e.g. 'yourFile.jpg' or 'folder1/folder2/yourFile.jpg'
// const fileName = `profile-${new Date().getTime()}.png`;
// `profile-${new Date().getTime()}.png`
// Creates a client from a Google service account key
const storage = new Storage({ keyFilename: 'services-pprd.json' });

export async function generateV4UploadSignedUrl(uuid: string, imageType: string) {
  // The full path of your file inside the GCS bucket, e.g. 'yourFile.jpg' or 'folder1/folder2/yourFile.jpg'
  const fileName =`image-${new Date().getTime()}.png`;
  // These options will allow temporary uploading of the file with outgoing
  // Content-Type: image/png header.
  let filePath = uuid + '/' + imageType + '/' + fileName;
  const options: GetSignedUrlConfig = {
    version: 'v4',
    action: 'write',
    expires: Date.now() + 15 * 60 * 1000, // 15 minutes
    contentType: 'image/png'
  };

  // Get a v4 signed URL for uploading file
  const url = await storage.bucket(bucketName).file(filePath).getSignedUrl(options);

  console.log('Generated PUT signed URL:');
  console.log(url);
  console.log('You can use this URL with any user agent, for example:');
  console.log("curl -X PUT -H 'Content-Type: image/png' " + `--upload-file my-file '${url}'`);
  return url;
}

//  upload images in website sucess stories
export async function generateV4UploadStoriesUrl(fileType: string) {
  const fileEx = fileType.split('/')
  // The full path of your file inside the GCS bucket, e.g. 'yourFile.jpg' or 'folder1/folder2/yourFile.jpg'
  const fileName =`image-${new Date().getTime()}.${fileEx[1]}`;
  // These options will allow temporary uploading of the file with outgoing
  // Content-Type: image/png header.
  let filePath = "webSite" + '/' + "stories" + '/' + fileName;
  const options: GetSignedUrlConfig = {
    version: 'v4',
    action: 'write',
    expires: Date.now() + 15 * 60 * 1000, // 15 minutes
    contentType: fileType
  };
  // Get a v4 signed URL for uploading file
  const url = await storage.bucket(bucketName).file(filePath).getSignedUrl(options);
  return url;
}
//  delete profile , gallery and id images from gcp
export async function deleteImagefromGCP(uuid:string,imageType: string,imageName:string){
  let filePath = uuid + '/' + imageType + '/' + imageName;
  const response = await storage.bucket(bucketName).file(filePath).delete();
  return response
}
