import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import MediaCard from "../components/MediaCard";
import {useParams} from "react-router-dom";

const api = 'http://localhost:5000/';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(0.5),
        },
    },
}));

export default function MediaCollection(props) {
    const classes = useStyles();
    const [collection, setCollection] = useState({});
    let { id } = useParams();

    useEffect(()=>{
        const mediaList = {}
        const classname =  (props.classid !== undefined) ? props.classid : id;
        fetch(api+'get_class/'+classname)
            .then(response => response.json())
            .then(data => {
                for (const ind in data) {
                    const patharr = data[ind].split('.');
                    if (!(patharr[0] in mediaList)) {
                        mediaList[patharr[0]] = {json: null, media: null}
                    }
                    if (patharr[1] === 'json') {
                        mediaList[patharr[0]].json = api+data[ind];
                    } else {
                        mediaList[patharr[0]].media = api+data[ind];
                    }
                }
                console.log(mediaList);
                setCollection(mediaList);
            });
    }, []);

    return (
        <div className={classes.root}>
            {Object.keys(collection).map((keyname, i) => (
                <MediaCard media={collection[keyname].media} jsonpath={collection[keyname].json} key={i} />
            ))}
        </div>
    );
}