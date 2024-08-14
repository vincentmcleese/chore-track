"use server";

import * as auth from "@/src/auth";

export async function signOut() {
  return auth.signOut();
}
