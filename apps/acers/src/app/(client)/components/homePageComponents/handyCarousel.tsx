import { Item } from '../itemComponents/singleItem';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/Carousel';

export const HandyCarousel = ({ data, name }: { data: any[]; name: string }) => {
  return (
    <Carousel>
      <CarouselContent>
        {data.map((item) => (
          <CarouselItem className="basis-3/1 sm:basis-3/3 md:basis-1/3 lg:basis-1/4" key={`${name}${item.id}`}>
            <Item item={item} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="hidden md:block">
        <CarouselPrevious />
        <CarouselNext />
      </div>
    </Carousel>
  );
};
