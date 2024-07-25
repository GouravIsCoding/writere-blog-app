import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import HomePage from "@/components/landing/home";
import SearchDiv from "@/components/landing/search";
import ReadDiv from "@/components/landing/read";

export default function Page() {
  const contentDivs = [<HomePage />, <SearchDiv />, <ReadDiv />];

  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <Carousel
        opts={{
          align: "start",
        }}
        orientation="vertical"
        className="w-full max-w-full"
      >
        <CarouselContent className="-mt-1 h-96">
          {contentDivs.map((el, index) => (
            <CarouselItem key={index} className="w-auto">
              <div className="p-1">{el}</div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
