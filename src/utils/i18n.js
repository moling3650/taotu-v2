import config from '@/config/i18n.json'

export function i18n (config) {
  const lang = navigator.language
  const defaultLang = config._default

  return function (key, language = lang) {
    const k = key.toLowerCase()

    // 检索适配标签
    const translations = config[k]

    // 如果适配配置中不存在则直接将输入的键值返回
    if (!translations) {
      return key
    }

    // 如果配置文件中存在对详细语言进行适配，则将适配内容返回
    if (translations[language]) {
      return translations[language]
    }

    // 配置文件中存在对语言的笼统分类进行适配，不然返回默认配置结果
    language = language.split('-')[0]
    return translations[language] || translations[defaultLang] || key
  }
}

export function detectLang () {
  return navigator.language.split('-')[0]
}

export default i18n(config)
