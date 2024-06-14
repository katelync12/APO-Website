
export const isAuthenticated = async () => {
  const token = localStorage.getItem('token');
  console.log("Token: ", token)
  if (!token) {
    console.log("Token empty")
    return false;
  }
  try {
      const response = await fetch('/api/test_token', {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `token ${token}`
              // Add any other headers you need, e.g., authentication headers
          },
          credentials: 'include' // This is important for including cookies in the request
      });

      if (response.ok) {
          console.log("response ok")
          const text = await response.text();
          console.log(text)
          return true;
      } else {
          console.log("response ok")
          return false;
      }
  } catch (error) {
      console.error('Error during authentication check:', error);
      return false;
  }
};