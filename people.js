// Done as a JS file so its less strict about formatting.
// The names (left of the :) are ignored for now. They just have to be unique -
// we'll use them to match the people up in the backend.

const OCCUPATIONS = [
<<<<<<< HEAD
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
"Archeologist",
"Writer",
"Reporter",
"Real Estate Agent",
"Librarian",
"Firefighter",
"FBI Agent",
"Engineer",
"Geneticist",
"Historian",
"Dancer",
"Sewer",
"Zoologist",
"Welder",
"Surgeon",
"Painter",
"Politician",
"Logistics Manager",
"Jeweler",
"Instrument builder",
"Economist",
"Chemist",
"Astronomer",
"Pilot",
"Nuclear Technician",
"Midwife",
"Poet",
"Butcher",
"Janitor",
"Graphic Designer",
"Forester",
"Metalworker",
"Banker",
"Cartographer",
"Miner",
"Photographer",
"Nutritionist",
"Herbalist",
"Gunsmith",
"Fisherman",
"Train Conductor",
"Blacksmith",
"Bookbinder",
"Telecommunication technician",
"Sociologist",
=======
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
  "Archeologist",
  "Writer",
  "Reporter",
  "Real Estate Agent",
  "Librarian",
  "Firefighter",
  "FBI Agent",
  "Engineer",
  "Geneticist",
  "Historian",
  "Dancer",
  "Sewer",
  "Zoologist",
  "Welder",
  "Surgeon",
  "Painter",
  "Politician",
  "Logistics Manager",
  "Jeweler",
  "Instrument builder",
  "Economist",
  "Chemist",
  "Astronomer",
  "Pilot",
  "Nuclear Technician",
  "Midwife",
  "Poet",
  "Butcher",
  "Janitor",
  "Graphic Designer",
  "Forester",
  "Metalworker",
  "Banker",
  "Cartographer",
  "Miner",
  "Photographer",
  "Nutritionist",
  "Herbalist",
  "Gunsmith",
  "Fisherman",
  "Train Conductor",
  "Blacksmith",
  "Bookbinder",
  "Telecommunication technician",
  "Sociologist",
>>>>>>> origin/master
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
  m: ['Dave', 'Frank', 'George', 'Gregory', 'Harold', 'John', 'Joseph', 'Aaron', 'Kyle', 'Liam', 'Luke', 'Matt', 'Brenton', 'Mark', 'Sam'],
  f: ['Sandra', 'Sharron', 'Simone', 'Frances', 'Jess', 'Jasmine', 'Claire', 'Kate', 'Jennifer', 'Carol', 'Anika', 'Liz', 'Emma', 'Sophie', 'Olivia']
}

const checkUnique = list => {
  const set = new Set(list);
  if (set.size !== list.length) throw Error('List has duplicate items');
}

checkUnique(NAMES.m);
checkUnique(NAMES.f);
checkUnique(TRAITS.n);
checkUnique(OCCUPATIONS);

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

const zip = (gender, occupations, traits, names) => (
  occupations.map((occupation, i) => ({
    stages: [
      occupation,
      traits[i*2],
      traits[i*2 + 1]
    ],
    image: '',
    name: names[i],
    gender: gender
  }))
);

// Return 30 people - 15 males and 15 females.
module.exports = (n = 15) => {
  const occupations = nRandom(n * 2, OCCUPATIONS);
  const traits = nRandom(n * 4, TRAITS.n);
  const mnames = nRandom(n, NAMES.m);
  const fnames = nRandom(n, NAMES.f);

  return nRandom(n * 2,
      zip('m', occupations.slice(0, n), traits.slice(0, n*2), mnames)
      .concat(zip('f', occupations.slice(n), traits.slice(n*2), fnames)))
};
