from flask import Flask, render_template_string
import os
PICO_ROOT = os.environ.get('PICO_ROOT')


app = Flask(__name__, 
    static_folder=f'{PICO_ROOT}/picoUi/picox')

if PICO_ROOT is None:
    raise ValueError("The PICO_ROOT environment variable is not set.")
elif not os.path.isdir(PICO_ROOT):
    raise ValueError(f"The specified PICO_ROOT path does not exist: {PICO_ROOT}")
else:
    print(f"Using existing PICO_ROOT directory: {PICO_ROOT}")

@app.route('/')
def index():
    print("Accessing the root route")
    return app.send_static_file(f'index.html')

@app.route('/pico/choices')
def pico_choices():
    choices_html = f"""
    <li><a href="{PICO_ROOT}/pico-css/v1-preview/">Preview</a></li>
    <li><a href="{PICO_ROOT}/pico-css/v1-basic-template/">Basic template</a></li>
    <li><a href="{PICO_ROOT}/pico-css/v1-company/">Company</a></li>
    """
    return render_template_string(choices_html)

if __name__ == '__main__':
    app.run(debug=True)

