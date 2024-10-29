// CONSTANTS

const CLOUDINARY_BASE_URL =
  "https://res.cloudinary.com/do1dsm5uy/image/upload/";

const FONT = "Roboto";
const FONT_SIZE = "64";
const LOGO_SIZE = "h_400,w_600,c_limit";
const LOGO_URL_PLACEHOLDER =
  "https://cdn.prod.website-files.com/6553517a27f02d8ced998612/66fbd508864665c646883b4b_transparent-placeholder.png";

const CARD_VARIANT_PARAMS = {
  49960146305355: {
    name: "Cherry Engraved",
    path: "cherry-engraved.png",
    textColor: "5C2809DD",
    type: "engraved",
  },
  49960146338123: {
    name: "Maple Engraved",
    path: "maple-engraved.png",
    textColor: "785021BB",
    type: "engraved",
  },
  49912178540875: {
    name: "Gold Engraved",
    path: "gold-engraved.png",
    textColor: "FDEF76",
    type: "engraved",
  },
  49912178573643: {
    name: "Silver Engraved",
    path: "silver-engraved.png",
    textColor: "CECECE",
    type: "engraved",
  },
  50670509785419: {
    name: "PVC Print",
    path: "pvc.png",
    textColor: "FFF",
    type: "print",
  },
  50670509818187: {
    name: "PVC Print",
    path: "pvc-white.png",
    textColor: "000",
    type: "print",
  },
  CHERRY_PRINT: {
    name: "Cherry Print",
    path: "pvc.png",
    textColor: "000",
    type: "print",
  },
  MAPLE_PRINT: {
    name: "Maple Print",
    path: "pvc.png",
    textColor: "000",
    type: "print",
  },
};

// END CONSTANTS

// UTILS
function base64UrlEncode(str) {
  let base64 = btoa(str);
  const base64UrlEncoded = base64
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
  return base64UrlEncoded;
}
// END UTILS

function generateBusinessCardPreviewUrl(name, logoUrl) {
  const urlParams = new URLSearchParams(window.location.search);
  const variant = urlParams.get("variant");
  const variantParams = CARD_VARIANT_PARAMS[variant] || {};

  let textOption = "";
  if (name) {
    textOption = `l_text:${FONT}_${FONT_SIZE}:${name},co_rgb:${variantParams.textColor},g_south_east,x_89,y_71/`;
  }

  let logoOption = "";
  let path = variantParams.path;

  if (variantParams.type === "print" && logoUrl !== LOGO_URL_PLACEHOLDER) {
    const base64logoUrl = base64UrlEncode(logoUrl);
    logoOption = `l_fetch:${base64logoUrl},g_center,${LOGO_SIZE}/`;
  } else if (
    variantParams.type === "engraved" &&
    logoUrl === LOGO_URL_PLACEHOLDER
  ) {
    path = path.split("-")[0];
  }

  return `${CLOUDINARY_BASE_URL}${textOption}${logoOption}${path}`;
}

function updatePreview() {
  const productImagesDiv = document.getElementById("product-images");
  const customName = document.getElementById("custom-name").value;
  const logoUrl = document.getElementById("logo-display")?.src;

  if (!customName && logoUrl == LOGO_URL_PLACEHOLDER) {
    return;
  }

  const encodedCustomName = encodeURIComponent(customName);
  const imagePreview = generateBusinessCardPreviewUrl(
    encodedCustomName,
    logoUrl
  );

  const img = document.createElement("img");
  img.src = imagePreview;
  img.alt = "Customized Business Card Preview";

  if (productImagesDiv) {
    productImagesDiv.innerHTML = "";
    productImagesDiv.appendChild(img);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const button = document.getElementById("show-image-button");
  button.addEventListener("click", updatePreview);

  const variantOptions = document.querySelectorAll(".custom-option-selector");
  variantOptions.forEach((option) => {
    option.addEventListener("click", function () {
      setTimeout(updatePreview, 100);
    });
  });

  const logoDisplay = document.getElementById("logo-display");
  if (logoDisplay) {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "src"
        ) {
          updatePreview();
        }
      });
    });
    observer.observe(logoDisplay, {
      attributes: true,
      attributeFilter: ["src"],
    });
  }
});
