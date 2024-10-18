"use client";

// import Header from "@/components/header";
// import LeftBar from "@/components/leftBar";

export default function Home() {
    /*
     * Replace the elements below with your own.
     *
     * Note: The corresponding styles are in the ./index.tailwind file.
     */
    return (
        <div className="bg-[#F7F7F8]">
            {/* <Header> */}
              <h1>
                <span> Hello there, </span>
               Welcome to the client accepting dashboard 👋
            <Button>Approve the seller's request</Button>
            <Button>Reject  the seller's request</Button>
            </h1>
            {/* </Header> */}
            <div className="max-w-[1440px] mx-auto ">
            {/* <LeftBar /> */}
            </div>
        </div>
    );
  }
