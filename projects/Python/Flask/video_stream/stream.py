#!/usr/bin/env python
from flask import Flask, render_template, Response

import cv2
cap= None;
cap=cv2.VideoCapture(-1)
"""
for i in range(-2,10):
	if(cap!= None and cap.isOpened()):
		print("duck my sick")
		break
	try:
		cap=cv2.VideoCapture(i)
		print(cap)
		if(cap != None and cap.isOpened()):
			print(str(i)+" index connected")
			break
		else:
			print("not working");
	except Exception as e:
		print(str(i)+" index can't be connected")
for i in range(-2,10):
	if(cap!=None and cap.isOpened()):
		print("duck my sick")
		break
	try:
		print("/dev/video"+str(i))
		cap=cv2.VideoCapture("/dev/video"+str(i))
		print(cap)
		if(cap != None and cap.isOpened()):
			print(str(i)+" index connected")
			break
		else:
			print("name not working");
	except Exception as e:
		print(str(i)+" index can't be connected")
"""


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