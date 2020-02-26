#!/usr/bin/env python
from flask import Flask, render_template, Response
from video import Video



app = Flask(__name__,template_folder="Views")

@app.route('/')
def index():
    return render_template('index.html')

def gen():
	vid= Video.init()
	vid.start()
	while True:
		frame= vid.getFrame()
		if(frame):
			yield (b'--frame\r\n'
				b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')
	vid.stop()	
@app.route('/video_feed')
def video_feed():
    return Response(gen(),
                    mimetype='multipart/x-mixed-replace; boundary=frame')

if __name__ == '__main__':
	
	app.run(host='localhost', debug=True)

