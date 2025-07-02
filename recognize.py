import cv2
import numpy as np
import face_recognition as faceRecognition
import sys

video = cv2.VideoCapture(0)

image = faceRecognition.load_image_file("girl.jpg")
known_encoding = faceRecognition.face_encodings(image)[0]

if not video.isOpened():
    print("Error: Couldnt open video.")
    sys.exit()
    
while True:
    ret, frame = video.read()
    rgb_frame = frame[:, :, ::-1]

    face_locations = faceRecognition.face_locations(rgb_frame)
    face_encodings = faceRecognition.face_encodings(rgb_frame, face_locations)

    for face_encoding in face_encodings:
        matches = faceRecognition.compare_faces([known_encoding], face_encoding)
        name = "Unknown"
        
        if True in matches:
            name = "You"

        for (top, right, bottom, left) in face_locations:
            cv2.rectangle(frame, (left, top), (right, bottom), (0, 255, 0), 2)
            cv2.putText(frame, name, (left, top - 10), cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 255, 255), 2)

    cv2.imshow("Face Recognition", frame)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break