import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from './ui/navigation-menu';

export default function HeaderNavigationMenu() {
  return (
    <div>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Юу хайж байна</NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuLink>
                <div className="flex gap-x-20 py-8 px-[60px] bg-white">
                  <ul className="flex flex-col gap-y-4 w-[210px]">
                    <p className="font-bold">Хүүхдэд тохиромжтой</p>
                    <li>Зутан</li>
                    <li>Бор хоолонд орж байгаа хүүхдэд</li>
                    <li>Хөнгөн зууш</li>
                    <li>Хурдан болдог</li>
                    <li>Easy Side Dishes</li>
                  </ul>
                  <ul className="flex flex-col gap-y-4 w-[210px]">
                    <p className="font-bold">Орон орны</p>
                    <li>Ази</li>
                    <li>Европ</li>
                    <li>Үндэстний</li>
                    <li>Хятад</li>
                    <li>Энэтхэг</li>
                    <li></li>
                  </ul>
                </div>
              </NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Жор</NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuLink>
                <div className="flex gap-x-20 py-8 px-[60px] bg-white">
                  <ul className="flex flex-col gap-y-4 w-[210px]">
                    <p className="font-bold">Өдөр тутмын</p>
                    <li>Өглөөний цай</li>
                    <li>Өдрийн хоол</li>
                    <li>Оройн хоол</li>
                    <li>30-минутанд </li>
                    <li>Зууш</li>
                  </ul>
                  <ul className="flex flex-col gap-y-4 w-[210px]">
                    <p className="font-bold">Амттан</p>
                    <li>Бялуу</li>
                    <li>Зайрмаг</li>
                    <li>Чихэр</li>
                    <li>Эрүүл мтан</li>
                    <li>Онцгой амттан</li>
                    <li>Жимсний хослол</li>
                  </ul>
                </div>
              </NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Ingredients</NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuLink>
                <div className="flex gap-x-20 py-8 px-[60px] bg-white">
                  <ul className="flex flex-col gap-y-4 w-[210px]">
                    <p className="font-bold">Мах орсон хоол</p>
                    <li>Тахианы мах</li>
                    <li>Үхрийн мах</li>
                    <li>Хонины мах</li>
                    <li>Шувууны мах</li>
                  </ul>
                  <ul className="flex flex-col gap-y-4 w-[184px]">
                    <p className="font-bold">Дэглэм</p>
                    <li>Салат</li>
                    <li>Уураглаг хоол</li>
                    <li>Дэглэмийн хоол</li>
                    <li>Сүүн бүтээгдэхүүн</li>
                  </ul>
                </div>
              </NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Тохиолт өдрүүд</NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuLink>
                <div className="flex gap-x-20 py-8 px-[60px] bg-white">
                  <ul className="flex flex-col gap-y-4 w-[210px]">
                    <p className="font-bold">Тэмдэглэлт өдрүүд</p>
                    <li>Үдэшлэг</li>
                    <li>Найзуудийн үдэш</li>
                    <li>Гэрлэлт</li>
                    <li>Төрсөн өдөр</li>
                    <li>Бэлэгэнд өгж болох хоолнууд</li>
                  </ul>
                  <ul className="flex flex-col gap-y-4 w-[210px]">
                    <p className="font-bold">Баярын өдрүүд</p>
                    <li>Цагаан сар</li>
                    <li>Шинэ жил</li>
                    <li></li>
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
