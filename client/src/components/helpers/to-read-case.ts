const toReadCase = (camelCase: string): string => {
  const separateWords = camelCase.replaceAll(/[A-Z]/g, (upperLetter) => `${upperLetter.toLocaleLowerCase()}`);

  return separateWords[0].toUpperCase() + separateWords.slice(1);
};

export default toReadCase;
