import { BRAND } from "@/lib/config/branding";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex">
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        {children}
      </div>
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-indigo-600 to-sky-500 items-center justify-center p-12">
        <div className="max-w-md text-center text-white">
          <blockquote className="text-2xl font-serif italic leading-relaxed mb-6">
            &ldquo;Find every relevant paper in seconds.&rdquo;
          </blockquote>
          <p className="text-white/70 text-sm">{BRAND.tagline}</p>
          <div className="mt-12 text-white/50 text-sm font-medium">
            {BRAND.name}
          </div>
        </div>
      </div>
    </div>
  );
}
