import React from 'react';
import { useParams, Link as RLink } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link' ;
import MediaCollection from "./MediaCollection";
import Grid from '@material-ui/core/Grid';

import ScriptEditor from "./ScriptEditor";
import WebCamCard from "../components/WebCamCard";
import ListItem from "@material-ui/core/ListItem";

const api = 'http://localhost:5000/';


const teacher = {
    avatar: 'R',
    name: 'Rodrigo Werneck Franco',
    description: 'Cientista da Computação',
    subtext: 'Aulas de Machine Learnine, WebDesenvolvimento, etc...',
}

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
            margin: 0,
        },
    },
    scriptPaper: {
        padding: theme.spacing(3),
        margin: 0,
    },
    webcam: {

    },
    medias: {

    }
}));

export default function Presentation() {
    const classes = useStyles();
    let { id } = useParams();

    return (
        <div className={classes.root}>
            <Breadcrumbs aria-label="breadcrumb">
                <Link color="inherit" component={RLink} to="/">
                    eSTudo
                </Link>
                <Link color="inherit" component={RLink} to={"/present/"+id}>
                    {id}
                </Link>
                <Typography color="textPrimary">Presentation</Typography>
            </Breadcrumbs>
            <Grid container spacing={3}>
                <Grid item xs={8}>
                    <ScriptEditor contentPath={api+'/static/'+id+'.md'} editmode={false}/>
                </Grid>
                <Grid item xs={4}>
                    <WebCamCard className={classes.webcam} teacher={teacher}/>
                    <MediaCollection classid={id} className={classes.medias}/>
                </Grid>
            </Grid>
        </div>
    );
}