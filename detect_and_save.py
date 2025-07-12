# detect_and_save.py
import os
import sys
import cv2
from deepface import DeepFace

def save_image(file_path, name):
    img = cv2.imread(file_path)
    if( img is None):
        print("Image not found")
        return

    try:
        detected_faces = DeepFace.extract_faces(img, enforce_detection=True)
        if not detected_faces:
            print("no_face")
            if(os.path.exists(file_path)):
                os.remove(file_path)
            return
        else:
            cv2.imwrite(f"faces/{name}.png", img)
            print("saved")    
    except Exception as e:
        if os.path.exists(file_path):
                os.remove(file_path)
        print("error")

if __name__ == "__main__":
    if(len(sys.argv) <3):
        print("erererrreorroor")
        sys.exit(1)
    file_path = sys.argv[1]
    name = sys.argv[2]
    save_image(file_path, name)
