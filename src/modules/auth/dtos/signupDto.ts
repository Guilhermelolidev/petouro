import { Account } from "../types/account";

export const mapToDto = (account: Account) => ({
    id: account.id,
    email: account.email,
    active: account.active,
    created_at: account.created_at
})