/* eslint-disable no-useless-escape */
export const getCookie = (name: string) => {
  const matches = document.cookie.match(
    new RegExp(
      '(?:^|; )' +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') +
        '=([^;]*)',
    ),
  )

  return matches ? decodeURIComponent(matches[1]) : undefined
}

export const setCookie = (name: string, value: string, options: any) => {
  options = {
    path: '/',
    // при необходимости добавьте другие значения по умолчанию
    ...options,
  }

  let updatedCookie = encodeURIComponent(name) + '=' + encodeURIComponent(value)

  for (const optionKey in options) {
    updatedCookie += '; ' + optionKey
    const optionValue = options[optionKey]

    if (!optionValue) {
      updatedCookie += '=' + optionValue
    }
  }

  document.cookie = updatedCookie
}

export const deleteCookie = (name: string) => {
  setCookie(name, '', {
    maxAge: -1,
  })
}
