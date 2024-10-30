'use client';

export default function Page() {
  return (
    <div className="">
      <SignedIn>
        <div>Secret info</div>
        <div>secret</div>
      </SignedIn>

      <SignedOut>Login button</SignedOut>

      <Protect role="admin"></Protect>
    </div>
  );
}

function SignedIn({ children }) {
  if (!user) {
    return null;
  }

  return <div>{children}</div>;
}

function Protect({ children, role }) {
  if (user.role !== role) {
    return null;
  }

  return <div>{children}</div>;
}
