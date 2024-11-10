'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';

export default function Menu() {
  return (
    <div className="flex-col">
      <div className=" flex	flex-col">
        <Tabs defaultValue="menu" className=" flex-1">
          <TabsList>
            <TabsTrigger value="menu">Menu</TabsTrigger>
            <TabsTrigger value="salad">Salad</TabsTrigger>
            <TabsTrigger value="dishes">Dishes</TabsTrigger>
            <TabsTrigger value="drinks">Drinks</TabsTrigger>
            <TabsTrigger value="beer">Beer</TabsTrigger>
          </TabsList>

          <div className="flex pb-20">
            <TabsContent value="menu" className="">
              <img src="/restaurant/amidoss.jpeg" alt="as" />
            </TabsContent>
            <TabsContent value="salad">
              <img src="/restaurant/salad.jpeg" alt="as" />
            </TabsContent>
            <TabsContent value="drinks">
              <img src="/restaurant/drinks.jpeg" alt="as" />
            </TabsContent>
            <TabsContent value="dishes">
              <img src="/restaurant/dishes.jpeg" alt="as" />
            </TabsContent>
            <TabsContent value="beer">
              <img src="/restaurant/beer.jpeg" alt="as" />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
