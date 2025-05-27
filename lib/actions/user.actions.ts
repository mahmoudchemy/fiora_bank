'use server'

import { cookies } from "next/headers";
import { ID } from "node-appwrite";
import { parseStringify } from "../utils";
import { createAdminClient, createSessionClient } from "../appwrite";

export const signIn = async ({email,password}:signInProps) => {
    try {
        const {account} = await createAdminClient();

        const response = await account.createEmailPasswordSession(email,password);

        return parseStringify(response);

    } catch (error) {
        console.error('Error',error);
    }
}

export const signUp = async (userData:SignUpParams) => {
    

    try {
        const {account} = await createAdminClient();

        const newUserAccount = account.create(ID.unique(), 
        userData.email,
        userData.password, 
        `${userData.firstName} ${userData.lastName}`,
        );

        const session = await account.
        createEmailPasswordSession(userData.email, userData.password);

        (await cookies()).set("appwrite-session", session.secret, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: true,
        });

        return parseStringify(newUserAccount);
    } catch (error) {
        console.error('Error',error);
    }
}


export async function getLoggedInUser() {
  try {
    const { account } = await createSessionClient();
    const user = await account.get();

    return parseStringify(user);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return null;
  }
}

export const  logoutAccount = async () => {
    try {
        const {account} = await createSessionClient();

        (await cookies()).delete('appwrite-session');

        await account.deleteSession('current');
        
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        return null;
    }
}
