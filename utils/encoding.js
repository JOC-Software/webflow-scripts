export function base64UrlEncode(str) {
  // Convert string to Base64
  let base64 = btoa(str);

  // Replace Base64 characters to make it URL safe
  const base64UrlEncoded = base64
    .replace(/\+/g, "-") // Replace + with -
    .replace(/\//g, "_") // Replace / with _
    .replace(/=+$/, ""); // Remove any = padding

  return base64UrlEncoded;
}
