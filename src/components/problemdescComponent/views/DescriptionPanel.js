import {Component} from "react";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import React from "react";
import {withStyles} from "@material-ui/core";
import MuiExpansionPanel from "@material-ui/core/ExpansionPanel/ExpansionPanel";
import MuiExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from "../../baseComponents/Typography";

const ExpansionPanel = withStyles({
    root: {
        border: '1px solid rgba(0,0,0,.125)',
        boxShadow: 'none',
        '&:not(:last-child)': {
            borderBottom: 0,
        },
        '&:before': {
            display: 'none',
        },
    },
    expanded: {
        margin: 'auto',
    },
})(MuiExpansionPanel);

const ExpansionPanelDetails = withStyles({
    root: {
        display: 'block'
    }
})(MuiExpansionPanelDetails);

class DescriptionPanel extends Component {
    render() {
        const {title, content, html: isHTML, defaultExpanded} = this.props;
        const isExpanded = defaultExpanded === undefined ? !!content : defaultExpanded;
        // the ExpansionPanelDetails Component need a children, but there is no, so there will be a red warning, not error
        console.log(title, isExpanded);
        return (
            <ExpansionPanel defaultExpanded={isExpanded}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                    <Typography variant='h6'>{title}</Typography>
                </ExpansionPanelSummary>
                {isHTML ?
                    <ExpansionPanelDetails dangerouslySetInnerHTML={{__html: content}}/> :
                    <ExpansionPanelDetails><pre>{content}</pre></ExpansionPanelDetails>}
            </ExpansionPanel>
        );
    }
}


export default DescriptionPanel;