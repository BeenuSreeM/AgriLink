import * as tf from '@tensorflow/tfjs';

export async function createAndTrainModel() {
  // Model architecture for plant disease detection
  const model = tf.sequential();

  // Convolutional layers
  model.add(tf.layers.conv2d({
    inputShape: [224, 224, 3],
    filters: 32,
    kernelSize: 3,
    activation: 'relu',
    padding: 'same'
  }));
  model.add(tf.layers.maxPooling2d({ poolSize: 2 }));

  model.add(tf.layers.conv2d({
    filters: 64,
    kernelSize: 3,
    activation: 'relu',
    padding: 'same'
  }));
  model.add(tf.layers.maxPooling2d({ poolSize: 2 }));

  model.add(tf.layers.conv2d({
    filters: 128,
    kernelSize: 3,
    activation: 'relu',
    padding: 'same'
  }));
  model.add(tf.layers.maxPooling2d({ poolSize: 2 }));

  // Flatten and dense layers
  model.add(tf.layers.flatten());
  model.add(tf.layers.dense({ units: 128, activation: 'relu' }));
  model.add(tf.layers.dropout({ rate: 0.5 }));
  model.add(tf.layers.dense({ units: 3, activation: 'softmax' })); // 3 classes: Early Blight, Late Blight, Healthy

  // Compile model
  model.compile({
    optimizer: 'adam',
    loss: 'categoricalCrossentropy',
    metrics: ['accuracy']
  });

  // Save model
  await model.save('file://./public/model');
  console.log('Model created and saved successfully');

  return model;
}

// Function to preprocess training data
export async function preprocessTrainingData(images: string[]): Promise<tf.Tensor> {
  const processedImages = await Promise.all(images.map(async (imageData) => {
    const img = new Image();
    img.src = imageData;
    await new Promise(resolve => img.onload = resolve);

    return tf.tidy(() => {
      const tensor = tf.browser.fromPixels(img)
        .resizeNearestNeighbor([224, 224])
        .toFloat()
        .div(255.0)
        .expandDims(0);
      return tensor;
    });
  }));

  return tf.concat(processedImages, 0);
}

// Function to train the model
export async function trainModel(model: tf.LayersModel, trainData: tf.Tensor, trainLabels: tf.Tensor) {
  const BATCH_SIZE = 32;
  const EPOCHS = 10;

  await model.fit(trainData, trainLabels, {
    batchSize: BATCH_SIZE,
    epochs: EPOCHS,
    shuffle: true,
    validationSplit: 0.2,
    callbacks: {
      onEpochEnd: (epoch, logs) => {
        console.log(`Epoch ${epoch + 1} - loss: ${logs?.loss.toFixed(4)} - accuracy: ${logs?.acc.toFixed(4)}`);
      }
    }
  });

  console.log('Model training completed');
}