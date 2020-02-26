import cv2
from threading import Thread
import time


class Video:
	single=None
	def __init__(self, src=0):
		self.stream = cv2.VideoCapture(src)
		(self.grabbed, self.frame) = self.stream.read()
		self.stopped = True
		Video.single=self
	def start(self):
		if(self.stopped):
			self.stopped = False
			Thread(target=self.get, args=()).start()
			
			return self
	@classmethod
	def init(Video):
		if not Video.single:
			return Video()
		return Video.single
	def getFrame(self):
		if self.frame is None:
			return self.frame
		return cv2.imencode('.jpeg',self.frame)[1].tostring()
	def get(self):
		try:
			while not self.stopped:
				if not self.grabbed:
					self.stop()
				else:
					(self.grabbed, self.frame) = self.stream.read()
		except Exception as e:
			Video.single=None
			self.stop()
			del self
	def stop(self):
		self.stopped = True
