class SettingsComponent {
    constructor(elementId, app) {
        this.element = document.getElementById(elementId);
        this.app = app;
        this.init(app.state);
        this.attachEventListeners();
    }

    attachEventListeners() {
        // Attach change event listener
        this.element.addEventListener('change', (event) => {
            if (event.target.matches('#loggingToggle')) {
                this.app.handleLogging(event.target.checked);
            }
        });


    // Updated displayViewportSize function
    function displayViewportSize() {
        let w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        let h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        document.getElementById('viewportSize').textContent = `Viewport is ${w} x ${h}`;
    }

    // Improved event listener
    document.addEventListener('DOMContentLoaded', function() {
        const loggingToggle = document.getElementById('loggingToggle');
        if (loggingToggle) {
            loggingToggle.addEventListener('change', function(event) {
                if (event.target && event.target.matches('#loggingToggle')) {
                    displayViewportSize();
                }
            });
        }
    });


        // Attach click event listener
        this.element.addEventListener('click', (event) => {
            if (event.target.matches('[data-theme-skin="techno"]')) {
                event.preventDefault();
                this.app.handleLoadTechnoStylesheet();
                picoDebug && console.log("Techno theme selected");
            } else if (event.target.matches('#refreshButton')) {
                event.preventDefault();
                location.reload(true);
                picoDebug && console.log("Page refreshed");
            }
        });
    }

    init(state) {
            picoDebug && console.log("SettingsComponent::update(state)", state);
            this.element.innerHTML = `
            <div class="settingsComponent">
            <nav>
            <ul>
              <li>
                <details role="list">
                  <summary aria-haspopup="listbox" role="button" class="secondary">Theme</summary>
                  <ul role="listbox">
                    <li><a href="#" data-theme-switcher="auto">Auto</a></li>
                    <li><a href="#" data-theme-switcher="light">Light</a></li>
                    <li><a href="#" data-theme-switcher="dark">Dark</a></li>
                  </ul>
                </details>
              </li>
              <li>
                <details role="list">
                  <summary aria-haspopup="listbox">Skins</summary>
                  <ul role="listbox">
                    <li><a href="../pico/v1-preview/">Preview</a></li>
                    <li><a href="../v1-bootstrap-grid/">Bootstrap grid</a></li>
                    <li><a href="#" data-theme-skin="techno">Techno</a></li>
                  </ul>
                </details>
              </li>
            </ul>
          </nav>
          <button id="refreshButton">Refresh</button>
          <div class="viewport-dimensions">
            <p id="viewportSize"></p>
          </div>

            <div class="form-group">
            <label>
                <input type="checkbox" ${state.loggingEnabled ? 'checked' : ''} id="loggingToggle" />
                Enable Logging
            </label>
            </div>
          </div>
            `;
            themeSwitcher.init();
        }
    }
