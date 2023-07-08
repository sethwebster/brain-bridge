async function uploadFile(presignedUrl: string, file: File) {
  const response = await fetch(presignedUrl, {
    method: "PUT",
    body: file,    
  });
  return response;
}

const R2Client = {
  uploadFile
}

export default R2Client;