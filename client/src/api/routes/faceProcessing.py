from flask import Flask, request, jsonify
from deepface import DeepFace
import cv2
import numpy as np
import base64

app = Flask(__name__)

db_path = "faces"
model_name = "VGG-Face"
detector_backend = "retinaface"

@app.route("/recognize", methods=["POST"])
def recognize():
    data = request.json
    img_data = data["image"].split(",")[1]
    img_bytes = base64.b64decode(img_data)
    nparr = np.frombuffer(img_bytes, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    try:
        result = DeepFace.find(img_path = img, db_path = db_path, model_name=model_name, detector_backend=detector_backend, enforce_detection=False)
        if len(result) > 0 and len(result[0]) > 0:
            identity = result[0].iloc[0]['identity']
            return jsonify({"identity": identity})
        else:
            return jsonify({"identity": "Unknown"})
    except Exception as e:
        import traceback
        error_message = str(e)
        traceback_str = traceback.format_exc()
        print("[FaceRecognition ERROR]", error_message)
        print(traceback_str)
        return jsonify({"identity": "Error", "error": error_message, "trace": traceback_str})

if __name__ == "__main__":
    app.run(port=5001)
