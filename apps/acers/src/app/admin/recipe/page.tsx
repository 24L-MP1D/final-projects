'use client';
import axios from 'axios';
import { ChangeEvent, useEffect, useState } from 'react';

import { FilePenLine, Plus, X } from 'lucide-react';
import { ObjectId } from 'mongodb';
import Link from 'next/link';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../../(client)/components/ui/Table';
import { DashboardAside } from '../components/DashboardAside';
import { Input } from '../components/ui/Input';

export default function Home() {
  interface Recipe {
    _id: string;
    title: string;
    description: string;
    imagesFile: File[];
    prepTime: string;
    servings: number;
    videoFile: File | null;
    ingredients: { name: string }[]; // Update ingredient structure to use an object
    instructions: { step: string }[];
    nutritionFacts: { name: string; value: string }[];
    category: ObjectId;
    difficulty: number;
    availability: ObjectId | null;
    images: string[];
    video: string;
    tags: ObjectId[];
  }

  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchValue, setSearchValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 15;

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.post('/api/recipe/adminFunctions/searchRecipe', { search: searchValue });
        console.log('Response data:', response.data);
        // Debugging line
        setRecipes(response.data);
        setLoading(false);
      } catch (error: any) {
        console.error('Error fetching recipes:', error);
        setError(error.message);
      }
    };
    fetchRecipes();
  }, [searchValue, currentPage]);

  const searchFilt = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    setCurrentPage(1); // Reset to the first page on search
  };

  const handleDeleteRecipe = async (recipeId: string) => {
    const confirmDelete = window.confirm('Энэ хоолны жорыг устгах уу?');
    if (!confirmDelete) {
      return;
    }
    try {
      const response = await fetch(`/api/recipe/adminFunctions/deleteRecipe`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ _id: recipeId }), // backend der
      });

      if (!response.ok) {
        window.alert('Recipe deleted successfully');
        throw new Error('Failed to delete recipe');
      }

      // Remove the recipe from local state
      setRecipes(recipes.filter((recipe) => recipe._id !== recipeId));
    } catch (e: any) {
      setError(e.message);
    }
  };

  const updateRecipe = async (recipeId: any, updatedFields: any) => {
    try {
      const response = await axios.put(`/api/recipes/${recipeId}`, {
        _id: recipeId,
        updatedFields,
      });

      console.log('Recipe updated successfully:', response.data);
      // Optionally, handle success (e.g., show a success message, refresh the recipe list, etc.)
    } catch (error: any) {
      if (error.response) {
        // The request was made, and the server responded with a status code
        console.error('Error updating recipe:', error.response.data);
        alert(`Error: ${error.response.data}`);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received:', error.request);
        alert('No response from server, please try again later.');
      } else {
        // Something happened in setting up the request
        console.error('Error:', error.message);
        alert('An error occurred, please try again.');
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Pagination logic
  const totalPages = Math.ceil(recipes.length / recipesPerPage);
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="flex">
      <DashboardAside />
      <div className="bg-slate-100 rounded-xl mx-auto  mt-2 p-5 ">
        <div className="text-center font-bold">Хоолны жор хянах хэсэг</div>
        <div className="flex justify-between">
          <div className="">
            <Input value={searchValue} onChange={searchFilt} placeholder="жор хайх" type="text" className="w-100 ml-5 bg-blue-200 rounded-lg hover:bg-blue-300  " />
          </div>
          <Link className="bg-blue-200 hover:bg-blue-300 h-9 w-[210px] rounded-lg text-center p-1 flex justify-evenly text-slate-600" href="/admin/products/create">
            <Plus />
            <p>Хоолны жор нэмэх</p>
          </Link>
        </div>

        <Table className="border-[1px] border-[#d1d5db] ml-5 mt-5 w-[800px] rounded-xl bg-white">
          <TableCaption>Хоолны жорны жагсаалт</TableCaption>
          <TableHeader>
            <TableRow className="justify-between">
              <TableHead>#</TableHead>
              <TableHead>Хоолны нэр</TableHead>
              <TableHead>Хугацаа</TableHead>
              <TableHead>Порц</TableHead>
              <TableHead>Орц</TableHead>
              <TableHead>Заавар</TableHead>
              <TableHead>Шим тэжээлийн мэдээлэл</TableHead>
              {/* <TableHead>Category</TableHead>
              <TableHead>Үзсэн тоо </TableHead>
              <TableHead>Created At </TableHead>
              <TableHead>Updated At</TableHead> */}
              <TableHead>edit</TableHead>
              <TableHead>delete</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentRecipes.map((recipe, index) => (
              <TableRow className="justify-between" key={recipe._id}>
                <TableCell className="font-medium">{(currentPage - 1) * recipesPerPage + index + 1}</TableCell>
                <TableCell className="font-medium">{recipe.title}</TableCell>
                <TableCell>{recipe.prepTime}</TableCell>
                <TableCell>{recipe.servings}</TableCell>
                <TableCell>
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient.name}</li>
                  ))}
                </TableCell>
                <TableCell>
                  {recipe.instructions.map((instruction, index) => (
                    <li key={index}>{instruction.step}</li>
                  ))}
                </TableCell>
                <TableCell>
                  {recipe.nutritionFacts.map((nutritionFact, index) => (
                    <li key={index}>{nutritionFact.name}</li>
                  ))}
                </TableCell>

                {/* <TableCell>{recipe.visits}</TableCell>
                <TableCell>{dayjs(recipe.createdAt).format('YYYY-MM-DD')}</TableCell>
                <TableCell>{dayjs(recipe.updatedAt).format('YYYY-MM-DD')}</TableCell> */}
                {/* {isAdmin && (
                  <TableCell>
                    <select value={user.role} onChange={(e) => handleRoleChange(user._id, e.target.value as Role)}>
                      <option value={Role.GOLD}>Gold</option>
                      <option value={Role.SILVER}>Silver</option>
                      <option value={Role.BRONZE}>Bronze</option>
                      <option value={Role.FREE}>Free</option>
                    </select>
                  </TableCell>
                )} */}
                <TableCell>
                  <button onClick={() => updateRecipe(recipe._id, undefined)} className=" hover:text-red-700">
                    <FilePenLine />
                  </button>
                </TableCell>
                <TableCell>
                  <button onClick={() => handleDeleteRecipe(recipe._id)} className=" hover:text-red-700">
                    <X />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex justify-center mt-4 gap-4">
          <button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>
            Өмнөх хуудас
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button key={index + 1} className={currentPage === index + 1 ? 'font-bold' : ''} onClick={() => handlePageChange(index + 1)}>
              {index + 1}
            </button>
          ))}
          <button disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>
            Дараагийн хуудас
          </button>
        </div>
      </div>
    </div>
  );
}
