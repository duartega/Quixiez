const baseUrl = `https://api.stage.quixiez.com`;

export const userImageUploadUrl = (
  userId: string,
  imageType: "rec_image" | "dl_image"
) => `${baseUrl}/users/upload/${userId}/${imageType}`;
