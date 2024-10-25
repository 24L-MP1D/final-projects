'use client';
import { Bookmark, Calendar, MessageSquare, Printer, SquarePen, TrendingUp, Upload } from 'lucide-react';

export default function Recipe() {
  return (
    <div>
      <div>
        <div>
          <TrendingUp />
          85% would make this again
        </div>
        <div>
          <Upload />
          <Bookmark />
        </div>
      </div>
      <p>Strawberry Cream Cheesecake</p>
      <div>
        <div className="bg-gray-300 w-[50px] h-[50px] rounded-full">
          <div />
          <div>
            <Calendar />
            Yesterday
          </div>
          <div>
            <MessageSquare />
            25
          </div>
          <div className="h-1 bg-gray-300"></div>
        </div>
      </div>
      <p>Recipe description</p>
      <div className="bg-gray-300 w-[77.08%] h-[624px] rounded">Video url</div>
      <div className="flex">
        <div>
          <div>
            <div>
              <p>PREP TIME</p>
              <p>15 MIN</p>
            </div>
            <div>
              <p>SERVINGS</p>
              <div>
                4 PEOPLE
                <SquarePen />
              </div>
              <Printer />
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
        <div>
          <div></div>
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
      
    </div>
  );
}
