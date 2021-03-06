'use strict';

//list of bats
//useful for ALL 5 steps
//could be an array of objects that you fetched from api or database
const bars = [{
  'id': 'f944a3ff-591b-4d5b-9b67-c7e08cba9791',
  'name': 'freemousse-bar',
  'pricePerHour': 50,
  'pricePerPerson': 20
}, {
  'id': '165d65ec-5e3f-488e-b371-d56ee100aa58',
  'name': 'solera',
  'pricePerHour': 100,
  'pricePerPerson': 40
}, {
  'id': '6e06c9c0-4ab0-4d66-8325-c5fa60187cf8',
  'name': 'la-poudriere',
  'pricePerHour': 250,
  'pricePerPerson': 80
}];


//list of current booking events
//useful for ALL steps
//the time is hour
//The `price` is updated from step 1 and 2
//The `commission` is updated from step 3
//The `options` is useful from step 4
const events = [{
  'id': 'bba9500c-fd9e-453f-abf1-4cd8f52af377',
  'booker': 'esilv-bde',
  'barId': 'f944a3ff-591b-4d5b-9b67-c7e08cba9791',
  'time': 4,
  'persons': 8,
  'options': {
    'deductibleReduction': false
    },
    'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'privateaser': 0
  }
}, {
  'id': '65203b0a-a864-4dea-81e2-e389515752a8',
  'booker': 'societe-generale',
  'barId': '165d65ec-5e3f-488e-b371-d56ee100aa58',
  'time': 8,
  'persons': 30,
  'options': {
    'deductibleReduction': true
  },
        'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'privateaser': 0
  }
}, {
  'id': '94dab739-bd93-44c0-9be1-52dd07baa9f6',
  'booker': 'otacos',
  'barId': '6e06c9c0-4ab0-4d66-8325-c5fa60187cf8',
  'time': 5,
  'persons': 80,
  'options': {
    'deductibleReduction': true
  },
        'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'privateaser': 0
  }
}];

//list of actors for payment
//useful from step 5
const actors = [{
  'eventId': 'bba9500c-fd9e-453f-abf1-4cd8f52af377',
  'payment': [{
    'who': 'booker',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'bar',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'privateaser',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'eventId': '65203b0a-a864-4dea-81e2-e389515752a8',
  'payment': [{
    'who': 'booker',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'bar',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'privateaser',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'eventId': '94dab739-bd93-44c0-9be1-52dd07baa9f6',
  'payment': [{
    'who': 'booker',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'bar',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'privateaser',
    'type': 'credit',
    'amount': 0
  }]
}];


function SetPrice() {
    for (var j = 0; j < events.length; j++) {
        for (var i = 0; i < bars.length; i++) {
            if (bars[i].id == events[j].barId) {
                if (events[j].persons > 60) {
                    events[j].price = bars[i].pricePerHour * events[j].time + bars[i].pricePerPerson * events[j].persons * 0.5;
                }
                else if (events[j].persons > 20) {
                    events[j].price = bars[i].pricePerHour * events[j].time + bars[i].pricePerPerson * events[j].persons * 0.7;
                }
                else if (events[j].persons > 10) {
                    events[j].price = bars[i].pricePerHour * events[j].time + bars[i].pricePerPerson * events[j].persons * 0.9;
                }
                else {
                    events[j].price = bars[i].pricePerHour * events[j].time + bars[i].pricePerPerson * events[j].persons;
                }
                if (events[j].options.deductibleReduction == true) {
                    events[j].price += events[j].persons;
                }
            }
        }
    }
}

function SetCommission() {
    for (var j = 0; j < events.length; j++) {
        events[j].commission.insurance = events[j].price * 0.15;
        events[j].commission.treasury = events[j].persons;
        if (events[j].options.deductibleReduction == true) {
            events[j].commission.privateaser = events[j].commission.insurance;
        }
        else {
            events[j].commission.privateaser = events[j].commission.insurance - events[j].commission.treasury;
        }
    }
}

function SetPayment() {
    for (var i = 0; i < actors.length; i++) {
        for (var j = 0; j < events.length; j++) {
            if (actors[i].eventId == events[j].id) {
                actors[i].payment[0].amount = events[j].price;
                if (events[j].options.deductibleReduction == true) {
                    actors[i].payment[1].amount = events[j].price * 0.7 - events[j].persons;
                }
                else {
                    actors[i].payment[1].amount = events[j].price * 0.7;
                }
                actors[i].payment[2].amount = events[j].commission.insurance;
                actors[i].payment[3].amount = events[j].commission.treasury;
                actors[i].payment[4].amount = events[j].commission.privateaser;
            }
        }
    }
}


/*function getBar(id){
    return bars.find(bar => bar.id === id)
}
*/

SetPrice();
SetCommission();
SetPayment();
//console.log(bars);
console.log(events);
console.log(actors);
