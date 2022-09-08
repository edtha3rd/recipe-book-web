import MDEditor from "@uiw/react-md-editor";
import axios from "axios";
import React, { FormEvent, useContext, useEffect, useState } from "react";
import { UserContext } from "../components/UserContext";

interface RecipeData {
  name: string;
  ingredients: string;
  directions: string;
  category: string;
  image: File | null;
}

const NewRecipe: React.FunctionComponent = () => {
  const [recipeValues, setRecipeValues] = useState<RecipeData>({
    name: "",
    category: "",
    ingredients: "",
    directions: "",
    image: null,
  });
  const user = useContext(UserContext);
  useEffect(() => {
    document.title = "Recipes - New";
  });
  //handle text input
  const handleTextInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    // event.preventDefault();
    setRecipeValues((prevRecipeValues) => ({
      ...prevRecipeValues,
      [event.target.name]: event.target.value || "",
    }));
  };
  const handleMDInput = (content: string) => {
    // event.preventDefault();
    setRecipeValues((prevRecipeValues) => ({
      ...prevRecipeValues,
      directions: content || "",
    }));
  };
  //handle file input
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setRecipeValues((prevRecipeValues) => ({
      ...prevRecipeValues,
      image: event.target.files ? event.target.files[0] : null,
    }));
  };
  // submission
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    console.log(recipeValues);
    const formData = new FormData();
    formData.append("name", recipeValues.name);
    // recipeValues.ingredients.forEach((element) => {
    formData.append("ingredients", recipeValues.ingredients);
    // });
    formData.append("category", recipeValues.category);
    formData.append("directions", recipeValues.directions);
    recipeValues.image && formData.append("image", recipeValues.image);
    const response = await axios.post(
      `${process.env.REACT_APP_API_URI}/postrecipe`,
      formData,
      { withCredentials: true }
    );
    return response.data;
  };
  return (
    <div className="min-h-screen flex justify-center">
      <div className="flex flex-col items-center justify-center h-2/3">
        <h2 className="text-2xl mb-4">You will enter a new recipe here</h2>
        <form
          onSubmit={(event) => handleSubmit(event)}
          encType="multipart/form-data"
          className="flex flex-col items-center md:items-start md:p-4"
        >
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label
                htmlFor="name"
                className="m-2 block font-bold md:text-right mb-1 md:mb-0 pr-4"
              >
                Name
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                type="text"
                name="name"
                placeholder="Jonathan Donaldson"
                value={recipeValues.name}
                className="border-black border-2 rounded-xl ml-2 p-1"
                onChange={(event) => handleTextInput(event)}
              />
            </div>
          </div>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label
                htmlFor="ingredients"
                className="m-2 block font-bold md:text-right mb-1 md:mb-0 pr-4"
              >
                Ingredients
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                type="text"
                name="ingredients"
                placeholder="Ingredients"
                value={recipeValues.ingredients}
                className="border-black border-2 rounded-xl ml-2 p-1"
                onChange={(event) => handleTextInput(event)}
              />
            </div>
          </div>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label
                htmlFor="category"
                className="m-2 block font-bold md:text-right mb-1 md:mb-0 pr-4"
              >
                Category
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                type="text"
                name="category"
                placeholder="Category"
                value={recipeValues.category}
                className="border-black border-2 rounded-xl p-1 ml-2"
                onChange={(event) => handleTextInput(event)}
              />
            </div>
          </div>
          <div>
            <div>
              <label
                htmlFor="directions"
                className="mb-2 tracking-wide block font-bold md:mb-0 pr-4"
              >
                Directions
              </label>
            </div>
            <div>
              <MDEditor
                value={recipeValues.directions}
                onChange={(value = "") => handleMDInput(value)}
                className="md:p-2"
                height={300}
              />
              {/* <MDEditor.Markdown
                source={recipeValues.directions}
                style={{ whiteSpace: "pre-wrap" }}
              /> */}
              {/* <input
                // type="text"

                id="directions"
                name="directions"
                value={recipeValues.directions}
                className="border-black border-2 rounded-md ml-2 h-24 w-[600px]"
                onChange={(event) => handleTextInput(event)}
              /> */}
            </div>
          </div>
          <input
            className="p-2"
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
          />
          <input
            className="border-black border-2 p-2 rounded-xl"
            type="submit"
          />
        </form>
      </div>
    </div>
  );
};

export default NewRecipe;
