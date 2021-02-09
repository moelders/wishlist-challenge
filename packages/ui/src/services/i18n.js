import i18next from 'i18next';

export function initI18n({
  language: { lng, messages },
  fallbackLanguage: { lng: fallbackLng = 'dev', messages: defaultMessages = {} } = {},
  namespace = 'translation'
}) {
  const i18n = i18next.createInstance();

  i18n.init({
    resources: {
      [lng]: {
        [namespace]: messages
      },
      [fallbackLng]: {
        [namespace]: defaultMessages
      }
    },
    lng,
    fallbackLng,
    ns: namespace,
    defaultNS: namespace,
    interpolation: {
      format(value, format) {
        return format === 'uppercase'
          ? value.toUpperCase()
          : format === 'lowercase'
            ? value.toLowerCase()
            : format === 'capitalize'
              ? `${ value.slice(0, 1).toUpperCase() }${ value.slice(1) }`
              : value;
      }
    }
  });

  return {
    i18n,
    t: i18n.t.bind(i18n)
  };
}
