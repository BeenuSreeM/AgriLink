# Model Directory

This directory is intended for storing the TensorFlow.js model files for plant disease detection.

## Required Files

Place your trained model files here:
- `model.json` - The model architecture and weights manifest
- `*.bin` - The model weight binary files

## Model Format

The model should be converted to TensorFlow.js format and should:
- Accept input images of size 224x224x3
- Output predictions for classes: ['Early Blight', 'Late Blight', 'Healthy']

## Important Notes

1. Ensure your model files are properly converted to TensorFlow.js format
2. The model.json file should be named exactly as 'model.json'
3. Keep all associated weight files in this same directory
4. Do not remove or modify this README file