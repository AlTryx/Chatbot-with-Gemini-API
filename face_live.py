import warnings
warnings.filterwarnings("ignore")
import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'
os.chdir(os.path.dirname(os.path.abspath(__file__)))

from deepface import DeepFace
import cv2
import uuid

img = cv2.imread("screenshot.png")
print("Image shape:", img.shape if img is not None else "None")
try:
    faces = DeepFace.extract_faces(img, detector_backend='retinaface')
    if not faces:
        print("No face detected")
    else:
        os.makedirs("faces", exist_ok=True)
        for i, face in enumerate(faces):
            face_img = face["face"]
            filename = f"faces/face_{uuid.uuid4().hex[:8]}.jpg"
            cv2.imwrite(filename, face_img)
        print("Face recognised and saved")
except Exception as e:
    print("No face detected")