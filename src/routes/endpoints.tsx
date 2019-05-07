const baseUrl = `https://app.thegoodpeoplefarms.com`;

export const userImageUploadUrl = (
  userId: string,
  imageType: "rec_image" | "dl_image"
) => `${baseUrl}//api/users/upload/${userId}/${imageType}`;
