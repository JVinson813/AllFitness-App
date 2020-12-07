import React from 'react';

import {Card, Col, CardBody, CardTitle, CardImg, CardText} from 'reactstrap';


  
  

  



class CardLog extends React.Component{
    constructor(props){
        super(props);
    }

    
  
    render(){
        return(
        
        <Col sm='4'>
           <Card className='Block' style={{ width: '25rem' }}>
               <CardImg className='Card' variant='top' src={this.props.exercise.GIF_Img}/>
               <CardBody>
                   <CardTitle>{this.props.exercise.Exercise_Name}</CardTitle>
                   <CardText className='CardText'>{this.props.exercise.Instructions_Execution}</CardText>
               </CardBody>
            </Card> 
        </Col>
        )
    
}};

export default CardLog;