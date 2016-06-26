const choo = require('choo');
const app = choo();

const makePeople = require('./people');

app.model({
  state: {round: 0},

  reducers: {
    reset: () => ({round: 0}),

    setremoved: ({id, value}, {round, people}) => ({
      round,
      people: people.map(person => person.id === id ?
          Object.assign({}, person, {removedInRound: value ? round : 0}) : person)
    }),

    round: ({round}, state) => Object.assign(state, {round}),

    start: (action, state) => ({
      round: 1,
      people: makePeople().map((person, id) => ({
        id: person.name,
        details: person,
        removedInRound: 0,
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

const visible = round => person => !person.removedInRound || person.removedInRound === round;
//const visiblePeopleList = people => people.filter();

const roundOverview = (params, state, send) => {
  // Ignore the params.round and use the version in state.
  console.log(params);
  console.log(state.people);

  var remaining = 0;
  state.people.forEach(person => {if (!person.removedInRound) remaining++});

  const round = state.round;
  const targetRemaining = ({1: 20, 2: 15, 3: 10})[round];

  const next = () => {
    //if (remaining !== targetRemaining) return;
    if (round < 3) send('round', {round: round + 1});
    else send('navigate', {location: '/outro'});
  };

  return choo.view`
    <div>
      <h1>Round ${round}</h1>
      <h2>${remaining} people remaining. Banish ${remaining - targetRemaining} to progress</h2>
      <ul>
        ${state.people.filter(visible(round)).map(person => choo.view`
          <li style=${person.removedInRound ? 'text-decoration: line-through' : ''}>
            <a href=detail/${person.id}>${person.id}</a>
          </li>
        `)}
      </ul>
      <button onclick=${next} disabled=${remaining !== targetRemaining,false}>${round < 3 ? 'Next round' : 'Submit your choices'}</button>
    </div>
  `;
};

const wrapDeref = (arr, idx) => arr[(idx + arr.length) % arr.length];

const roundDetails = (params, state, send) => {
  const person = state.people.filter(p => p.id === params.name)[0];
  if (!person) console.warn(`Could not find person with name ${params.name}`);
  if (!person || (person.removedInRound && person.removedInRound < state.round)) {
    send('navigate', {location: '/overview'});
    return choo.view`<div></div>`;
  }

  console.log(person);

  const onchange = (e) => {
    send('setremoved', {id: person.id, value: e.target.checked});
  }

  const peopleList = state.people.filter(visible(state.round));
  const myIdx = peopleList.indexOf(person);

  const checkbox = choo.view`<input type="checkbox" onchange=${onchange} checked=${!!person.removedInRound} />`;
  //if (person.removedInRound) checkbox.checked = true;

  return choo.view`<div>
    A person ${person.id}
    <div style="width: 200px; height: 200px; background-color: grey; border: 1px black;">Cool image</div>
    <div>
      ${person.details.stages
        .slice(0, state.round)
        .map(text => choo.view`<div>${text}</div>`)}
    </div>
    <label>${checkbox} Banish</label>
    <br>
    <a href=${wrapDeref(peopleList, myIdx-1).id}>Back</a>
    <a href='../overview'>Overview</a>
    <a href=${wrapDeref(peopleList, myIdx+1).id}>Next</a>
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
    route('/detail/:name', protect(roundDetails))
  ]),
  route('/outro', outro)
//  route('/blah', () => choo.view`<h1>blah</h1>`)
]);


const tree = app.start();
document.body.appendChild(tree);


window.app = app;

