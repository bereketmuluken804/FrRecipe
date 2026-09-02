const BASE_URL = "http://localhost:3001"

export async function loginUser(credentials) {
  const response = await fetch(`${BASE_URL}/users?email=${credentials.email}`)
  const users = await response.json();
  if(users[0]){
    const {id, name, email, password, favoriteRecipes, likedRecipes} = users[0]
    if(password === credentials.password){
      return {id, name, email, favoriteRecipes, likedRecipes}
    }else{
      throw new Error("Password incorrect")
    }
  }
  else {
    throw new Error("User not found please register")
  }
}

export async function registerUser(userData) {
  const res = await fetch(`${BASE_URL}/users?email=${userData.email}`)
  const users = await res.json();
  if(users[0]){
    throw new Error("Email already registered, please login")
  }
  else{
    const response = await fetch(`${BASE_URL}/users`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({name: userData.name, email: userData.email, password: userData.password, favoriteRecipes: [], likedRecipes: []})
    })
    const newUser = await response.json();
    return {id: newUser.id, name: newUser.name, email: newUser.email, favoriteRecipes: newUser.favoriteRecipes, likedRecipes: newUser.likedRecipes};
  }
  
}