#!/usr/bin/env python
from flask import Flask, render_template, Response
from video import Video



print("toto")
"""
while 1:
	success,frame = cap.read()
	cv2.imshow("frame",frame)
	cv.waitKey()
"""
"""
for x in range(-1,10):
	cap=cv2.VideoCapture(x)
	if(cv2.VideoCapture.open(x)):
		break
"""
app = Flask(__name__,template_folder="Views")

@app.route('/')
def index():
    return render_template('index.html')

def gen():
	vid= Video.init()
	while True:
		frame= vid.getFrame()
		yield (b'--frame\r\n'
			b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

@app.route('/video_feed')
def video_feed():
    return Response(gen(),
                    mimetype='multipart/x-mixed-replace; boundary=frame')

if __name__ == '__main__':
	
	app.run(host='localhost', debug=True)

