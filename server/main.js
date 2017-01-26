import {Rules} from '../imports/api/rules.js';
import {Picker} from 'meteor/meteorhacks:picker'
import bodyParser from 'body-parser';

Picker.middleware(bodyParser.urlencoded({ extended: false }));
Picker.middleware(bodyParser.json());

const postRoutes = Picker.filter((req, res) => {
  return req.method === 'POST';
});
postRoutes.route('/message', function(params, req, res, next) {
  let reply = [];
console.log(req.body);
  if (req.body.message.length > 0) {
    const messageElements = req.body.message.split(" ");
    if (req.body.message.substring(0, 5) === 'learn') {
      const message = req.body.message.substring(6).split(':');
      Rules.insert({
        text: message[0],
        response: message[1]
      });
    }

    const responses = Rules.find({text: req.body.message}).fetch();
    responses.forEach(function(response) {
      reply.push(response.response);
    })
  }
console.log(reply)
  if (reply.length > 0) {
    res.end(JSON.stringify(reply));
  }
  else {
    res.end();
  }
});
