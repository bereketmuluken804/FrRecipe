import {useParams } from 'react-router-dom';

function RecipeDetailsPage() {
   const { id } = useParams()
   return <h1>Recipe Details for: { id } </h1>
}

export default RecipeDetailsPage;