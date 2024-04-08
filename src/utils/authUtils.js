import { SDK } from "../components/sdk/sdk";

export const VerifySession = async () => {
    const token = localStorage.getItem('token');
    const publicKey = localStorage.getItem('publicKey');
    const err = await SDK.verifyJWT(token, publicKey);
    return err;
}