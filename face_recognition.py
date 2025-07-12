import threading
import cv2
from deepface import DeepFace

model = DeepFace.build_model("VGG-Face")

cap = cv2.VideoCapture(0)
cap.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)

counter = 0
reference_image = cv2.imread("screenshot.png")
face_match = False

def check_face(frame):
    global face_match
    try:
        result = DeepFace.verify(frame, reference_image, model_name = "VGG-Face")
        face_match = result["verified"]
    except ValueError:
        face_match = False
    
while True:
    ret, frame = cap.read()
    if ret:
        if (counter % 15 == 0):
            try:
                threading.Thread(target=check_face, args = (frame.copy(), )).start()
            except ValueError:
                pass
        counter += 1
        
        if face_match:
            cv2.putText(frame, "MATCH", (20, 450), cv2.FONT_HERSHEY_SIMPLEX, 2, (0, 255, 0), 3)
        else:
            cv2.putText(frame, "NO MATCH", (20, 450), cv2.FONT_HERSHEY_SIMPLEX, 2, (0, 0, 255), 3)
    
    cv2.imshow("Face Recognition", frame)
        
    key = cv2.waitKey(1)
    if key == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()