from flask import Flask, jsonify
from flask_cors import CORS
from datetime import datetime

app = Flask(__name__)

# GitHub Pages ကနေ လှမ်းခေါ်လို့ရအောင် CORS ခွင့်ပြုခြင်း
CORS(app)

@app.route('/')
def home():
    return "RYPAK Python Backend Server is Live!"

# Frontend (rypak.html) မှ လှမ်းခေါ်မည့် Main API Route
@app.route('/api/apps', methods=['GET'])
def get_apps():
    # Python Backend မှ Dynamic ပို့ပေးမည့် အချက်အလက်များ
    apps_data = [
        {
            "id": 1,
            "name": "SIBANK APP",
            "icon": "fa-solid fa-dollar-sign",
            "color": "#00bcd4",
            "download_url": "#download-sibank"
        },
        {
            "id": 2,
            "name": "Admin App",
            "icon": "fa-brands fa-android",
            "color": "#4caf50",
            "download_url": "#download-admin"
        },
        {
            "id": 3,
            "name": "Digital app",
            "icon": "fa-solid fa-code",
            "color": "#212121",
            "download_url": "#download-digital"
        }
    ]

    # Python ရဲ့ ထူးခြားချက်- Server ရဲ့ လက်ရှိ အချိန်နှင့် စာတိုကိုပါ Backend မှ ပို့ပေးခြင်း
    current_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    response_data = {
        "status": "success",
        "server_time": current_time,
        "message": "🔥 Python Backend (Render) နှင့် အောင်မြင်စွာ ချိတ်ဆက်ထားပါသည်။",
        "apps": apps_data
    }

    return jsonify(response_data)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
