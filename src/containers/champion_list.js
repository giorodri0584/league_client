import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchAllChampions, searchChampion, filterType } from '../actions/index';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


const styles = {
    root: {
        backgroundColor: '#FAFAFA'
    },
    card: {
        marginBottom: 5
    },
    media: {
        // ⚠️ object-fit is not supported by IE11.
        objectFit: 'cover',
        height: 141,
        width: 161,
    },
  };

class ChampionList extends Component{
    componentDidMount(){
        this.props.fetchAllChampions();
    }
    constructor(props){
        super(props);

        this.state = {
            types: ["All", "Fighter", "Tank", "Mage", "Assassin", "Support", "Marksman", "Melee"]
        };

        this.filterChampions = this.filterChampions.bind(this);
        this.searchChampion = this.searchChampion.bind(this);
    }
    renderChampion(){
        const classes = this.props.classes;
        return _.map(this.props.champions, (champion) => {
            let id = champion.name.toLowerCase();
            let full = id.split(/[ .]+/).join('-');
            let withoutQuot = full.split("'").join('');
            const srcUrl = `https://www.mobafire.com/images/champion/card/${withoutQuot}.jpg`;
           
            return (
                <Grid item key={champion.id}>
                    <Card  className={classes.card}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                className={classes.media}
                                image={srcUrl}
                                title={champion.name}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h6">
                                    {champion.name}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
            );
        });
    }

    searchChampion(event){
        event.preventDefault();
        if(event.target.value){
            this.props.searchChampion(event.target.value.toLowerCase());
        }
    }
    filterChampions(type){
        this.props.filterType(type);
    }
    render(){
        const classes = this.props.classes;
 
        return (
            <div>
                <Grid container justify="center">
                    <Grid item sx={12} sm={6}>
                        <form onSubmit={this.searchChampion}>
                            <TextField
                                id="outlined-name"
                                label="Champion's Name"
                                className={classes.textField}
                                onChange={this.searchChampion}
                                margin="normal"
                                variant="outlined"
                                fullWidth
                            />
                        </form>
                    </Grid>
                </Grid>  
                <Grid container spacing={16} justify="center">
                    <Grid item>
                        <Button disabled>TYPE:</Button>
                    </Grid>
                    {this.state.types.map((type) =>{
                        return (
                            <Grid item key={type}>
                            <Button onClick={() => this.filterChampions(type)} variant="contained" color="primary" className={classes.button}>
                                {type}
                            </Button>
                        </Grid>
                        );
                    })}
                </Grid>
                <Grid container spacing={16} justify="center">
                   {this.renderChampion()}
                </Grid>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        champions: state.champions
    };
}
function mapDispatchToProps(dispatch){
    return bindActionCreators({ fetchAllChampions: fetchAllChampions, 
                                searchChampion: searchChampion,
                                filterType: filterType }, dispatch);
}

ChampionList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ChampionList));