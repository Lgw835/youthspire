from flask import Flask, render_template, send_from_directory

app = Flask(__name__)

# 添加跨域支持
@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    return response

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/event')
def event():
    return render_template('event.html')

@app.route('/contact')
def contact():
    return render_template('contact.html')

@app.route('/event/<event_id>')
def event_detail(event_id):
    # 根据 event_id 返回对应的活动详情页面
    return render_template('event_detail.html', event_id=event_id)

@app.route('/static/music/<filename>')
def serve_music(filename):
    return send_from_directory('static/music', filename)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5002, debug=True) 