// func to handle login 
const loginFormHandler = async (event) => {
    // prevent default 
    event.preventDefault();
  
    // Collect values from the login form
    const username = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
  
    // make sure values alll filled out  
    if (username && password) {
      // send a post 
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      // successful login
      if (response.ok) {
        // redirect the browser to the dashboard page
        document.location.replace('/dashboard');
      } else {
        alert(response.statusText);
      }
    }
  };

  // func to send to sign up page
  const sendToSignUp = () => {
    
    document.location.replace('/signup');
  };
  
  // event listeneers
  document
    .querySelector('.login-form')
    .addEventListener('submit', loginFormHandler); 
    
  document
  .querySelector('.signup-btn')
  .addEventListener('click', sendToSignUp);