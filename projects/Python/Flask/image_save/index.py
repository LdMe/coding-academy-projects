from flask import Flask, request, send_file, render_template, Response
from flask_cors import CORS, cross_origin
import base64
import cv2
import numpy as np
import json

app = Flask(__name__,template_folder="./")
cors=CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type: application/json'

@app.route('/', methods = ['GET', 'POST'])
def index():
	if(request.method=="POST"):
		
		array= json.loads(request.form["array"])
		
		size= int(request.form["size"])
		
		name= request.form["name"];
		if(not name):
			name= "image.png"
		name= "images/"+name
		array=np.array(array,dtype=np.uint8).reshape(size,size,3);
		#im= cv2.imshow("image",array)
		cv2.imwrite(name,array)
	return send_file(name,mimetype="image/png", as_attachment=True)
if __name__ == '__main__':
    app.run(host='localhost', debug=True)