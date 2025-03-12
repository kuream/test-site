window.addEventListener('load', () => {
    const textElement = document.querySelector('.intro-text');
    const rootElement = document.getElementById('root');
    
    // Create a hidden canvas to extract pixel data from the background
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    function getDominantColorFromCanvas() {
      // Get the background color or image from the #root element
      const width = rootElement.offsetWidth;
      const height = rootElement.offsetHeight;
  
      canvas.width = width;
      canvas.height = height;
  
      // Get the background image URL from CSS (this assumes the background is set via CSS)
      const bgImageUrl = window.getComputedStyle(rootElement).backgroundImage;
  
      if (bgImageUrl && bgImageUrl !== 'none') {
        // Extract the URL of the background image from the CSS string
        const imageUrl = bgImageUrl.slice(5, -2); // Remove "url(" and ")"
  
        const image = new Image();
        image.src = imageUrl;
  
        // When the image is loaded, draw it onto the canvas
        image.onload = function() {
          try {
            // Draw the background image onto the canvas
            ctx.drawImage(image, 0, 0, width, height);
  
            // Get pixel data from the canvas
            const pixelData = ctx.getImageData(0, 0, width, height).data;
  
            let r = 0, g = 0, b = 0;
            const pixelCount = pixelData.length / 4;
  
            // Loop through all pixels and calculate the average RGB
            for (let i = 0; i < pixelData.length; i += 4) {
              r += pixelData[i];     // Red
              g += pixelData[i + 1]; // Green
              b += pixelData[i + 2]; // Blue
            }
  
            // Calculate average RGB values
            r = Math.floor(r / pixelCount);
            g = Math.floor(g / pixelCount);
            b = Math.floor(b / pixelCount);
            
            // Calculate luminance (to determine whether text should be light or dark)
            const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b);
  
            // Based on luminance, set the text color (dark or light)
            if (luminance < 128) {
              textElement.style.setProperty('color', 'red', 'important'); // Dark background -> red text
            } else {
              textElement.style.setProperty('color', 'black', 'important');  // Light background -> black text
            }
  
          } catch (e) {
            console.error("Error rendering background image to canvas", e);
          }
        };
  
        // Handle image loading errors
        image.onerror = function() {
          console.error('Error loading background image');
        };
      }
    }
  
    // Call the function periodically to update text color based on background
    setInterval(getDominantColorFromCanvas, 100); // Update every 100ms (adjust if needed)
  });
  