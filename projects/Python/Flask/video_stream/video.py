import cv2
from threading import Thread
import time
class Video:
	single = None
	frame= None
	cap=None
	def __init__(self):
		if(Video.single):
			raise Exception("singleton already exists")
		else:
			Video.single=self;
		Video.cap= cv2.VideoCapture(-1)
		updateThread= Thread(target=Video.updateFrame, args=())
		updateThread.start()
	def init():
		if not Video.single:
			Video()
		return Video.single
	def updateFrame():
		while 1:
			success,frame = Video.cap.read()
			Video.frame= cv2.imencode('.jpeg',frame)[1].tostring()
			time.sleep(0.1)
	def getFrame(self):
		success,frame = Video.cap.read()
		Video.frame= cv2.imencode('.jpeg',frame)[1].tostring()		
		return Video.frame
