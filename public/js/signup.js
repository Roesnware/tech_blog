// fun to handle posting info and signing up
const signupFormHandler = async (event) => {
    // prevent default
    event.preventDefault();
  
    // hooks
    const username = document.querySelector('#username-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
  
    // make sure values all fille dout 
    if (username && password) {
      // post to signup 
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      // successful post
      if (response.ok) {
        // redirect to homepage 
        document.location.replace('/');
      } else {
        alert(response.statusText);
      }
    }
  };

  // func to set page back to login
  const sendToLogIn = () => {

    document.location.replace('/login');
  }

  // event listneers
  document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);

  document
  .querySelector('.back-to-login-btn')
  .addEventListener('click', sendToLogIn);
