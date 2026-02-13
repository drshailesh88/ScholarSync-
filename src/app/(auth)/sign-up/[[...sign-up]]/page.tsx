import { SignUp } from "@clerk/nextjs";

const hasClerkKeys =
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
  !process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.includes("placeholder");

export default function SignUpPage() {
  if (!hasClerkKeys) {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-ink mb-4">Sign Up</h1>
        <p className="text-ink-muted">
          Configure NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY in .env.local to enable
          authentication.
        </p>
      </div>
    );
  }
  return <SignUp />;
}
