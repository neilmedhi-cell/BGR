# Background Remover

A browser-based AI background removal tool that removes image backgrounds, lets you customize the result, and download the finished image.

**Live Demo:** [Try it here]https://neon-bienenstitch-2d6db3.netlify.app/

## Features

- **Image Upload & Preview** — Upload an image and preview it before processing.
- **AI Background Removal** — Uses background-removal models from the Xenova ecosystem, including MODNet.
- **Custom Backgrounds** — Replace the transparent background with different colors.
- **Transparent Background** — Keep the background transparent.
- **Dynamic Compositing** — Change background options without rerunning AI inference.
- **Image Download** — Download the processed result.

## Tech Stack

- HTML
- CSS
- JavaScript
- Hugging Face Transformers.js
- MODNet and Xenova model implementations

## How It Works

1. Upload an image through the browser interface.
2. The selected AI model processes the image to generate a foreground cutout.
3. The application preserves the transparent cutout separately from the final composite.
4. Choose a background color or keep the background transparent.
5. Download the result.

The background customization system reuses the generated cutout, so changing the background does not require processing the original image again.

## Run Locally

### Requirements

- Node.js and npm
- A modern web browser
- An internet connection for dependencies and model downloads, where required

### Installation

Clone the repository and navigate into the project directory:

```bash
git clone YOUR_REPOSITORY_URL
cd YOUR_PROJECT_DIRECTORY
npm install
npm run dev
```

Open the local URL provided by the development server.

### Production Build

```bash
npm run build
```

With the default Vite configuration, the production build is generated in the `dist` directory.

## Browser Compatibility

The application runs in a web browser and uses JavaScript-based model inference. Processing speed and compatibility depend on the browser, device hardware, and the selected model's runtime requirements.

## Current Status

The core workflow is implemented: image upload, AI background removal, background customization, and downloading the result.

## Future Improvements

- Improve error handling and loading feedback.
- Test compatibility across browsers and devices.
- Improve cutout quality around complex edges.
- Refine the interface and user experience.

## License

Review the licenses of the models and dependencies used by the project before redistributing it or using it commercially.