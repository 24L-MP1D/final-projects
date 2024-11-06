'use client';

import { Sidebar } from 'flowbite-react';
import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser } from 'react-icons/hi';

export default function LeftBar() {
  return (
    <div>
      <Component1 />
    </div>
  );
}
function Component1() {
  return (
    <div className="dropdown bg-white text-black pl-6 ml-6 my-6 w-[400px]">
      <Sidebar className="dropdown">
        <div className="text-3xl">AMIDO'S</div>
        <Sidebar.Items className="">
          <Sidebar.ItemGroup>
            <Sidebar.Item href="/admin" className="text-black" icon={HiChartPie}>
              Dashboard
            </Sidebar.Item>
            <Sidebar.Collapse icon={HiShoppingBag} label="Amido's">
              <Sidebar.Item href="/admin/addProduct">Бүтээгдэхүүн</Sidebar.Item>
              <Sidebar.Item href="/admin/orders">Хүргэлт</Sidebar.Item>
              <Sidebar.Item href="#">Буцаалт</Sidebar.Item>
              <Sidebar.Item href="/admin/tablesOrder">Ширээ захиалга</Sidebar.Item>
            </Sidebar.Collapse>
            <Sidebar.Item href="#" icon={HiInbox}>
              Inbox
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={HiUser}>
              Users
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={HiArrowSmRight}>
              Sign In
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={HiTable}>
              Sign Up
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
  );
}
//href="/admin/orders"
//href="/admin/food"

//
//className="w-[300px] h-[900px] bg-white mt-10 pt-6 flex flex-col gap-4 text-[#121316] p-10 relative rounded-lg"
//className="text-2xl mb-4"
