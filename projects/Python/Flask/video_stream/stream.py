#!/usr/bin/env python
from flask import Flask, render_template, Response

import cv2
cap= None;
cap=cv2.VideoCapture(-1)

app = Flask(__name__,template_folder="Views")

@app.route('/')
def index():
    return render_template('index.html')

def gen():
    while True:
        success,frame = cap.read()
        frame= cv2.imencode('.jpeg',frame)[1].tostring()
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

@app.route('/video_feed')
def video_feed():
    return Response(gen(),
                    mimetype='multipart/x-mixed-replace; boundary=frame')

if __name__ == '__main__':
    app.run(host='localhost', debug=True)