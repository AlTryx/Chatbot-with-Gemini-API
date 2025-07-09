import warnings
warnings.filterwarnings("ignore")
import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'
os.chdir(os.path.dirname(os.path.abspath(__file__)))

from deepface import DeepFace
import cv2
import uuid

img = cv2.imread("screenshot.png")
if img is not None:
    img = cv2.resize(img, (300, 200))
print("Image shape:", img.shape if img is not None else "None")
try:
    faces = DeepFace.extract_faces(img, detector_backend='opencv')
    if not faces:
        print("No face detected")
    else:
        os.makedirs("faces", exist_ok=True)
        for i, face in enumerate(faces):
            face_img = face["face"]
            filename = f"faces/face_{uuid.uuid4().hex[:8]}.jpg"
            cv2.imwrite(filename, face_img)
        print("Face detected and saved")
except Exception as e:
    print("No face detected")