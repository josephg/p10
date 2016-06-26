// Done as a JS file so its less strict about formatting.
// The names (left of the :) are ignored for now. They just have to be unique -
// we'll use them to match the people up in the backend.

const OCCUPATIONS = [
  "Priest",
  "Dentist",
  "Accountant",
  "General Practitioner",
  "Lawyer",
  "Police Officer",
  "Biologist",
  "Astronaut",
  "Veterinarian",
  "Radio Moderator",
  "Construction Worker",
  "Psychologist",
  "Sales Manager",
  "Social Worker",
  "English Teacher",
  "Soldier",
  "Hair dresser",
  "Software developer",
  "Cook",
  "Farmer",
  "Athlete",
  "Musician",
  "Translator (12 languages)",
  "Physician",
  "Philosopher",
];

const TRAITS = {
  n: [
    "can't have children",
    "served in a war",
    "anarchist",
    "scared of heights",
    "bad temper",
    "believes in afterlife",
    "gay",
    "has won the nobel price",
    "novelist hobbyist",
    "convicted for drunk driving",
    "has climbed Mt Everest",
    "Scientologist",
    "speaks 3 languages",
    "amateur actor",
    "family has a history of cancer",
    "makeup artist",
    "Donates for animal welfare",
    "ran for senate",
    "has over $20.000 depts",
    "vegan",
    "transgender",
    "allergic to dust",
    "arachnophobia",
    "rape survivor",
    "registered sex offender",
    "suffers from PTSD",
    "has 7 siblings",
    "used to be addicted to cocaine",
    "is in a wheelchair",
    "allergic to milk",
    "finished basic nurse training",
    "feminist activist",
    "homophobic",
    "deep diver",
    "social anxiety",
    "beat their child once",
    "has 400.000 Twitter followers",
    "has run a company as CEO for over a decade",
    "bad sight",
    "alcoholic",
    "claustrophobic",
    "worked as prostitute during college",
    "can fly a plane",
    "oldtimer hobbyist",
    "trained electrician ",
    "adopted",
    "muslim",
    "hobby photographer",
    "asexual",
    "invented interior gardening technique",
    "basic survival training",
    "has made a successful video game",
    "had a stroke once",
    "sterilized",
    "colorblind",
    "has been convicted for animal cruelty",
    "has been divorced 4 times",
    "autistic",
    "dropped out of school in year 9",
    "catholic",
    "holds world record in memorizing most digits of Pi",
    "suffers from parkinsons",
    "suffers from depression",
    "has a foot fetish",
    "undiagnosed sexually transmitted disease",
    "has aboriginal ancestors",
    "unfinished degree in neuroscience ",
    "doesn't want children",
    "can't see blood",
    "Among the top 10 richest people alive",
  ],

  f: [
  ],

  m: [
  ]
};

const NAMES = {
  m: ['Dave', 'Frank', 'George', 'Gregory', 'Harold', 'John', 'Joseph', 'Aaron', 'Kyle', 'John', 'Luke', 'Matt', 'Brenton', 'Mark', 'Sam'],
  f: ['Sandra', 'Sharron', 'Simone', 'Frances', 'Jess', 'Jasmine', 'Claire', 'Kate', 'Jennifer', 'Carol', 'Anika', 'Liz', 'Emma', 'Sophie', 'Olivia']
}

// Returns a random number in the range [0,n)
const randInt = (n) => (Math.random() * n)|0;

// Choose (and return) N random items (without duplication) from arr.
const nRandom = (n, arr) => {
  if (n > arr.length) throw Error(`Cannot pull ${n} items from array`);
  arr = arr.slice();
  for (var i = 0; i < n; i++) {
    // swap i with a random item in the remaining deck.
    const k = i + randInt(arr.length - i);
    var temp = arr[i];
    arr[i] = arr[k];
    arr[k] = temp;
  }
  return arr.slice(0, n);
};

const someOfGender = (n, gender) => { // 'm' or 'f'.
  const occupations = nRandom(n, OCCUPATIONS);
  const traits = nRandom(n * 2, TRAITS.n.concat(TRAITS[gender]));
  const names = nRandom(n, NAMES[gender]);
  console.log(occupations, traits, names);
  // Zip.
  return occupations.map((occupation, i) => ({
    stages: [
      occupation,
      traits[i*2],
      traits[i*2 + 1]
    ],
    image: '',
    name: names[i],
    gender: gender
  }));
}

// Return 30 people - 15 males and 15 females.
module.exports = () =>
  nRandom(30, someOfGender(15, 'm').concat(someOfGender(15, 'f')));
