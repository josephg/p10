const choo = require('choo');
const app = choo();

const peopleMap = require('./people');

const objMap = (obj, fn) => {
  const result = {};
  for (var k in obj) {
    result[k] = fn(obj[k], k);
  }
  return result;
};

const objFilter = (obj, fn) => {
  const result = {};
  for (var k in obj) {
    if (fn(obj[k], k)) result[k] = obj[k];
  }
  return result;
};

const objAsSortedList = (obj, key) => Object.keys(obj)
  .map(k => obj[k])
  .sort((a, b) => a[key] < b[key] ? -1 : 1);

//const people = Object.keys(peopleMap).sort()
//  .map(name => Object.assign(peopleMap[name], {name}));

//console.log(peopleList);


app.model({
  state: {round: 0},

  reducers: {
    reset: () => ({round: 0}),

    setremoved: ({id, value}, {round, people}) => ({
      round,
      people: objMap(people, (person, _id) => id === _id ?
          Object.assign({}, person, {removedInRound: value ? round : 0}) : person)
    }),

    round: ({round}, state) => Object.assign(state, {round}),

    start: (action, state) => ({
      round: 1,
      people: objMap(peopleMap, (person, id) => ({
        id: id,
        details: person,
        removedInRound: 0,
        sortOrder: Math.random()
      }))
    })
  },

  effects: {
    reset: (action, state, send) => {
      console.warn('Resetting game');
      send('navigate', {location: '/'});
    },

    start: (action, state, send) => {
      send('navigate', {location: '/intro'});
    },

    navigate: (action, state, send) => {
      console.log('navigate', action);
      send('app:location', {location: action.location});
      window.history.pushState({}, null, action.location);
    },
    'app:location': (action, state, send) => {
      console.log('app:location', action);
    }
  }
});



const start = send => () => {
  console.log('start');
  send('start');
};

const mainMenu = (params, state, send) => choo.view`
  <div>
    <h1>Hi!</h1>
    <button onclick=${start(send)}>Start game</button>
  </div>
`;

const intro = (params, state, send) => choo.view`
  <div>
    Intro text. Ooooh apocolypses are serious business. Jenny write me!
    <a href=/round/1/overview>Choose your crew</a>
  </div>
`;

const roundOverview = (params, state, send) => {
  // Ignore the params.round and use the version in state.
  console.log(params);
  console.log(state.people);

  const round = state.round;
  const next = () => {
    if (round < 3) send('round', {round: round + 1});
    else send('navigate', {location: '/outro'});
  };

  return choo.view`
    <div>
      <h1>Round ${round}</h1>
      <ul>
        ${objAsSortedList(state.people, 'sortOrder')
        .filter(person => !person.removedInRound || person.removedInRound === round)
        .map(person => choo.view`
          <li><a href=detail/${person.id}>${person.id}</a></li>
        `)}
      </ul>
      <button onclick=${next}>${round < 3 ? 'Next round' : 'Submit your choices'}</button>
    </div>
  `;
};

const roundDetails = (params, state, send) => {
  const person = state.people[params.person];
  if (person.removedInRound && person.removedInRound < state.round) {
    send('navigate', {location: '/overview'});
    return choo.view`<div></div>`;
  }

  //console.log(person);

  const onchange = (e) => {
    send('setremoved', {id: person.id, value: e.target.checked});
  }

  const checkbox = choo.view`<input type="checkbox" onchange=${onchange} />`;
  if (person.removedInRound) checkbox.checked = true;

  return choo.view`<div>
    A person ${person.id}
    <div style="width: 200px; height: 200px; background-color: grey; border: 1px black;">Cool image</div>
    <label>${checkbox} Remove</label>
    <br>
    <a href='../overview'>Back</a>
  </div>`;
};

const protect = content => (params, state, send) => {
  if (state.round === 0) {
    send('reset');
    return choo.view`<div></div>`;
  }

  return content(params, state, send);
};

const outro = (params, state, send) => choo.view`
<div>
  <h1>Outro!</h1>
  <a href=/>Back to main</a>
</div>`

window.router = app.router(route => [
  route('/', mainMenu),
  route('/intro', intro),
  route('/round/:roundnum', [
    route('/overview', protect(roundOverview)),
    route('/detail/:person', protect(roundDetails))
  ]),
  route('/outro', outro)
//  route('/blah', () => choo.view`<h1>blah</h1>`)
]);


const tree = app.start();
document.body.appendChild(tree);


window.app = app;

