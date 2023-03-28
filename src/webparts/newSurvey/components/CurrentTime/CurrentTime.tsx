import { Box, Typography } from "@mui/material"
import * as React from "react"
import { useEffect } from "react"

const CurrentTime = () => {

    const [currentTime, setCurrentTime] = React.useState(new Date().toLocaleTimeString())

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date().toLocaleTimeString())
        }, 1000)
        return () => clearInterval(interval)
    }, [currentTime])

    return (
        <Box>
            <h2>Current Time</h2>
            <Typography>Current Time: <b>{new Date().toLocaleTimeString()}</b></Typography>
            <hr />
        </Box>
    )
}

export default CurrentTime