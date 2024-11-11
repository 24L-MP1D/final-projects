import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar"
  
  <Menubar>
  <MenubarMenu>
    <MenubarTrigger>Файл</MenubarTrigger>
    <MenubarContent>
      <MenubarItem>
      Шинэ таб <MenubarShortcut>⌘T</MenubarShortcut>
      </MenubarItem>
      <MenubarItem>Шинэ цонх</MenubarItem>
      <MenubarSeparator />
      <MenubarItem>Хуваалцах</MenubarItem>
      <MenubarSeparator />
      <MenubarItem>Хэвлэх</MenubarItem>
    </MenubarContent>
  </MenubarMenu>
</Menubar>


export default function DisplayCategories() {
    throw new Error("Function not implemented.")
}
