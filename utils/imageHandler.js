const sharp = require("sharp");

/**
 * Convert image buffer to Base64 with optional resizing
 * @param {Buffer} buffer - Image buffer
 * @param {Object} options - Processing options
 * @returns {Object} - Processed image data
 */
const processImage = async (buffer, options = {}) => {
  try {
    const {
      maxWidth = 800,
      maxHeight = 600,
      quality = 80,
      format = "jpeg",
      generateThumbnail = true,
      thumbnailSize = 200,
    } = options;

    // Process main image
    let processedImage = sharp(buffer);

    // Resize if dimensions exceed limits
    processedImage = processedImage.resize(maxWidth, maxHeight, {
      fit: "inside",
      withoutEnlargement: true,
    });

    // Convert to specified format and compress
    if (format === "jpeg") {
      processedImage = processedImage.jpeg({ quality });
    } else if (format === "png") {
      processedImage = processedImage.png({ quality });
    }

    const processedBuffer = await processedImage.toBuffer();
    const base64Data = processedBuffer.toString("base64");

    const result = {
      data: base64Data,
      contentType: `image/${format}`,
      size: processedBuffer.length,
    };

    // Generate thumbnail if requested
    if (generateThumbnail) {
      const thumbnailBuffer = await sharp(buffer)
        .resize(thumbnailSize, thumbnailSize, {
          fit: "cover",
          position: "center",
        })
        .jpeg({ quality: 70 })
        .toBuffer();

      result.thumbnail = {
        data: thumbnailBuffer.toString("base64"),
        contentType: "image/jpeg",
      };
    }

    return result;
  } catch (error) {
    throw new Error(`Image processing failed: ${error.message}`);
  }
};

/**
 * Validate image file
 * @param {Object} file - Multer file object
 * @returns {Boolean} - Validation result
 */
const validateImage = (file) => {
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
  const maxSize = 10 * 1024 * 1024; // 10MB

  if (!allowedTypes.includes(file.mimetype)) {
    throw new Error("Invalid file type. Only JPEG, PNG, and WebP are allowed.");
  }

  if (file.size > maxSize) {
    throw new Error("File too large. Maximum size is 10MB.");
  }

  return true;
};

/**
 * Convert Base64 to image buffer for serving
 * @param {String} base64Data - Base64 encoded image
 * @param {String} contentType - MIME type
 * @returns {Buffer} - Image buffer
 */
const base64ToBuffer = (base64Data, contentType) => {
  return Buffer.from(base64Data, "base64");
};

module.exports = {
  processImage,
  validateImage,
  base64ToBuffer,
};
