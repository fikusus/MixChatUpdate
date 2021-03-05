// eslint-disable-next-line import/no-anonymous-default-export
export default (fileName) => {

    let filename = fileName.substring(0, fileName.lastIndexOf('_'))
    let ext = fileName.substring(fileName.lastIndexOf('.'))

    if (filename.length > 12) {
      filename =
      filename.slice(0, 12) + "..." ;
    } 


    let blobName = filename + ext


    return blobName;
  };