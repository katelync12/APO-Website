export const isUserInitialized = async () => {
    const token = localStorage.getItem('token');
    console.log("Token: ", token)
    
    try {
        const response = await fetch('/api/test_user_initialized', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `token ${token}`
            },
            credentials: 'include'
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
        console.error('Error during user initialized check:', error);
        return false;
    }
  };