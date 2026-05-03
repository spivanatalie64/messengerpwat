(function() {
    Object.defineProperty(navigator, 'webdriver', { get: () => undefined, configurable: true });
    Object.defineProperty(navigator, 'platform', { get: () => 'Linux x86_64', configurable: true });
    Object.defineProperty(navigator, 'vendor', { get: () => 'Google Inc.', configurable: true });
    Object.defineProperty(navigator, 'languages', { get: () => ['en-US','en'], configurable: true });
    Object.defineProperty(navigator, 'maxTouchPoints', { get: () => 0, configurable: true });
    Object.defineProperty(navigator, 'connection', { get: () => ({ effectiveType: '4g', rtt: 50, downlink: 10, saveData: false }), configurable: true });

    if (!window.chrome) {
        window.chrome = {};
    }
    if (!window.chrome.runtime) {
        window.chrome.runtime = { connect: function(){}, sendMessage: function(){}, id: undefined };
    }

    const origQuery = window.Permissions && Permissions.prototype.query;
    if (origQuery) {
        Permissions.prototype.query = function(params) {
            if (params.name === 'camera' || params.name === 'microphone') {
                return Promise.resolve({ state: 'granted', onchange: null });
            }
            return origQuery.call(this, params);
        };
    }

    const origGetParam = WebGLRenderingContext.prototype.getParameter;
    WebGLRenderingContext.prototype.getParameter = function(param) {
        if (param === 37445) return 'Google Inc. (NVIDIA)';
        if (param === 37446) return 'ANGLE (NVIDIA, NVIDIA GeForce GPU, OpenGL 4.5)';
        return origGetParam.call(this, param);
    };

    if (typeof WebGL2RenderingContext !== 'undefined') {
        const origGetParam2 = WebGL2RenderingContext.prototype.getParameter;
        WebGL2RenderingContext.prototype.getParameter = function(param) {
            if (param === 37445) return 'Google Inc. (NVIDIA)';
            if (param === 37446) return 'ANGLE (NVIDIA, NVIDIA GeForce GPU, OpenGL 4.5)';
            return origGetParam2.call(this, param);
        };
    }

    delete navigator.__proto__.automation;
    delete navigator.__proto__.controlledByAutomation;

    const originalToString = Function.prototype.toString;
    const nativeToStringStr = originalToString.call(Function.prototype.toString);
    Function.prototype.toString = function() {
        if (this === Function.prototype.toString) return nativeToStringStr;
        if (this === Permissions.prototype.query) return 'function query() { [native code] }';
        if (this === WebGLRenderingContext.prototype.getParameter) return 'function getParameter() { [native code] }';
        if (typeof WebGL2RenderingContext !== 'undefined' && this === WebGL2RenderingContext.prototype.getParameter) return 'function getParameter() { [native code] }';
        return originalToString.call(this);
    };

    Object.defineProperty(Function.prototype, 'toString', { configurable: true, writable: true });
})();