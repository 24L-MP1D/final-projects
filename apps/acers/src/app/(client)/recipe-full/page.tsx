'use client';
import { Bookmark, Calendar, Ellipsis, Heart, MessageSquare, Printer, SquarePen, TrendingUp, Upload } from 'lucide-react';
import { ScrollArea } from '../components/ui/scroll-area';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';

interface Recipe {
  _id: string;
  title: string;
  description: string;
  prepTime: string;
  servings: string;
  ingredients: string[];
  instructions: string[];
  nutritionFacts: string[];
  category: string;
  difficulty: string;
  availability: string;
  images: string[];
  video: string;
  tags: string[];
  visits: number;
  createdAt: Date;
  updatedAt: Date;
}

function RecipePage() {
  fetch('');
}

export default function Recipe() {
  return (
    <div className="w-[1110px] m-auto flex flex-col gap-6">
      <div className="flex justify-between">
        <div className="flex gap-4">
          <TrendingUp className="w-8 h-8" />
          85% would make this again
        </div>
        <div className="flex gap-6">
          <Upload />
          <Bookmark />
        </div>
      </div>
      <p className="font-bold text-6xl">Strawberry Cream Cheesecake</p>
      <div className="flex">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="bg-gray-300 w-[50px] h-[50px] rounded-full"></div>
            <p>UserName</p>
          </div>
          <div className="flex gap-2">
            <Calendar />
            Yesterday
          </div>
          <div className="flex gap-2">
            <MessageSquare />
            25
          </div>
        </div>
      </div>
      <div className="h-[1px] w-[1110px] bg-gray-200"></div>
      <p>Recipe description</p>
      <div className="bg-gray-300 w-[1110px] h-[624px] rounded">Video url</div>
      <div className="flex justify-between">
        <div>
          <div>
            <div className="flex">
              <div>
                <p>PREP TIME</p>
                <p>15 MIN</p>
              </div>
              <div>
                <p>SERVINGS</p>
                <div className="flex">
                  4 PEOPLE
                  <SquarePen />
                </div>
                <Printer />
              </div>
            </div>
            <div>
              <h3>Ingredients</h3>
              <p>For the crust</p>
              <ul>
                <li>400g graham crackers</li>
                <li>150g unsalted butters, melted</li>
              </ul>
              <p>For the cheesecake</p>
              <ul>
                <li>175g unsalted butter, melted</li>
                <li>175g unsalted butter, melted</li>
                <li>175g unsalted butter, melted</li>
                <li>175g unsalted butter, melted</li>
                <li>175g unsalted butter, melted</li>
                <li>175g unsalted butter, melted</li>
              </ul>
              <h4>Instrunctions</h4>
              <ul>
                <li>Instruction step 1</li>
                <li>Instruction step 2</li>
                <li>Instruction step 3</li>
                <li>Instruction step 4</li>
                <li>Instruction step 5</li>
                <li>Instruction step 6</li>
                <li>Instruction step 7</li>
                <li>Instruction step 8</li>
                <li>Instruction step 9</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="border-l pl-5">
          <div className="bg-slate-100 border border-1 rounded p-3">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Nutrition Facts</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">INV001</TableCell>
                  <TableCell>Paid</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">INV001</TableCell>
                  <TableCell>Paid</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          <div>
            <h4>Fresh Recipes</h4>
            <div>
              <div className="w-[130px] h-[100px]"></div>
              <div>
                <div>Rating</div>
                <p>Spinach and Cheese Pasta</p>
              </div>
            </div>
            <div>
              <div className="w-[130px] h-[100px]"></div>
              <div>
                <div>Rating</div>
                <p>Spinach and Cheese Pasta</p>
              </div>
            </div>
            <div>
              <div className="w-[130px] h-[100px]"></div>
              <div>
                <div>Rating</div>
                <p>Spinach and Cheese Pasta</p>
              </div>
            </div>
            <div>
              <div className="w-[130px] h-[100px]"></div>
              <div>
                <div>Rating</div>
                <p>Spinach and Cheese Pasta</p>
              </div>
            </div>
            <div>
              <div className="w-[130px] h-[100px]"></div>
              <div>
                <div>Rating</div>
                <p>Spinach and Cheese Pasta</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p>Already made this?</p>
      <button>Share your feedback</button>
      <div className="h-5 bg-orange-400"></div>
      <div>
        <p>Comments</p>
        (25)
      </div>
      <div>
        <div>
          <ScrollArea className="h-[400px] w-[1110px] rounded-md border border-none p-4">
            <Table>
              <TableCaption>A list of your recent invoices.</TableCaption>
              {/* <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Invoice</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader> */}
              <TableBody className="flex flex-col">
                <TableRow className="flex gap-5">
                  <TableCell>
                    <div className="w-10 h-10 rounded-full bg-gray-300"></div>
                  </TableCell>
                  <TableCell>
                    <p>firstName lastName</p>
                    <p>45 min ago</p>
                    <p>Comments</p>
                    <div className="flex items-center">
                      <Heart /> 48
                      <button className="flex items-center">
                        <Ellipsis />
                        <p>More</p>
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow className="flex gap-5">
                  <TableCell>
                    <div className="w-10 h-10 rounded-full bg-gray-300"></div>
                  </TableCell>
                  <TableCell>
                    <p>firstName lastName</p>
                    <p>45 min ago</p>
                    <p>Comments</p>
                    <div className="flex items-center">
                      <Heart /> 48
                      <button className="flex items-center">
                        <Ellipsis />
                        <p>More</p>
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow className="flex gap-5">
                  <TableCell>
                    <div className="w-10 h-10 rounded-full bg-gray-300"></div>
                  </TableCell>
                  <TableCell>
                    <p>firstName lastName</p>
                    <p>45 min ago</p>
                    <p>Comments</p>
                    <div className="flex items-center">
                      <Heart /> 48
                      <button className="flex items-center">
                        <Ellipsis />
                        <p>More</p>
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </ScrollArea>
          <div className="w-[300px] border border-1 m-auto rounded py-1">
            <div className="flex justify-center gap-3 items-center cursor-pointer">
              <p>Loading</p>
              <div role="status">
                <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-200 fill-orange-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <p>Write a comment</p>
        <div className="flex">
          <p className="text-orange-500">Login</p>
          <p>to post a commment</p>
        </div>
      </div>

      <div className="relative">
        <input className="h-[400px] w-full max-w-[1110px] bg-gray-200 rounded p-4" placeholder="Write your comment..." aria-label="Comment input" />
        <button className="bg-orange-500 hover:bg-orange-400 w-[200px] h-[50px] rounded mt-2 absolute right-0 bottom-0 z-10" aria-label="Post comment">
          Post Comment
        </button>
      </div>
      <p>You might also like</p>
    </div>
  );
}
