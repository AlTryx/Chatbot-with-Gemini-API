# face_stream.py
import threading
import cv2
from deepface import DeepFace

model = DeepFace.build_model("VGG-Face")
reference_path = "faces/screenshot.png"
reference_image = cv2.imread(reference_path)

cap = cv2.VideoCapture(0)
cap.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)

counter = 0
not_match_counter = 0
face_match = False

def check_face(frame):
    global face_match
    try:
        result = DeepFace.verify(frame, reference_image, model_name="VGG-Face")
        face_match = result["verified"]
    except:
        face_match = False

while True:
    ret, frame = cap.read()
    if ret:
        if counter % 15 == 0:
            threading.Thread(target=check_face, args=(frame.copy(),)).start()
        counter += 1

        if face_match:
            not_match_counter = 0
            cv2.putText(frame, "MATCH", (20, 450), cv2.FONT_HERSHEY_SIMPLEX, 2, (0, 255, 0), 3)
        else:
            not_match_counter += 1
            cv2.putText(frame, f"NO MATCH ({not_match_counter})", (20, 450), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2)
            if not_match_counter >= 90:
                print("SWITCH USER")
                not_match_counter = 0

        cv2.imshow("Face Recognition", frame)

    key = cv2.waitKey(1)
    if key == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
