import { NextRequest, NextResponse } from "next/server";
import { getToken, JWT } from "next-auth/jwt";
import { verify } from "jsonwebtoken";

export default async function middleware(req: NextRequest) {
  const secret = process.env.NEXTAUTH_SECRET;
  const url = req.nextUrl.clone();
  const token = req.headers.get("authorization");
  // const token = JSON.parse(jwt)?.split(' ')[1];
  console.log(`JWT: ${token}`);
  console.log(`Type of token: ${typeof token}`);
  // const token = jwt?.split(' ')[1];
  // console.log(`TOKEN: ${token}`);
  console.log(`SECRET in .env: ${secret}`);

  if (url.pathname == "/login") {
    if (token) {
      var decoded;
      try {
        decoded = verify(`${token}`, `${secret}`);
        console.log(decoded);
        url.pathname = "/";
        return NextResponse.rewrite(url);
      } catch (e) {
        console.log(e);
        return NextResponse.next();
      }
    }
  }

  if (url.pathname != "/login") {
    if (token === null) {
      return NextResponse.next();
    }
    try {
      const session = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
      });
      console.log(session);
      // const decoded = verify(`${token}`, `${secret}`);
      // console.log(decoded);
      return NextResponse.next();
    } catch (e) {
      url.pathname = "/login";
      console.log(e);
      return NextResponse.rewrite(url);
    }
  }

  const response = NextResponse.next();
  response.headers.set("Authorization", `Bearer ${token}`);

  return response;
}
