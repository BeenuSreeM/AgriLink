import * as tf from '@tensorflow/tfjs';

class ModelCache {
  private static instance: ModelCache;
  private modelCache: tf.LayersModel | null = null;
  private modelPath: string = '/model/model.json';
  private isLoading: boolean = false;
  private loadingPromise: Promise<tf.LayersModel> | null = null;

  private constructor() {}

  public static getInstance(): ModelCache {
    if (!ModelCache.instance) {
      ModelCache.instance = new ModelCache();
    }
    return ModelCache.instance;
  }

  public async getModel(): Promise<tf.LayersModel> {
    if (this.modelCache) {
      return this.modelCache;
    }

    if (this.isLoading) {
      return this.loadingPromise!;
    }

    this.isLoading = true;
    this.loadingPromise = this.loadModel();

    try {
      this.modelCache = await this.loadingPromise;
      return this.modelCache;
    } finally {
      this.isLoading = false;
      this.loadingPromise = null;
    }
  }

  private async loadModel(): Promise<tf.LayersModel> {
    await tf.ready();
    const model = await tf.loadLayersModel(this.modelPath);
    // Warm up the model with a dummy prediction
    const dummyInput = tf.zeros([1, 224, 224, 3]);
    model.predict(dummyInput);
    dummyInput.dispose();
    return model;
  }

  public clearCache(): void {
    if (this.modelCache) {
      this.modelCache.dispose();
      this.modelCache = null;
    }
  }
}

export const modelCache = ModelCache.getInstance();