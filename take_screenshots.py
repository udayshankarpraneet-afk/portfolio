import subprocess
import time
import urllib.request
import json
import base64
import socket
import os
import struct
import threading
import http.server
import socketserver

PORT = 8085
PORTFOLIO_DIR = r"C:\Users\Uday Shankar Praneet\.gemini\antigravity\scratch\portfolio"
ARTIFACTS_DIR = r"C:\Users\Uday Shankar Praneet\.gemini\antigravity\brain\be3d177a-369f-45f7-9c4b-79388aae5532"
SCREENSHOTS_DIR = os.path.join(PORTFOLIO_DIR, "screenshots")
os.makedirs(SCREENSHOTS_DIR, exist_ok=True)
os.makedirs(ARTIFACTS_DIR, exist_ok=True)

# Start simple HTTP server
class QuietHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=PORTFOLIO_DIR, **kwargs)
    def log_message(self, format, *args):
        pass

def start_server():
    with socketserver.TCPServer(("127.0.0.1", PORT), QuietHandler) as httpd:
        httpd.serve_forever()

server_thread = threading.Thread(target=start_server, daemon=True)
server_thread.start()
time.sleep(1)

class SimpleWebSocket:
    def __init__(self, url):
        url_parts = url.replace("ws://", "").split("/", 1)
        host_port = url_parts[0].split(":")
        self.host = host_port[0]
        self.port = int(host_port[1])
        self.path = "/" + url_parts[1] if len(url_parts) > 1 else "/"
        self.sock = socket.create_connection((self.host, self.port), timeout=15)
        self._handshake()
        self.msg_id = 0

    def _handshake(self):
        key = base64.b64encode(os.urandom(16)).decode('utf-8')
        req = (
            f"GET {self.path} HTTP/1.1\r\n"
            f"Host: {self.host}:{self.port}\r\n"
            f"Upgrade: websocket\r\n"
            f"Connection: Upgrade\r\n"
            f"Sec-WebSocket-Key: {key}\r\n"
            f"Sec-WebSocket-Version: 13\r\n\r\n"
        )
        self.sock.sendall(req.encode('utf-8'))
        resp = self.sock.recv(4096).decode('utf-8', errors='ignore')
        if "101" not in resp:
            raise Exception("WebSocket handshake failed:\n" + resp)

    def send_cmd(self, method, params=None):
        self.msg_id += 1
        msg = {"id": self.msg_id, "method": method}
        if params is not None:
            msg["params"] = params
        payload = json.dumps(msg).encode('utf-8')
        
        frame = bytearray()
        frame.append(0x81)
        length = len(payload)
        mask = os.urandom(4)
        if length <= 125:
            frame.append(0x80 | length)
        elif length <= 65535:
            frame.append(0x80 | 126)
            frame.extend(struct.pack("!H", length))
        else:
            frame.append(0x80 | 127)
            frame.extend(struct.pack("!Q", length))
        frame.extend(mask)
        masked_payload = bytearray(payload[i] ^ mask[i % 4] for i in range(length))
        frame.extend(masked_payload)
        self.sock.sendall(frame)
        return self.msg_id

    def recv_response(self, req_id):
        while True:
            header = self._recv_exact(2)
            b1, b2 = header[0], header[1]
            opcode = b1 & 0x0F
            is_masked = bool(b2 & 0x80)
            length = b2 & 0x7F
            if length == 126:
                length = struct.unpack("!H", self._recv_exact(2))[0]
            elif length == 127:
                length = struct.unpack("!Q", self._recv_exact(8))[0]
            
            mask = self._recv_exact(4) if is_masked else None
            data = self._recv_exact(length)
            if is_masked:
                data = bytearray(data[i] ^ mask[i % 4] for i in range(length))
            
            if opcode == 0x01:
                msg_obj = json.loads(data.decode('utf-8', errors='ignore'))
                if msg_obj.get("id") == req_id:
                    return msg_obj
            elif opcode == 0x08:
                break

    def _recv_exact(self, n):
        buf = bytearray()
        while len(buf) < n:
            chunk = self.sock.recv(n - len(buf))
            if not chunk:
                raise ConnectionError("Socket closed prematurely")
            buf.extend(chunk)
        return buf

    def close(self):
        try:
            self.sock.close()
        except:
            pass

