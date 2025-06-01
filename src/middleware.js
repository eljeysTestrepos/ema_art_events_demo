import { authMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server"; // Importeres for at have den tilgængelig, hvis du får brug for den i fremtiden.

// ---

// Definer de ruter, der skal beskyttes (kræver login)
// '/dashboard' og '/create_edit' er nu markeret som beskyttede.
const isProtectedRoute = createRouteMatcher(["/dashboard", "/create_edit"]);

// Definer de ruter, der skal være offentligt tilgængelige (kræver IKKE login)
const isPublicRoute = createRouteMatcher([
  "/", // Din hjemmeside
  "/events", // Oversigt over begivenheder
  "/api/webhook", // Eksempel: En webhook, der skal være offentlig
  // Tilføj andre ruter her, der skal være offentlige, f.eks. '/about', '/contact' osv.
]);

// ---

export default clerkMiddleware();

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
