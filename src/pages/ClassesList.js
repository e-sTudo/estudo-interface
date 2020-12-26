import React, {useEffect} from 'react'
import {makeStyles} from "@material-ui/core/styles";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams
} from "react-router-dom";

const api = 'http://localhost:5000/';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
}));

export default function ClassesList(props) {
    const classes = useStyles();
    const [classesList, setClassesList] = React.useState({});

    useEffect(()=>{
        fetch(api+"get_classes")
            .then(response => {
                console.log(response);
                return response.json();
            })
            .then(list => {
                const classeslist = {};
                for (const ind in list) {
                    const name = list[ind].split('.')[0];
                    classeslist[name] = change_name(name);
                }
                setClassesList(classeslist);
            });
    }, []);

    const change_name = (name) => {
        const regexCamel = /(\w[A-Z])/g;
        let array1;
        while ((array1 = regexCamel.exec(name)) !== null) {
            console.log(`Found ${array1[0]}. Next starts at ${regexCamel.lastIndex}.`);
            // expected output: "Found foo. Next starts at 9."
            // expected output: "Found foo. Next starts at 19."
        }
    }

    return (
        <List className={classes.root}>
            {Object.keys(classesList).map(lecture => (
                <ListItem component={Link} to={'class/'+lecture}>
                    <ListItemAvatar>
                        <Avatar>
                            <ImageIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={lecture} secondary="Jan 9, 2014" />
                </ListItem>
            ))}
        </List>
    )
}