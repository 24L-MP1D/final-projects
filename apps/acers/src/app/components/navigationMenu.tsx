import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from './ui/navigation-menu';

export default function HeaderNavigationMenu() {
  return (
    <div>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Want to Cook</NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuLink>
                <div className="flex gap-x-20 py-8 px-[60px] bg-white">
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
      </NavigationMenu>
    </div>
  );
}
