import { FaRegHeart } from 'react-icons/fa';

export function Header() {
  return (
    <div className="container mx-auto w-[1920px] bg-slate-400 flex gap-12 items-center">
      <div>Logo</div>
      <div>Categories</div>
      <input type="text" />
      <a href="/sell">Sell</a>
      <a href="/help">Help</a>
      <div>
        <FaRegHeart className=" w-[24px] h-[24px] text-white" />
      </div>
      <button className="bg-blue-700 text-white w-[87.31px] h-[52px] top-[8px] left-[181.27px] text-xs">Sign in</button>
    </div>
  );
}
