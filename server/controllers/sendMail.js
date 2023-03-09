import axios from 'axios'

export const sendMail = (receiver,msg)=>{

  const options = {
    method: 'POST',
    url: 'https://rapidprod-sendgrid-v1.p.rapidapi.com/mail/send',
    headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Key': '8c82a479e9msh125119819a49830p1e33dcjsnf8ba7b7e897c',
      'X-RapidAPI-Host': 'rapidprod-sendgrid-v1.p.rapidapi.com'
    },
    data: `{"personalizations":[{"to":[{"email":"${receiver}"}],"subject":"e-Commerce OTP Verification"}],"from":{"email":"ly277423@gmail.com"},"content":[{"type":"text/plain","value":" Verification code for changing Password id : ${msg}"}]}`
  };

  axios.request(options).then(function (response) {
    console.log(response.data);
  }).catch(function (error) {
    console.error(error);
  });
}