export const checkUserPermission = async (permission) => {
  const token = localStorage.getItem('token');

  if (!token) {
      return false;
  }

  try {
      const response = await fetch(`/checkpermission?permission=${permission}`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `token ${token}`
          },
          credentials: 'include'
      });
      if (response.ok) {
          const text = await response.text();
          console.log(text)
          console.log("Permission: ", permission)
          return true;
      } else {
          return false;
      }
  } catch (error) {
      console.error('Error during permission check:', error);
      return false;
  }
};