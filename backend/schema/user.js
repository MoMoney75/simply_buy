const Ajv = require('ajv')
const addFormats = require('ajv-formats');
const AjvErrors = require('ajv-errors');

const registerInstance = new Ajv ({allErrors : true})

addFormats(registerInstance);
AjvErrors(registerInstance);


const userSchema = 
{
    "$schema" : "http://json-schema.org/draft-07/schema#",
    "title": "User",
    "type": "object",
    "properties": {
      "user_id": {
        "type": "integer",
        "minimum": 1
      },
      "first_name": {
        "type": "string",
        "minLength": 1,
        "maxLength": 100,
        "errorMessage": "First name must be between 1 and 100 characters"
      },
      "last_name": {
        "type": "string",
        "minLength": 1,
        "maxLength": 100,
        "errorMessage": "Last name must be between 1 and 100 characters"
      },
      "username": {
        "type": "string",
        "minLength": 1,
        "maxLength": 50,
        "errorMessage": "Username must be between 1 and 50 characters"
      },
      "password": {
        "type": "string",
        "minLength": 6,
        "errorMessage": "Password must be atleast 6 characters long"
      }
    },
    "required": ["first_name", "last_name", "username", "password"]
  };

  const validate = registerInstance.compile(userSchema)

  const userExample = {
    first_name : "Brandon",
    last_name : "Jacobs",
    username : "CowboysSuck1234",
    password : "goGiants1234"
  }

  const isValid = validate(userExample);

  if(!isValid){
    console.log("This errror is being thrown in /schema/users", validate.errors)
  };

  module.exports = validate;
  
