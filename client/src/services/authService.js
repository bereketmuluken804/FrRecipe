const BASE_URL = "http://localhost:5000"

export async function loginUser(credentials) {
  const response = await fetch(`${BASE_URL}/users?email=${credentials.email}`)
  const users = await response.json();
  if(users[0]){
    const {id, name, email, password} = users[0]
    if(password === credentials.password){
      return {id, name, email}
    }else{
      throw new Error("Password incorrect")
    }
  }
  else {
    throw new Error("User not found please register")
  }
}

export function registerUser(userData) {
  
}