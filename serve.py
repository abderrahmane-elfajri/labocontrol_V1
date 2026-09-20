import http.server
import socketserver
import webbrowser
import os

PORT = 8000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

if __name__ == '__main__':
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        url = f"http://localhost:{PORT}/design_files/terrain/index.html"
        print("=" * 56)
        print("  LABOCONTROL - Serveur Local Actif")
        print(f"  URL : {url}")
        print("  Appuyez sur Ctrl+C pour arreter le serveur.")
        print("=" * 56)
        webbrowser.open(url)
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServeur arrete.")

