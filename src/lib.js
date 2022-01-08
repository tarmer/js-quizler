import fs from "fs";

//chooseRandom: (array,number) -> [newArray]
export const chooseRandom = (array = [], numItems) => {
  // TODO implement chooseRandom
  if (array.length === 0 || array.length === 1) {
    return array;
  }
  if (!(numItems > 1 && numItems <= array.length)) {
    numItems = Math.floor(Math.random() * (array.length + 1));
  } else if (numItems > 1 && numItems < array.length) {
    array.length = numItems;
    return array;
  }
  return array;
};

export const createPrompt = ({ numQuestions = 1, numChoices = 2 } = {}) => {
  let prompts = [];
  let getType;
  let getName;
  let getMessage;

  for (let index = 1; index <= numQuestions; index++) {
    getType = "input";
    getName = `question-${index}`;
    getMessage = `Enter question ${index}`;

    prompts.push({
      type: getType,
      name: getName,
      message: getMessage,
    });
    for (let cIndex = 1, i = 0; cIndex <= numChoices; cIndex++, i++) {
      getType = "input";
      getName = `question-${index}-choice-${cIndex}`;
      getMessage = `Enter answer choice ${cIndex} for question ${index}`;

      prompts.push({ type: getType, name: getName, message: getMessage });
    }
  }

  return prompts;
};

export const createQuestions = (myObject = {}) => {
  // TODO implement createQuestions
  let questions = { ...myObject };
  let result = [];

  let temp;
  let getName;
  let getMessage;
  let getChoices = [];

  for (const key in questions) {
    if (!key.includes("choice") || !key.includes(temp)) {
      temp = key;
      getName = key;
      getMessage = questions[key];
    }
    if (key.includes("choice") && key.includes(temp)) {
      getChoices.push(questions[key]);
    }

    let keys = Object.keys(questions);
    let nextIndex = keys.indexOf(key) + 1;
    let nextItem = keys[nextIndex];

    if (nextItem === undefined || !nextItem.includes(temp)) {
      result.push({
        type: "list",
        name: getName,
        message: getMessage,
        choices: getChoices,
      });
      getChoices = [];
    }
  }
  return result;
};

export const readFile = (path) =>
  new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => (err ? reject(err) : resolve(data)));
  });

export const writeFile = (path, data) =>
  new Promise((resolve, reject) => {
    fs.writeFile(path, data, (err) =>
      err ? reject(err) : resolve("File saved successfully")
    );
  });
