import { base64UrlEncode } from "./utils/encoding";

function generateCardPreviewUrl(name, logoUrl) {
  const prefix = "https://res.cloudinary.com/do1dsm5uy/image/upload/";
  const suffix = "cherry.png";

  let textOption = "";

  if (name) {
    textOption = `l_text:Tinos_50_semibold:${name},co_rgb:5C2809DD,g_south_east,x_50,y_50/`;
  }

  let logoOption = "";

  if (logoUrl) {
    // Convert the logo URL to base64

    const base64logoUrl = base64UrlEncode(logoUrl);
    console.log("base64logoUrl: ", base64logoUrl);
    const base64logo =
      (logoOption = `l_fetch:${base64logoUrl},g_center,w_600,e_blackwhite,co_rgb:5C2809DD,e_colorize/`);
  }
  return `${prefix}${textOption}${logoOption}${suffix}`;
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
    console.log(logoUrl);
    const imagePreview = generateCardPreviewUrl(encodedCustomName, logoUrl);

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
