const { makeStyles } = require('@material-ui/core/styles');

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1), // Use theme.spacing here
        },
    },
    paper: {
        padding: theme.spacing(2), // Use theme.spacing here
    },
    form: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    fileInput: {
        width: '97%',
        margin: '10px 0',
    },
    buttonSubmit: {
        marginBottom: 10,
    },
}));

module.exports = useStyles;
