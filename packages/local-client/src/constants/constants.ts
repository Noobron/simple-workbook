const NPM_CDN_URL: string = process.env.REACT_APP_NPM_CDN_URL!;

export const Constants = {
  BUNDLER: {
    MODULE_URL: `${NPM_CDN_URL}/{0}`,
    RELATIVE_MODULE_URL: `${NPM_CDN_URL}{0}/`,
    HTML_FILE_SERVER_URL: `http://${process.env.REACT_APP_FILE_SERVER_DOMAIN}:${process.env.REACT_APP_HTML_FILE_SERVER_PORT}/`,
  },

  EDITOR: {
    MAX_WIDTH_SCALE: 0.65,
    MIN_WIDTH_SCALE: 0.35,
    MAX_HEIGHT_SCALE: 0.98,
    MIN_VERTICAL_HEIGHT: 250,
  },
};
