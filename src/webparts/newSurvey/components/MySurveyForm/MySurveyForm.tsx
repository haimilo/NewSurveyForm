import { WebPartContext } from "@microsoft/sp-webpart-base";
import { Box, Button, Checkbox, FormControl, FormControlLabel, FormGroup, Radio, RadioGroup, Typography } from "@mui/material";
import * as React from "react";
import { useEffect, useState } from "react";
import { getSP } from "../../../../pnpSPConfig";
import { Calendar as SelectDate } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

export interface IMySurveyForm {
    context: WebPartContext;
    userDisplayEmail: string;
}

const MySurveyForm = (props: IMySurveyForm) => {
    const ListName = 'New Survey Form';
    let _sp = getSP(props.context);

    const [dataList, setDataList] = useState([]);
    const [isAnsweredSurvey, setIsAnsweredSurvey] = useState<boolean>(false);
    const [isStartSurvey, setIsStartSurvey] = useState<boolean>(false);
    const [_currentQuestion, _setCurrentQuestion] = useState<number>(1);

    const [answer1, setAnswer1] = useState<string>("A");
    const [answer2, setAnswer2] = useState<string[]>([]);
    const [answer3, setAnswer3] = useState<Date>(new Date());
    const [age, setAge] = useState<string>("");

    useEffect(() => {
        _sp.web.lists.getByTitle(ListName).items.filter(`Email eq '${props.userDisplayEmail}'`)()
            .then((items) => {
                setDataList(items);
            })
            .catch((error) => {
                console.log('Error', error);
            })
    }, [])

    useEffect(() => {
        if (dataList.length > 0 && dataList[0].HasAnswered) {
            setIsAnsweredSurvey(true);
        } else {
            setIsAnsweredSurvey(false);
        }
    }, [dataList])

    const handleNextQuestion = (curQuestion: number) => {
        if (_currentQuestion < 4) {
            if (_currentQuestion === 1) {
                if (answer1 === "A") {
                    _setCurrentQuestion(2);
                } else if (answer1 === "B") {
                    _setCurrentQuestion(3);
                }
            } else {
                _setCurrentQuestion(curQuestion + 1);
            }
        } else if (_currentQuestion === 4) {
            _setCurrentQuestion(curQuestion);
        }
    }

    const handleBackQuestion = (curQuestion: number) => {
        if (_currentQuestion > 1) {
            if (
                (_currentQuestion === 2 && answer1 === "A") ||
                (_currentQuestion === 3 && answer1 === "B")
            ) {
                _setCurrentQuestion(1);
            } else {
                _setCurrentQuestion(curQuestion - 1);
            }
        } else if (_currentQuestion === 1) {
            _setCurrentQuestion(curQuestion);
        }
    }

    const handleSetAnswer2 = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        if ((answer2 as any).includes(value)) {
            setAnswer2(answer2.filter((item) => item !== value));
        } else {
            setAnswer2([...answer2, value]);
        }
    }

    useEffect(() => {
        const _today = new Date();
        if (answer3 !== null && answer3 !== undefined && answer3 !== _today) {
            const _diff = _today.getTime() - (answer3 as any).getTime();
            const _age = new Date(_diff);
            const _years = Math.abs(_age.getUTCFullYear() - 1970);
            const _months = Math.abs(_age.getUTCMonth());
            setAge(`You are ${_years} years and ${_months} months old`);
        }
    }, [answer3]);


    const QuestionContent = (props: { currentQuestion: number }) => {
        switch (props.currentQuestion) {
            case 1:
                return (
                    <Box>
                        <FormControl>
                            <Typography
                                sx={{
                                    color: '#000',
                                }}
                            >
                                <b>Question 1:</b>
                                <br />
                                This is Question 1. if you select Answer A, your next question will be Question 2. If you select Answer B, your next question will be Question 3.
                            </Typography>
                            <RadioGroup
                                name="radio-buttons-group"
                                value={answer1}
                                onChange={(event) => setAnswer1(event.target.value)}
                            >
                                <FormControlLabel value="A" control={<Radio />} label="Answer A, Go to Question 2" />
                                <FormControlLabel value="B" control={<Radio />} label="Answer B, Go to Question 3" />
                            </RadioGroup>
                        </FormControl>
                    </Box>
                )
            case 2:
                return (
                    <Box>
                        <FormControl>
                            <Typography
                                sx={{
                                    color: '#000',
                                }}
                            >
                                <b>Question 2:</b>
                                <br />
                                What are your favorite programming languages? Please select 2.
                                Answer for Question 2, displayed as multi-select checkboxes
                            </Typography>
                            <FormGroup>
                                <FormControlLabel
                                    control={<Checkbox
                                        onChange={handleSetAnswer2}
                                        value="C#"
                                        checked={(answer2 as any).includes("C#")}
                                    />}
                                    label="C#"
                                />
                                <FormControlLabel
                                    control={<Checkbox
                                        onChange={handleSetAnswer2}
                                        value="Java"
                                        checked={(answer2 as any).includes("Java")}
                                    />}
                                    label="Java"
                                />
                                <FormControlLabel
                                    control={<Checkbox
                                        onChange={handleSetAnswer2}
                                        value="JavaScript"
                                        checked={(answer2 as any).includes("JavaScript")}
                                    />}
                                    label="JavaScript"
                                />
                                <FormControlLabel
                                    control={<Checkbox
                                        onChange={handleSetAnswer2}
                                        value="TypeScript"
                                        checked={(answer2 as any).includes("TypeScript")}
                                    />}
                                    label="TypeScript"
                                />
                                <FormControlLabel
                                    control={<Checkbox
                                        onChange={handleSetAnswer2}
                                        value="ReactJs"
                                        checked={(answer2 as any).includes("ReactJs")}
                                    />}
                                    label="ReactJs"
                                />
                                <FormControlLabel
                                    control={<Checkbox
                                        onChange={handleSetAnswer2}
                                        value="SharePoint"
                                        checked={(answer2 as any).includes("SharePoint")}
                                    />}
                                    label="SharePoint"
                                />
                                <FormControlLabel
                                    control={<Checkbox
                                        onChange={handleSetAnswer2}
                                        value="Azure"
                                        checked={(answer2 as any).includes("Azure")}
                                    />}
                                    label="Azure"
                                />
                                <FormControlLabel
                                    control={<Checkbox
                                        onChange={handleSetAnswer2}
                                        value=".Net"
                                        checked={(answer2 as any).includes(".Net")}
                                    />}
                                    label=".Net"
                                />
                            </FormGroup>
                        </FormControl>
                    </Box>
                )
            case 3:
                return (
                    <Box>
                        <Typography
                            sx={{
                                color: '#000',
                            }}
                        >
                            <b>Question 3:</b>
                            <br />
                            When is your birthday?
                            Answer for Question 3, displayed as date control, after the user selected his/her birthday, display his/her age, for e.g., You are X years and Y months old.
                        </Typography>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                mt: '.5rem',
                                alignItems: 'center',
                                justifyContent: 'center',
                                border: '1px solid #ccc',
                                borderRadius: '4px',
                                overflow: 'hidden',
                                width: 'object-fit',
                            }}
                        >
                            <SelectDate
                                onChange={(date) => {
                                    setAnswer3(date);
                                }}
                                direction="horizontal"
                                fixedHeight
                                date={answer3}
                            />
                        </Box>
                        {
                            age !== 'You are 0 years and 0 months old' && (
                                <Typography
                                    sx={{
                                        color: '#000',
                                        my: '.5rem',
                                        transition: 'all .3s ease-in-out',
                                    }}
                                >
                                    {age}
                                </Typography>
                            )
                        }
                    </Box>
                )
            case 4:
                return (
                    <Box>
                        <h3>
                            Question 4
                        </h3>
                    </Box>
                )
            default:
                return (
                    <Box>
                        <h3>
                            Question 1
                        </h3>
                    </Box>
                )
        }
    }

    return (
        <Box>
            <h2>
                Survey Form
            </h2>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    padding: '1rem',
                    mt: '.5rem',
                }}
            >
                <Box>
                    {
                        isAnsweredSurvey ?
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                }}
                            >
                                <Typography>
                                    Thank you for your response.
                                </Typography>
                                <Button variant="contained"
                                    sx={{
                                        my: '.5rem',
                                        maxWidth: "200px",
                                    }}>
                                    View My Response
                                </Button>
                            </Box> :
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                }}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        my: '.5rem',
                                    }}
                                >
                                    <Typography>
                                        Please fill out the survey below.
                                    </Typography>
                                    <Typography>
                                        {`Question ${_currentQuestion} of 4`}
                                    </Typography>
                                </Box>
                                {
                                    isStartSurvey ?
                                        <Box>
                                            {/* Question Box */}
                                            <Box>
                                                <QuestionContent currentQuestion={_currentQuestion} />
                                            </Box>
                                            {/* Action Box */}
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    flexDirection: 'row',
                                                    justifyContent: 'space-between',
                                                    mt: '.5rem',
                                                }}
                                            >
                                                <Button variant="contained" color="error"
                                                    onClick={() => handleBackQuestion(_currentQuestion)}
                                                    disabled={_currentQuestion === 1}
                                                >
                                                    Back
                                                </Button>
                                                <Button variant="contained" color="success"
                                                    onClick={() => handleNextQuestion(_currentQuestion)}
                                                >
                                                    {
                                                        _currentQuestion === 4 ? 'Submit' : 'Next'
                                                    }
                                                </Button>
                                            </Box>
                                        </Box> :
                                        <Button variant="contained"
                                            sx={{
                                                my: '.5rem',
                                                maxWidth: "200px",
                                            }}
                                            onClick={() => setIsStartSurvey(true)}
                                        >
                                            Start Survey
                                        </Button>
                                }
                            </Box>
                    }
                </Box>
            </Box>
        </Box>
    )
}

export default MySurveyForm