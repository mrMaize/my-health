const validateLatin = (text: string) => {
  return /^[a-z]/i.test(text.toLowerCase());
};

const validateCyrillic = (text: string) => {
  return /^[а-я]/i.test(text.toLowerCase());
};

const validateAge = (text: string) => {
  return Number(text) && Number(text) > 0;
};

export { validateLatin, validateCyrillic, validateAge };
