const { Jimp } = require('jimp');

async function processImage() {
  try {
    // Open the original uploaded image
    const image = await Jimp.read('C:\\Users\\prati\\.gemini\\antigravity\\brain\\d662ec2b-c611-4335-a3ee-083d10e8eb42\\.user_uploaded\\media__1785688247046.jpg');
    
    // Convert near-white to transparent
    image.scan(0, 0, image.bitmap.width, image.bitmap.height, function (x, y, idx) {
      const red   = this.bitmap.data[idx + 0];
      const green = this.bitmap.data[idx + 1];
      const blue  = this.bitmap.data[idx + 2];
      
      // If color is very close to white, make it transparent
      if (red > 240 && green > 240 && blue > 240) {
        this.bitmap.data[idx + 3] = 0; // Alpha channel to 0
      }
    });

    // Auto-crop transparent boundaries
    image.autocrop();

    // Save to the public folder
    image.write('D:\\FrontierPay-main\\public\\logo.png');
    console.log('Logo processed successfully.');
  } catch (err) {
    console.error('Error processing image:', err);
  }
}

processImage();
