import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Typography } from '@mui/material';
import { Container, Link } from '@mui/material';
import NavigationMenu from "../Navigation";
import { CardContent, Box, Stack, Grid } from '@mui/material';
import { useNavigate } from "react-router-dom";
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
const emailID = localStorage.getItem('userEmail');


const noGroupJsx = (
    <>
        <NavigationMenu />
        <h3>You Do not seem to be a part of any Group</h3>
        <br />
        <Button variant="contained">Create a group</Button>
    </>
);

const errorJsx = (
    <>
        <NavigationMenu />
        <h3>An error occurred while fetching your group details</h3>
    </>
);

const DisplayGroups = () => {

    const [hasGroups, setHasGroups] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [groupArr, setGroupArr] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (emailID) {
            axios.post('http://localhost:5000/api/group/findUserGroup', {
                emailId: emailID
            })
                .then((res) => {
                    if (res.status === 200) {
                        setHasGroups(res.data.numOfGroup !== 0);
                        res.data.numOfGroup !== 0 && setGroupArr(res.data.groups);
                    }
                    setLoading(false);
                })
                .catch((error) => {
                    console.log(error);
                    setError(true);
                    setLoading(false);
                });
        }
    }, [emailID]);

    if (loading) {
        return <><NavigationMenu />Loading...</>;
    }

    if (error) {
        return errorJsx;
    }

    if (!hasGroups) {
        return noGroupJsx;
    }

    function handleOnClick(index) {
        const groupId = groupArr[index]._id;
        navigate('/DisplayGroupInfo', { state: { groupId: groupId } });

    }

    return (
        <>
            <NavigationMenu />
            <br></br>
            <h2> Your Groups</h2>
            <Container>


                <Grid sx={{
                    pt: 3,
                    px: 1,

                    borderRadius: 5,
                    display: 'flex',
                    flexDirection: 'column',

                }} >


                    {groupArr.map((group, index) => (
                        <>

                            <CardContent sx={{

                                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                                borderRadius: 5,
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                                "&:hover": {
                                    backgroundColor: 'lightgray',
                                    cursor: 'pointer',
                                    transform: 'scale(1.05)',
                                    transition: '0.4s',
                                    //onClick :handleOnClick(index)
                                }

                            }}
                                key={index}
                                onClick={() => handleOnClick(index)}
                            >



                                <Grid container direction="row" spacing={1} justifyContent="center"  >
                                    <Grid item md={6} xs={12}>
                                        <Stack direction="row" spacing={2} p={1} mt={1}>
                                            <Typography sx={{
                                                bgcolor: (theme) => (theme) => theme.palette['success'].lighter,
                                                borderRadius: 3,
                                            }}>
                                                <b>Name:</b>
                                            </Typography>
                                            <Typography sx={{

                                                borderRadius: 3
                                            }}>
                                                {group.groupName}
                                            </Typography>
                                        </Stack>
                                    </Grid>
                                </Grid>





                                <Grid container direction="row" spacing={1} justifyContent="center"  >
                                    <Grid item md={6} xs={12}>
                                        <Stack direction="row" spacing={2} p={1} mt={1}>
                                            <Typography sx={{
                                                bgcolor: (theme) => (theme) => theme.palette['success'].lighter,
                                                borderRadius: 3
                                            }}>
                                                <b>Currency:</b>
                                            </Typography>
                                            <Typography sx={{

                                                borderRadius: 3
                                            }}>
                                                {group.groupCurrency}
                                            </Typography>
                                        </Stack>
                                    </Grid>
                                </Grid>



                                <Grid container direction="row" spacing={1} justifyContent="center"  >
                                    <Grid item md={6} xs={12}>
                                        <Stack direction="row" spacing={2} p={1} mt={1}>
                                            <Typography sx={{
                                                bgcolor: (theme) => (theme) => theme.palette['success'].lighter,
                                                borderRadius: 3
                                            }}>
                                                <b>Catergory:</b>
                                            </Typography>
                                            <Typography sx={{

                                                borderRadius: 3
                                            }}>
                                                {group.groupCategory}
                                            </Typography>
                                        </Stack>
                                    </Grid>
                                </Grid>
                                <Box
                                    component="a"
                                    href="#"

                                    sx={{
                                        display: 'inline-block',
                                        p: 1,
                                        borderRadius: 1,
                                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                                    }}
                                >
                                    <ArrowOutwardIcon />
                                </Box>



                            </CardContent>


                        </>


                    ))}

                </Grid>
               
            </Container>

        </>
    );

}


export default DisplayGroups;
