"use server"

import { PlatformUserCreateInput } from "@enterprise-commerce/core/platform/types"
import { cookies } from "next/headers"
import { storefrontClient } from "clients/storefrontClient"
import internalClient from "clients/internalClient"
import { COOKIE_ACCESS_TOKEN } from "constants/index"

export async function registerUser({ email, password }: { email: string; password: string }) {
  console.log("Email", email, password)
  console.log("Password", password)
  const user = await internalClient.registerUser({ email, password })
  console.log("internalClientUser", user)
  return user
}

export async function loginUser({ email, password }: { email: string; password: string }) {
  const user = await internalClient.loginUser({ email, password })
  cookies().set(COOKIE_ACCESS_TOKEN, user?.accessToken || "", { expires: new Date(user?.expiresAt || "") })
  return user
}

// For Task 1, you can leave the getCurrentUser() function below as it is. 
// For Task 2, you need to adapt it.
export async function getCurrentUser() {
  const accessToken = cookies().get(COOKIE_ACCESS_TOKEN)?.value
  const user = await internalClient.getUser(accessToken || "") // we should replace this with our client
  return user
}

// disregard the updateUser function, someone else is working on it
export async function updateUser(input: PlatformUserCreateInput) {
  const accessToken = cookies().get(COOKIE_ACCESS_TOKEN)?.value

  const user = await storefrontClient.updateUser(accessToken!, { ...input })
  return user
}

export async function logoutUser() {
  cookies().delete(COOKIE_ACCESS_TOKEN)
}
