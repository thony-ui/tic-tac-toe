// src/MLComponent.js

import React, { useState, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';

const MLComponent = () => {
  const [model, setModel] = useState(null);
  const [prediction, setPrediction] = useState(null);

  useEffect(() => {
    const loadModel = async () => {
      const model = await tf.loadLayersModel('/tfjs_model/mnist_model.json');
      console.log(model)
      setModel(model);
    };

    loadModel();
  }, []);

  console.log(model)
  const handlePrediction = async (event) => {
    if (model) {
      const file = event.target.files[0];
      const imageBitmap = await createImageBitmap(file);
      const imgTensor = tf.browser.fromPixels(imageBitmap, 1)
        .resizeBilinear([28, 28])
        .expandDims(0)
        .toFloat()
        .div(tf.scalar(255));
      const prediction = model.predict(imgTensor);
      const predictionValues = await prediction.array();
      console.log(predictionValues)
      setPrediction(predictionValues);
    }
  };

  return (
    <div className='flex flex-col items-center mt-[20px]'>
      <h1>MNIST Model</h1>
      <input type="file" accept="image/*" onChange={handlePrediction} />
      {prediction && (
        <div>
          <h2>Prediction</h2>
          <p>{`Number: ${prediction[0].indexOf(Math.max(...prediction[0]))}`}</p>
        </div>
      )}
    </div>
  );
};

export default MLComponent;
