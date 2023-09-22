import { forOwn, replace } from 'lodash';

export default function createTranslator(translations) {
  const messages = {};
  translations.forEach((translation) => {
    messages[translation.key] = translation.value;
  });

  function t(key, params = {}) {
    if (messages[key]) {
      let translation = messages[key];
      forOwn(params, function (value, key) {
        translation = replace(translation, key, value);
      });
    } else {
      return key;
    }
    return messages[key] || key;
  }

  return {
    t
  };
}