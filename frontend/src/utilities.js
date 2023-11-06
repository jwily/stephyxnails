export const shapeValToLabel = {
  'xs-square': 'Extra-Short Square',
  's-square': 'Short Square',
  'm-square': 'Medium Square',
  's-coffin': 'Short Coffin',
  'm-coffin': 'Medium Coffin',
  's-round': 'Short Round',
  'm-round': 'Medium Round',
  's-almond': 'Short Almond',
  'm-almond': 'Medium Almond',
  'm-stilleto': 'Medium Stiletto',
}

export const tierLabel = (id, tierData) => {

  if (!tierData) {
    return '';
  }

  let choice;
  for (let tier of tierData) {
    if (tier.id === id) {
      choice = tier
    }
  }
  return `${choice.name} $${choice.price}`;
}

export const prepareState = (state, recaptchaValue) => {
  const newState = {};
  newState.name = state.name;
  newState.email = state.email;
  newState.instagram = state.instagram;
  newState.sets = [];
  // newState.recaptcha = recaptchaValue;

  const imageSets = [];

  for (let index in state.sets) {
    const set = state.sets[index];

    const newSet = {};
    newSet.description = set.description;
    newSet.charms = set.extra ? parseInt(set.extra) : 0;
    newSet.characters = set.extra2 ? parseInt(set.extra2) : 0;
    newSet.left_sizes = set.leftDisplay.join(", ");
    newSet.right_sizes = set.rightDisplay.join(", ");
    newSet.shape = set.shape;
    newSet.tier = set.tier;
    newSet.images = [];

    newState.sets.push(newSet);

    imageSets[index] = [];

    for (let photo of set.photos) {
      imageSets[index].push(photo);
    }
  }

  const formData = new FormData();

  formData.append("json", new Blob([JSON.stringify(newState)], { type: "application/json" }));

  for (let index in imageSets) {
    const images = imageSets[index];
    for (let photo of images) {
      formData.append(`files_set_${index}`, photo);
    }
  }

  return formData;
};
