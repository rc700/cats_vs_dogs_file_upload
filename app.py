import tensorflow as tf
import numpy as np

from keras.models import Sequential
from keras.layers import Conv2D, MaxPooling2D
from keras.layers import Activation, Dropout, Flatten, Dense
from flask import Flask, request
from PIL import Image

app = Flask(__name__)

def catsVsDogsNet():
    model = Sequential()
    model.add(Conv2D(32, (3, 3), input_shape=(56, 56, 3)))
    model.add(Activation('relu'))
    model.add(MaxPooling2D(pool_size=(2, 2)))

    model.add(Conv2D(32, (3, 3)))
    model.add(Activation('relu'))
    model.add(MaxPooling2D(pool_size=(2, 2)))

    model.add(Conv2D(64, (3, 3)))
    model.add(Activation('relu'))
    model.add(MaxPooling2D(pool_size=(2, 2)))

    model.add(Flatten())
    model.add(Dense(64))
    model.add(Activation('relu'))
    model.add(Dropout(0.5))
    model.add(Dense(1))
    model.add(Activation('sigmoid'))

    return model

@app.route("/predict", methods=["POST"])
def predict():
    #Get image from request body
    imageFromUrl = Image.open(request.files['image'])

    #Resize image to size our model is expecting
    imageFromUrl = imageFromUrl.resize((56, 56), Image.ANTIALIAS)

    #Encode image as a numpy array
    img = np.asarray(imageFromUrl)

    #Use default tensorflow graph 
    global graph
    with graph.as_default():
        #Pass image to predict function of model
        prediction = model.predict(np.array([img]))
    
    #Use prediction value to get label and return it
    return labels[int(prediction.item(0))]

if __name__ == '__main__':
    graph = tf.get_default_graph()

    print 'initalizing model ...'
    model = catsVsDogsNet()

    print 'loading weights ... '
    model.load_weights('catsVsDogsModel_weights.h5')

    labels = ['cat', 'dog']

    app.run(debug=True)