def main():
    chrome_path = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
    user_data_dir = os.path.join(PORTFOLIO_DIR, "chrome_profile")
    proc = subprocess.Popen([
        chrome_path,
        '--headless=new',
        '--disable-gpu',
        '--remote-debugging-port=9222',
        f'--user-data-dir={user_data_dir}',
        '--window-size=1600,1200',
        '--hide-scrollbars',
        f'http://127.0.0.1:{PORT}/index.html'
    ])
    
    try:
        time.sleep(2.5)
        req = urllib.request.urlopen("http://127.0.0.1:9222/json/list")
        pages = json.loads(req.read().decode())
        target_page = next((p for p in pages if p.get("type") == "page"), pages[0])
        ws_url = target_page["webSocketDebuggerUrl"]
        print("Connected to target page:", ws_url)
        
        ws = SimpleWebSocket(ws_url)
        ws.send_cmd("Page.enable")
        ws.send_cmd("DOM.enable")
        
        # High DPI 2.0 override for ultra-crisp retina screenshots
        ws.send_cmd("Emulation.setDeviceMetricsOverride", {
            "width": 1400,
            "height": 900,
            "deviceScaleFactor": 2.0,
            "mobile": False
        })
        
        time.sleep(3.0)

        # Make sure all reveal-on-scroll elements are visible and terminal is preloaded with sample commands
        setup_script = """
        document.querySelectorAll('.reveal-on-scroll').forEach(el => el.classList.add('is-revealed'));
        const termOut = document.getElementById('term-output');
        if (termOut) {
            termOut.innerHTML += `
            <div class="terminal-line"><span class="term-cyan">guest@uday-terminal:~$</span> <span class="term-green">skills</span></div>
            <div class="terminal-line"><span class="term-purple">AI & ML:</span> Scikit-learn, NumPy, Pandas, EDA, Supervised/Unsupervised Models</div>
            <div class="terminal-line"><span class="term-purple">Full-Stack:</span> Python, C++, JavaScript (ES6+), MySQL, PostgreSQL, RBAC Security</div>
            <div class="terminal-line"><span class="term-cyan">guest@uday-terminal:~$</span> <span class="term-green">projects</span></div>
            <div class="terminal-line term-cyan">Smart Classroom Management System: 500 concurrent users • IEEE 830-1998 • &lt;3s latency</div>
            `;
            const termBody = document.getElementById('term-body');
            if (termBody) termBody.scrollTop = termBody.scrollHeight;
        }
        """
        ws.send_cmd("Runtime.evaluate", {"expression": setup_script})
        time.sleep(1.0)

        # Get precise section offsets
        get_offsets_script = """
        ({
            hero: document.querySelector('#hero').offsetTop,
            about: document.querySelector('#about').offsetTop,
            skills: document.querySelector('#skills').offsetTop,
            projects: document.querySelector('#projects').offsetTop,
            ml: document.querySelector('#ml-showcase').offsetTop,
            experience: document.querySelector('#experience').offsetTop,
            education: document.querySelector('#education').offsetTop,
            certs: document.querySelector('#certificates').offsetTop,
            contact: document.querySelector('#contact').offsetTop,
            totalHeight: document.body.scrollHeight
        })
        """
        req_id = ws.send_cmd("Runtime.evaluate", {"expression": get_offsets_script, "returnByValue": True})
        resp = ws.recv_response(req_id)
        offsets = resp["result"]["result"]["value"]
        print("Precise Offsets:", offsets)

        def capture_clip(filename, y, height, width=1400):
            print(f"Capturing {filename} at y={y}, height={height}...")
            # Scroll to position
            ws.send_cmd("Runtime.evaluate", {"expression": f"window.scrollTo(0, {y});"})
            time.sleep(1.2)
            
            # CDP captureScreenshot with clip coordinates
            req_id = ws.send_cmd("Page.captureScreenshot", {
                "format": "png",
                "clip": {
                    "x": 0,
                    "y": y,
                    "width": width,
                    "height": height,
                    "scale": 1.0
                },
                "captureBeyondViewport": True
            })
            resp = ws.recv_response(req_id)
            img_data = base64.b64decode(resp["result"]["data"])
            
            # Save to scratch/portfolio/screenshots/
            filepath_scratch = os.path.join(SCREENSHOTS_DIR, filename)
            with open(filepath_scratch, "wb") as f:
                f.write(img_data)
                
            # Save to brain artifact dir for markdown embedding
            filepath_artifact = os.path.join(ARTIFACTS_DIR, filename)
            with open(filepath_artifact, "wb") as f:
                f.write(img_data)
                
            print(f"[OK] Saved {filename} ({len(img_data)} bytes)")

        # 1. Screenshot 1: Hero Section (Header, Visual Profile, Floating Badges, CTAs)
        capture_clip("01_hero_section.png", y=0, height=910)

        # 2. Screenshot 2: About Me, Core Pillars & Interactive Developer Terminal + Skills Matrix
        capture_clip("02_about_terminal_skills.png", y=offsets["about"] - 20, height=2590)

        # 3. Screenshot 3: Featured Project Architecture (Smart Classroom Management System) & Live AI/ML Playground
        capture_clip("03_projects_and_ml_playground.png", y=offsets["projects"] - 20, height=2360)

        # 4. Screenshot 4: Industry Training, Education Timeline, Certifications & Badges, Contact Section & Footer
        capture_clip("04_training_education_certs_contact.png", y=offsets["experience"] - 20, height=4000)

        ws.close()
        print("All 4 comprehensive screenshots captured successfully!")

    finally:
        proc.terminate()

if __name__ == "__main__":
    main()
