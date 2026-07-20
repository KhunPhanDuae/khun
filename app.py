from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # GitHub Pages ကနေ API လှမ်းခေါ်လို့ရအောင် ခွင့်ပြုခြင်း

@app.route('/')
def home():
    return "Python Backend Server အလုပ်လုပ်နေပါပြီ!"

@app.route('/api/apps', methods=['GET'])
def get_apps():
    # ဒီနေရာမှာ Frontend (JS) ထို့ ပို့ပေးချင်တဲ့ Data များကို ထည့်ပါ
    data = [
        {"id": 1, "name": "SIBANK APP", "type": "bank"},
        {"id": 2, "name": "Admin App", "type": "admin"},
        {"id": 3, "name": "Digital app", "type": "digital"}
    ]
    return jsonify(data)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
