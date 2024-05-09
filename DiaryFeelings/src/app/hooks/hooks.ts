export const randomStrings = () => {
  const char = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''

  for (let i = 0; i < 16; i++) {
    const randomIndex = Math.floor(Math.random() * char.length)
    result += char.charAt(randomIndex)
  }
  return result
}
