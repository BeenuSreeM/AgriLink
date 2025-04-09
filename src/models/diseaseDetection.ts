import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-backend-webgl';

const diseaseClasses = ['Early Blight', 'Late Blight', 'Healthy'];

import { modelCache } from './modelCache';

export const detectDisease = async (imageElement: HTMLImageElement): Promise<string> => {
  let tensor: tf.Tensor | null = null;
  let prediction: tf.Tensor | null = null;

  try {
    // Get cached model instance
    const model = await modelCache.getModel();

    // Process image efficiently using tf.tidy to auto-cleanup intermediate tensors
    tensor = tf.tidy(() => {
      return tf.browser.fromPixels(imageElement)
        .resizeNearestNeighbor([224, 224])
        .toFloat()
        .div(255.0)
        .expandDims();
    });

    // Make prediction
    prediction = model.predict(tensor) as tf.Tensor;
    const data = await prediction.data();
    const maxIndex = data.indexOf(Math.max(...data));
    return diseaseClasses[maxIndex];
  } catch (err) {
    console.error('Error during disease detection:', err);
    return 'Error detecting disease. Please ensure the image is clear and try again.';
  } finally {
    // Cleanup tensors
    if (tensor) tensor.dispose();
    if (prediction) prediction.dispose();
  }
};
