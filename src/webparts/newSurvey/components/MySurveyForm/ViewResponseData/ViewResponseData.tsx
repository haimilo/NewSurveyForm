import { WebPartContext } from "@microsoft/sp-webpart-base"
import { Box, Typography, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, Rating } from "@mui/material"
import * as React from "react"
import { useEffect, useMemo } from "react";
import { getSP } from "../../../../../pnpSPConfig"

export interface IViewResponseData {
    context: WebPartContext;
    listName: string;
}

export interface IResponseData {
    Id: number;
    FullName: string;
    Email: string;
    Answer1: string;
    DateOfBirth: Date | string;
    Age: string;
    Skills?: string[];
    RatingSurvey: number;
}

const ViewResponseData = (props: IViewResponseData) => {
    const {
        context,
        listName
    } = props;

    const _sp = getSP(context);
    const ListName = listName;

    const [viewResponseData, setViewResponseData] = React.useState<boolean>(false);
    const [responseData, setResponseData] = React.useState<IResponseData[]>();

    useEffect(() => {
        _sp.web.lists.getByTitle(ListName).items.filter(`Email eq '${props.context.pageContext.user.email}'`)().then((res) => {
            setResponseData(res);
        });
    }, []);

    const formatDate = useMemo(() => {
        if (!responseData) return "-";
        const newDate = new Date(responseData[0].DateOfBirth as string);
        const formattedDate = newDate.toLocaleDateString('en-GB'); // use your preferred locale here
        return formattedDate;
    }, [responseData]);

    return (
        <Box>
            <Box>
                <Typography>
                    Thank you for your response.
                </Typography>
                <Button variant="contained"
                    sx={{
                        my: '.5rem',
                        maxWidth: "200px",
                    }}
                    onClick={() => setViewResponseData(!viewResponseData)}
                >
                    {
                        viewResponseData ? "Hide My Response" : "View My Response"
                    }
                </Button>
            </Box>
            <Box
                sx={{
                    opacity: viewResponseData ? 1 : 0,
                    width: '100%',
                    maxWidth: '100%',
                    height: viewResponseData ? '100%' : 0,
                    transition: 'all 0.6s ease-in-out !important',
                }}
            >
                {/* Table Response */}
                <TableContainer component={Paper}>
                    <Table sx={{
                        minWidth: 650,
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }} aria-label="simple table">
                        <TableHead>
                            <TableRow
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: '100%',
                                    minWidth: '200px',
                                    backgroundColor: '#3f51b59e',
                                }}
                            >
                                <TableCell sx={{
                                    textAlign: 'center',
                                    fontSize: '1rem',
                                    fontWeight: 'bold',
                                    color: 'white',
                                    border: 'none',
                                }}>Index</TableCell>
                                <TableCell sx={{
                                    textAlign: 'center',
                                    fontSize: '1rem',
                                    fontWeight: 'bold',
                                    color: 'white',
                                    border: 'none',
                                }}>Full Name</TableCell>
                                <TableCell sx={{
                                    textAlign: 'center',
                                    fontSize: '1rem',
                                    fontWeight: 'bold',
                                    border: 'none',
                                    color: 'white',
                                }}>Email</TableCell>
                                <TableCell sx={{
                                    textAlign: 'center',
                                    fontSize: '1rem',
                                    fontWeight: 'bold',
                                    border: 'none',
                                    color: 'white',
                                }}>Answer 1</TableCell>
                                <TableCell sx={{
                                    textAlign: 'center',
                                    fontSize: '1rem',
                                    fontWeight: 'bold',
                                    border: 'none',
                                    color: 'white',
                                }}>DOB</TableCell>
                                <TableCell sx={{
                                    textAlign: 'center',
                                    fontSize: '1rem',
                                    fontWeight: 'bold',
                                    border: 'none',
                                    color: 'white',
                                }}>Age</TableCell>
                                <TableCell sx={{
                                    textAlign: 'center',
                                    fontSize: '1rem',
                                    fontWeight: 'bold',
                                    border: 'none',
                                    color: 'white',
                                }}>Skills</TableCell>
                                <TableCell sx={{
                                    textAlign: 'center',
                                    fontSize: '1rem',
                                    fontWeight: 'bold',
                                    border: 'none',
                                    color: 'white',
                                }}>Rating Survey</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                responseData?.map((row, index) => (
                                    <TableRow
                                        key={row.Id}
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            minWidth: 'calc(100% - 244px)',
                                            overflow: 'hidden',
                                        }}
                                    >
                                        <TableCell component="th" scope="row" sx={{
                                            textAlign: 'center',
                                            height: '100%',
                                            border: 'none',
                                            minHeight: '24px',
                                            backgroundColor: '#ffaeae6e',
                                            width: '100%',
                                        }}>
                                            {index + 1}
                                        </TableCell>
                                        <TableCell sx={{
                                            minHeight: '24px',
                                            textAlign: 'center',
                                            border: 'none',
                                            width: '100%',
                                            height: '100%',
                                        }}>{row.FullName}</TableCell>
                                        <TableCell sx={{
                                            textAlign: 'center',
                                            height: '100%',
                                            border: 'none',
                                            backgroundColor: '#ffaeae6e',
                                            width: '100%',
                                            minHeight: '24px',
                                        }}>{row.Email}</TableCell>
                                        <TableCell sx={{
                                            textAlign: 'center',
                                            height: '100%',
                                            border: 'none',
                                            width: '100%',
                                            minHeight: '24px',
                                        }}>{row.Answer1}</TableCell>
                                        <TableCell sx={{
                                            textAlign: 'center',
                                            height: '100%',
                                            border: 'none',
                                            backgroundColor: '#ffaeae6e',
                                            width: '100%',
                                            minHeight: '24px',
                                        }}>{
                                                formatDate
                                            }</TableCell>
                                        <TableCell sx={{
                                            textAlign: 'center',
                                            border: 'none',
                                            height: '100%',
                                            width: '100%',
                                            minHeight: '24px',
                                        }}>{Number(row.Age)}</TableCell>
                                        <TableCell sx={{
                                            textAlign: 'center',
                                            height: '100%',
                                            border: 'none',
                                            width: '100%',
                                            maxHeight: '24px',
                                            backgroundColor: '#ffaeae6e',
                                            overflowY: 'scroll',
                                            "-ms-overflow-style": "none" /* IE and Edge */,
                                            "scrollbar-width": "none" /* Firefox */,
                                            "&::-webkit-scrollbar": {
                                                display: "none"
                                            }
                                        }}>{row.Skills.map((skill, index) => {
                                            return (
                                                <Chip
                                                    key={index}
                                                    label={skill} sx={{
                                                        m: '0 .2rem .2rem',
                                                        color: '#fff',
                                                        backgroundColor: index % 2 === 0 ? '#3f51b5' : '#f50057',
                                                    }} />
                                            )
                                        })}</TableCell>
                                        <TableCell sx={{
                                            textAlign: 'center',
                                            border: 'none',
                                            height: '100%',
                                            width: '100%',
                                            maxHeight: '24px',
                                        }}>
                                            <Rating
                                                name="simple-controlled"
                                                value={Number(row.RatingSurvey)}
                                                readOnly
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box >
    )
}

export default ViewResponseData