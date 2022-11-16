from config import *
import tensorflow as tf
model = tf.keras.models.load_model('./my_model.h5')

sequence = []
sentence = []
threshold = 0.7

zezo = [0 for x in range(0, 21*3 * 2)]
print(zezo)


# Set mediapipe model
with mp_holistic.Holistic(min_detection_confidence=0.5, min_tracking_confidence=0.5) as holistic:
    path_video = "./videos/brother/brother_02501_cut.mp4"
    cap = cv2.VideoCapture(path_video)
    ret, frame = cap.read()
    while ret:
        image, results = mediapipe_detection(frame, holistic)
        keypoints = extract_keypoints(results)
        if (keypoints[-21*3 * 2:] == np.array(zezo)).all():
            print("empty")
            ret, frame = cap.read()
            continue
        sequence.insert(0, keypoints)
        sequence = sequence[:10]

        if len(sequence) == 10:
            res = model.predict(np.expand_dims(sequence, axis=0))[0]
            print(actions[np.argmax(res)])
            if res[np.argmax(res)] > threshold:
                if len(sentence) > 0:
                    if actions[np.argmax(res)] != sentence[-1]:
                        sentence.append(actions[np.argmax(res)])
                else:
                    sentence.append(actions[np.argmax(res)])
        if len(sentence) > 5:
            sentence = sentence[-5:]
        ret, frame = cap.read()

        if cv2.waitKey(10) & 0xFF == ord('q'):
            break
    cap.release()
    cv2.destroyAllWindows()
