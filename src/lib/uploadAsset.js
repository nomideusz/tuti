function upload(file, path, width, height, progressCallback) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('path', path);
  formData.append('width', width);
  formData.append('height', height);

  return new Promise(function (resolve, reject) {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve(xhr);
        } else {
          reject(xhr);
        }
      }
    };

    if (progressCallback) {
      xhr.upload.onprogress = e => {
        if (e.lengthComputable) {
          const percentComplete = (e.loaded / file.size) * 100;
          progressCallback(parseInt(percentComplete, 10));
        }
      };
    }
    xhr.open('PUT', '/api/upload-asset');
    xhr.send(formData);
  });
}

export default async function uploadAsset(file, path, width, height, onProgress) {
  await upload(file, path, width, height, onProgress);
  return path;
}
