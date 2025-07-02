from deepface import DeepFace
import cv2

video = cv2.VideoCapture(0)

if not video.isOpened():
    print("Error: Could not open video.")
    exit()

while True:
    ret, frame = video.read()
    if not ret:
        print("Error: Could not read frame.")
        break

    # Засичане на лица с DeepFace (само правоъгълник около лицето)
    try:
        faces = DeepFace.extract_faces(frame, detector_backend='opencv', enforce_detection=False)
        for face in faces:
            area = face.get('facial_area')
            if area:
                x = area.get('x', 0)
                y = area.get('y', 0)
                w = area.get('w', 0)
                h = area.get('h', 0)
                cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 255, 0), 2)
            # Можеш да добавиш и разпознаване:
            # analysis = DeepFace.analyze(face['face'], actions=['age', 'gender', 'emotion'], enforce_detection=False)
            # cv2.putText(frame, str(analysis['dominant_emotion']), (x, y-10), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0,255,0), 2)
    except Exception as e:
        pass

    cv2.imshow("DeepFace Live Face Recognition", frame)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

video.release()
cv2.destroyAllWindows()