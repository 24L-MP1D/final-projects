import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from './ui/navigation-menu';

export default function HeaderNavigationMenu() {
  return (
    <div>
      <NavigationMenu>
        {/* First NavigationMenu List */}
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Want to Cook</NavigationMenuTrigger>
            <NavigationMenuContent className="z-10 bg-white p-6">
              <NavigationMenuLink>
                <div className="flex gap-x-20 py-8 px-[60px]">
                  <ul className="flex flex-col gap-y-4 w-[210px]">
                    <p className="font-bold">STAFF PICKS</p>
                    <li>Potluck Desserts</li>
                    <li>Chicken Breast Recipe</li>
                    <li>Fall Baking</li>
                    <li>Sheet-Pan Vegetarian Recipes</li>
                    <li>Easy Side Dishes</li>
                  </ul>
                  <ul className="flex flex-col gap-y-4 w-[210px]">
                    <p className="font-bold">NEWS OUR NEWSLETTER</p>
                    <li>The Cooking Newsletter</li>
                    <li>Five Weeknight Dishes</li>
                    <li>The Veggie</li>
                  </ul>
                  <ul className="flex flex-col gap-y-4 w-[150px]">
                    <p className="font-bold">PERFECT FOR</p>
                    <li>One-Pot Dinners</li>
                    <li>Weeknight Chicken</li>
                    <li>Quick Pastas</li>
                    <li>30 Minute Vegetarian</li>
                    <li>Easy Baking</li>
                  </ul>
                </div>
              </NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>

        {/* Second NavigationMenu List */}
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Recipes</NavigationMenuTrigger>
            <NavigationMenuContent className="z-10 bg-white p-6">
              <NavigationMenuLink>
                <div className="flex gap-x-20 py-8 px-[60px]">
                  <ul className="flex flex-col gap-y-4 w-[170px]">
                    <p className="font-bold">EVERYDAY RECIPES</p>
                    <li>Easy</li>
                    <li>Healthy</li>
                    <li>Weeknight</li>
                    <li>Sheet-Pan Vegetarian Recipes</li>
                    <li>Easy Side Dishes</li>
                  </ul>
                  <ul className="flex flex-col gap-y-4 w-[80px]">
                    <p className="font-bold">BY MEAL</p>
                    <li>The Cooking Newsletter</li>
                    <li>Five Weeknight Dishes</li>
                    <li>The Veggie</li>
                  </ul>
                  <ul className="flex flex-col gap-y-4 w-[80px]">
                    <p className="font-bold">BY DIET</p>
                    <li>One-Pot Dinners</li>
                    <li>Weeknight Chicken</li>
                    <li>Quick Pastas</li>
                    <li>30 Minute Vegetarian</li>
                    <li>Easy Baking</li>
                  </ul>
                  <ul className="flex flex-col gap-y-4 w-[100px]">
                    <p className="font-bold">BY METHOD</p>
                    <li>One-Pot Dinners</li>
                    <li>Weeknight Chicken</li>
                    <li>Quick Pastas</li>
                    <li>30 Minute Vegetarian</li>
                    <li>Easy Baking</li>
                  </ul>
                </div>
              </NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>

        {/* Third NavigationMenu List */}
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Ingredients</NavigationMenuTrigger>
            <NavigationMenuContent className="z-10 bg-white p-6">
              <NavigationMenuLink>
                <div className="flex gap-x-20 py-8 px-[60px]">
                  <ul className="flex flex-col gap-y-4 w-[142px]">
                    <p className="font-bold">MEAT & SEAFOOD</p>
                    <li>Chicken</li>
                    <li>Beef</li>
                    <li>Pork</li>
                    <li>Salmon</li>
                    <li>Shrimp</li>
                  </ul>
                  <ul className="flex flex-col gap-y-4 w-[184px]">
                    <p className="font-bold">VEGETABLE & FRUITS</p>
                    <li>Zucchini</li>
                    <li>Sweet Potato</li>
                    <li>Eggplant</li>
                    <li>Cabbage</li>
                    <li>Asparagus</li>
                    <li>Tomato</li>
                  </ul>
                  <ul className="flex flex-col gap-y-4 w-[200px]">
                    <p className="font-bold">PLANT-BASED PROTEINS</p>
                    <li>Tofu</li>
                    <li>Lentil</li>
                    <li>Chickpea</li>
                    <li>Beans</li>
                  </ul>
                  <ul className="flex flex-col gap-y-4 w-[170px]">
                    <p className="font-bold">RICE, GRAINS, PASTA</p>
                    <li>Pasta</li>
                    <li>Noodles</li>
                    <li>Rice</li>
                    <li>Quinoa</li>
                    <li>Bread</li>
                    <li>Couscous</li>
                  </ul>
                </div>
              </NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>

        {/* Fourth NavigationMenu List */}
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Occasions</NavigationMenuTrigger>
            <NavigationMenuContent className="z-10 bg-white p-6">
              <NavigationMenuLink>
                <div className="flex gap-x-20 py-8 px-[60px]">
                  <ul className="flex flex-col gap-y-4 w-[142px]">
                    <p className="font-bold">UPCOMING HOLIDAY</p>
                    <li>Halloween</li>
                    <li>Diwali</li>
                    <li>Thanksgiving</li>
                    <li>Christmas</li>
                  </ul>
                  <ul className="flex flex-col gap-y-4 w-[184px]">
                    <p className="font-bold">BY OCCASION</p>
                    <li>Birthday</li>
                    <li>Brunch</li>
                    <li>Date Night</li>
                    <li>Parties</li>
                    <li>Picnic</li>
                  </ul>
                </div>
              </NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>

        {/* Fifth NavigationMenu List */}
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>About</NavigationMenuTrigger>
            <NavigationMenuContent className="z-10 bg-white p-6">
              <NavigationMenuLink>
                <div className="w-60 py-8 px-[60px]">
                  <ul className="flex flex-col gap-5 w-32">
                    <li className="font-bold">About Us</li>
                    <li className="font-bold">The New York Times Food Section</li>
                  </ul>
                </div>
              </NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
