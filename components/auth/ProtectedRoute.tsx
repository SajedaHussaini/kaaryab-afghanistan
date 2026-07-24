// "use client";

// import { useAuth } from "@/context/AuthContext";
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";


// export function ProtectedRoute({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const { isAuthenticated } = useAuth();
//   const router = useRouter();

//   useEffect(() => {
//     if (!isAuthenticated) {
//       router.replace("/auth");
//     }
//   }, [isAuthenticated, router]);

//   if (!isAuthenticated) {
//     return (
//       <div className="mx-auto max-w-xl py-20 text-center">
//         <h2 className="text-2xl font-bold">
//           Please sign in first
//         </h2>

//         <p className="mt-2 text-neutral-600">
//           You must sign in to access this page.
//         </p>
//       </div>
//     );
//   }

//   return <>{children}</>;
// }






// "use client";

// import { useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { useAuth } from "@/context/AuthContext";

// export function ProtectedRoute({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const { isAuthenticated } = useAuth();
//   const router = useRouter();

//   useEffect(() => {
//     if (!isAuthenticated) {
//       router.replace("/auth");
//     }
//   }, [isAuthenticated, router]);

// //   if (!isAuthenticated) {
// //   return (
// //     <div className="flex min-h-[50vh] items-center justify-center">
// //       <p className="text-neutral-600">Redirecting...</p>
// //     </div>
// //   );
// // }

// if (!isAuthenticated) {
//   return (
//     <div className="flex min-h-[50vh] items-center justify-center">
//       <p className="text-neutral-600">Redirecting...</p>
//     </div>
//   );
// }

// return <>{children}</>;

// }














"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/auth");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p className="text-neutral-600">Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p className="text-neutral-600">Redirecting...</p>
      </div>
    );
  }

  return <>{children}</>;
}
