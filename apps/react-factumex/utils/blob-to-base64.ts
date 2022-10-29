const blobToBase64 = (blob: Blob): Promise<string> => {
  const reader = new FileReader();
  reader.readAsDataURL(blob);
  return new Promise((resolve) => {
    reader.onloadend = (): void => {
      resolve(reader.result as string);
    };
  });
};

export default blobToBase64;
