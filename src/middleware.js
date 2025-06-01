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

// Eksporterer din middleware-funktion
export default authMiddleware({
  // 'beforeAuth' kører før Clerks standardautentificering.
  // Her kan du tilføje din egen logik for at styre, hvornår Clerk skal beskytte ruter.
  async beforeAuth(auth, req) {
    // Hvis den aktuelle rute er en offentlig rute, lader vi anmodningen fortsætte uden Clerk-autentificering.

    // Hvis ruten er en beskyttet rute, forsøger vi at beskytte den med Clerk.
    // Hvis brugeren ikke er logget ind, vil Clerk omdirigere dem til login.
    if (isProtectedRoute(req)) {
      await auth().protect();
    }

    // For alle andre ruter, der hverken er eksplicit offentlige eller beskyttede,
    // vil Clerk som standard tillade adgang, medmindre du eksplicit ændrer dette.
    // Du kan tilføje mere kompleks logik her, hvis nødvendigt.
  },

  // 'publicRoutes' er en nem måde at angive ruter, der altid skal være tilgængelige for uloggede brugere.
  // Clerk vil ikke prøve at autentificere eller omdirigere for disse ruter.
  publicRoutes: [
    "/",
    "/events",
    "/api/webhook", // Endnu et eksempel på en offentlig API-rute
    // Du kan også tilføje Next.js API routes her, f.eks., '/api/public-data'
    // Eller tRPC procedurer, f.eks., '/trpc/(.*)'
  ],

  // 'ignoreRoutes' kan bruges til helt at udelukke ruter fra Clerk's middleware.
  // Dette er sjældent nødvendigt med 'publicRoutes' og 'matcher' korrekt konfigureret.
  // ignoreRoutes: ['/((?!api|trpc|auth).*)'],

  // 'debug: true' giver mere detaljerede logs under udvikling, hvilket er nyttigt for fejlfinding.
  debug: true,
});

// ---

// 'config.matcher' definerer, hvilke stier Next.js middleware skal køre på.
// Dette er essentielt for at sikre, at din middleware kører på de rigtige steder.
export const config = {
  matcher: [
    // Ignorer statiske filer (billeder, CSS, JS uden 'json' i navnet osv.) og Next.js interne filer.
    // Men inkluderer dem, hvis de har spørgeparametre (f.eks. for cachebusting).
    "/((?!.+\\.[\\w]+$|_next).*)",
    // Inkluderer alle API-ruter og tRPC-ruter, så Clerk også beskytter dem.
    "/(api|trpc)(.*)",
  ],
};
