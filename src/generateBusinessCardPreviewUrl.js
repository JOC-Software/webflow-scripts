// CONSTANTS

const CLOUDINARY_BASE_URL =
  "https://res.cloudinary.com/do1dsm5uy/image/upload/";

const FONT = "Roboto";
const FONT_SIZE = "64";
const LOGO_SIZE = "h_400,w_600,c_limit";

const CARD_VARIANT_PARAMS = {
  49960146305355: {
    name: "Cherry Engraved",
    path: "cherry.png",
    logoParam: "e_blackwhite,co_rgb:5C2809DD,e_colorize",
    textColor: "5C2809DD",
  },
  49960146338123: {
    name: "Maple Engraved",
    path: "maple.png",
    logoParam: "e_blackwhite,co_rgb:785021BB,e_colorize",
    textColor: "785021BB",
  },
  49912178540875: {
    name: "Gold Engraved",
    path: "pvc.png",
    logoParam: "e_blackwhite,co_rgb:785021BB,e_colorize",
    textColor: "FDEF76",
  },
  49912178573643: {
    name: "Silver Engraved",
    path: "pvc.png",
    logoParam: "e_blackwhite,co_rgb:CECECE,e_colorize",
    textColor: "CECECE",
  },
  PVC_PRINT: {
    name: "PVC Print",
    path: "pvc.png",
    textColor: "FFF",
  },
  CHERRY_PRINT: {
    name: "Cherry Print",
    path: "pvc.png",
    textColor: "000",
  },
  MAPLE_PRINT: {
    name: "Maple Print",
    path: "pvc.png",
    textColor: "000",
  },
  SILVER_PRINT: {
    name: "Silver Print",
    path: "pvc.png",
    textColor: "000",
  },
  GOLD_PRINT: {
    name: "Gold Print",
    path: "pvc.png",
    textColor: "000",
  },
};

// END CONSTANTS

// UTILS
function base64UrlEncode(str) {
  // Convert string to Base64
  let base64 = btoa(str);

  // Replace Base64 characters to make it URL safe
  const base64UrlEncoded = base64
    .replace(/\+/g, "-") // Replace + with -
    .replace(/\//g, "_") // Replace / with _
    .replace(/=+$/, ""); // Remove any = padding

  return base64UrlEncoded;
}

// END UTILS

function generateBusinessCardPreviewUrl(name, logoUrl) {
  // Get the variant from the URL
  const urlParams = new URLSearchParams(window.location.search);
  const variant = urlParams.get("variant");

  // Get the right params from card_variant_params
  const variantParams = CARD_VARIANT_PARAMS[variant] || {};

  let textOption = "";

  if (name) {
    textOption = `l_text:${FONT}_${FONT_SIZE}:${name},co_rgb:${variantParams.textColor},g_south_east,x_89,y_71/`;
  }

  let logoOption = "";

  if (logoUrl) {
    const base64logoUrl = base64UrlEncode(logoUrl);
    logoOption = `l_fetch:${base64logoUrl},g_center,${LOGO_SIZE}${
      variantParams.logoParam ? "," + variantParams.logoParam : ""
    }/`;
  }

  return `${CLOUDINARY_BASE_URL}${textOption}${logoOption}${variantParams.path}`;
}

// Wait for the DOM to fully load
document.addEventListener("DOMContentLoaded", function () {
  // Select the button with id 'show-image-button'
  var button = document.getElementById("show-image-button");

  // Add a click event listener to the button
  button.addEventListener("click", function () {
    // Select the div with id 'product-images'
    const productImagesDiv = document.getElementById("product-images");

    // Get the value from the input field with id 'custom-name'
    const customName = document.getElementById("custom-name").value;

    // URL encode the custom name to make it safe for use in the URL
    const encodedCustomName = encodeURIComponent(customName);

    // Create a new img element
    var img = document.createElement("img");

    // Create cloudinary preview
    const logoUrl = document.getElementById("logo-display")?.src;
    const imagePreview = generateBusinessCardPreviewUrl(
      encodedCustomName,
      logoUrl
    );

    // Set the src of the image, replacing 'TextOnCard' with the encoded custom name
    img.src = imagePreview;

    // Optionally, set the image's alt text
    img.alt = "Customized Business Card Preview";

    // Replace the div content with the image
    if (productImagesDiv) {
      productImagesDiv.innerHTML = ""; // Clear any existing content
      productImagesDiv.appendChild(img); // Append the image
    }
  });
});
