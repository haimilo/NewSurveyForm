import { Box, Typography } from "@mui/material";
import * as React from "react"

export interface ICurrentUser {
    userDisplayName: string;
    userDisplayEmail: string;
}

const CurrentUser = (props: ICurrentUser) => {
    const {
        userDisplayName,
        userDisplayEmail,
    } = props;

    return (
        <Box>
            <h2>Current User</h2>
            <Typography>Display Name: <b>{userDisplayName}</b></Typography>
            <Typography>Email: <b>{userDisplayEmail}</b></Typography>
            <hr />
        </Box>
    )
}

export default CurrentUser