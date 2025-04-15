export const validPassword = (password) => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
  if(!regex.test(password)){
    return `Password must contain at least 6 characters, uppercase and lowercase letters.`
  }
}